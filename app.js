require('./config/env');

// --------------IMPORTS-----------------
//packages
const express = require('express')
const cors = require('cors')
const Listr = require("listr");
//routeur
const router = express.Router();
// middleware
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
//services
const dbService = require('./services/DbService');
//routes
const apiRoutes = require('./routes/api');
//init
const port = 3001
// --------------IMPORTS-----------------

const app = express();

// Cors
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

// Middleware
app.use(cors(corsOptions))
app.use(auth)
app.use(errorHandler);


// Routes
app.use('/api', apiRoutes);
app.get('/protected', (req, res) => {
  res.json({message: 'Tu es authentifié', user: req.user});
});
app.use(router)

// Init
const initializeMongoClient = () => {
  dbService.getClient()
    .then(() => dbService.autoLoadModels())
    .catch(err => {
      console.error('Failed to initialize database');
    })
  ;
}

// App Start
app.listen(port, async () => {
  const tasks = new Listr([
    {
      title: "Initialize Mongo Client",
      task: () => initializeMongoClient(),
    },
  ]);

  await tasks.run()

  console.log(`Server running on http://localhost:${port}`)
})