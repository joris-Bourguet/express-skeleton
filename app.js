require('./config/env');

const express = require('express')
const cors = require('cors')
const router = express.Router();

const errorHandler = require('./middlewares/errorHandler');
const auth = require('./middlewares/auth');

const apiRoutes = require('./routes/api');

const port = 3001

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

// App Start
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})