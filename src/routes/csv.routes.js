var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');
const os = require('os')
const multer  = require('multer')
const upload = multer({ dest: os.tmpdir() })

var CsvController = require('../controllers/csv.controllers')

//Procesar csv
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), CsvController.procesarCSV);

module.exports = router;