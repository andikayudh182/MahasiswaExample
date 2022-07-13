var express = require('express');
var router = express.Router();
const db = require('../db/index')

const mahasiswaController = require('../controllers').mahasiswa;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* Mahasiswa Router */
router.get('/api/mahasiswa', mahasiswaController.list);
router.get('/api/mahasiswa/:id', mahasiswaController.getbyNIM);
router.post('/api/mahasiswa', mahasiswaController.add);
// router.post('/api/importmahasiswa/', mahasiswaController.importCsvFile);
router.put('/api/mahasiswa/:id', mahasiswaController.update);
router.delete('/api/mahasiswa/:id', mahasiswaController.delete);

module.exports = router;
