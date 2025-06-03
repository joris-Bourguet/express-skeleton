const Exemple = require('../../models/ExempleModel');
// const datas = require('../data/fichier.json'); // TODO: ajouter un fichier JSON pour importer des données

exports.importData = async () => {
  const exemple = await datas?.map((data) => {
    return {
      // TODO: add property to insert here
    }
  })

  try {
    const result = await Exemple.insertMany(exemple);
    console.log('✅ Exemples insérées :', result.length);
  } catch (err) {
    console.error('❌ Erreur lors de l\'insertion :', err);
  }
}