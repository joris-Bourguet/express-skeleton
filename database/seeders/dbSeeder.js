require('../../config/env');
const DbService = require('../../services/DbService');
const upSeeder = require('./upSeeder')


exports.dbSeeder = async () => {
  await DbService.getClient();
  await upSeeder.importData()
}

exports.dbSeeder()
  .then((r) => {
    console.log('DB Seeder completed !');
    process.exit(0)
  }).catch((err) => {
  console.error('DB Seeder failed !', err);
  process.exit(1)
})
