var express = require('express');
var router = express.Router();
// const db = require('../db/index')

const mahasiswaController = require('../controllers').mahasiswa;
const departmentController = require('../controllers').department;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* Mahasiswa Router */
router.get('/api/mahasiswa', mahasiswaController.list);
router.get('/api/mahasiswa/:id', mahasiswaController.getbyNIM);
router.get('/api/mahasiswacount/:id', mahasiswaController.countNIM);
router.get('/api/mahasiswajoin/', mahasiswaController.listJoinDepartment);
router.post('/api/mahasiswa', mahasiswaController.add);
// router.post('/api/mahasiswafind', mahasiswaController.findDuplicateNIM);
router.post('/api/importmahasiswa/', mahasiswaController.importCsvFile);
router.put('/api/mahasiswa/:id', mahasiswaController.update);
router.delete('/api/mahasiswa/:id', mahasiswaController.delete);

/* Departmen Router */
router.get('/api/department', departmentController.list);
router.get('/api/distinctdepartment', departmentController.distinct);
router.get('/api/department/:id', departmentController.getById);
router.post('/api/department', departmentController.add);
// router.post('/api/importmahasiswa/', mahasiswaController.importCsvFile);
router.put('/api/department/:id', departmentController.update);
router.delete('/api/department/:id',departmentController.delete);
module.exports = router;
