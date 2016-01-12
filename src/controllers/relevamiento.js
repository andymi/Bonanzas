'use strict';

// USUARIOS CRUD

// Importar rutas
// modulos de dependencia de la aplicacion=============================================================================
var express = require('express');
var router = express.Router();

var Model = require('../models/model.js');

// Rutas que terminan en /usuarios
// router.route('/usuario')

// POST /usuarios protocolo http
router.post('/relevamiento', function (req, res) {

  // bodyParser debe hacer la magia
  var fechaRelev = req.body.fechaRelev;
  var fechaCatalog = req.body.fechaCatalog;
  var fechaRevision = req.body.fechaRevision;
  var quienRelevo = req.body.quienRelevo;
  var quienCatalogo = req.body.quienCatalogo;
  var quienReviso = req.body.quienReviso;
  var observaciones = req.body.observaciones;

  var relevamiento = Model.Relevamiento.build({ fechaRelev: fechaRelev, fechaCatalog: fechaCatalog, fechaRevision: fechaRevision, quienRelevo: quienRelevo, quienCatalogo: quienCatalogo, quienReviso: quienReviso, observaciones: observaciones });

  relevamiento.add(function (success) {
    res.json({ message: 'Relevamiento creado!' });
  },
	function (err) {
  res.send(err);
	});
});

// (trae todos los usuarios)
// GET /usuario
router.get('/relevamiento', function (req, res) {
  var relevamiento = Model.Relevamiento.build(); // funcion de secuelize su modelo se llama museo

  relevamiento.retrieveAll(function (relevamiento) {
    if (relevamiento) {
      res.json(relevamiento);
    } else {
      res.send(401, 'No se encontraron los relevamientos');
    }
  }, function (error) {
    res.send('Relevamiento no encontrado');
  });
});

// Rutas que terminan en /usuarios/:usuariosId
// router.route('/usuario/:usuarioId')

// PUT /usuarios/:usuarioId
// Actualiza usuario
router.put('/relevamiento/:relevamientoId', function (req, res) {
  var relevamiento = Model.Relevamiento.build();

  relevamiento.fechaRelev = req.body.fechaRelev;
  relevamiento.fechaCatalog = req.body.fechaCatalog;
  relevamiento.fechaRevision = req.body.fechaRevision;
  relevamiento.quienRelevo = req.body.quienRelevo;
  relevamiento.quienCatalogo = req.body.quienCatalogo;
  relevamiento.quienReviso = req.body.quienReviso;
  relevamiento.observaciones = req.body.observaciones;

  relevamiento.updateById(req.params.relevamientoId, function (success) {
    console.log(success);
    if (success) {
      res.json({ message: 'Relevamiento actualizado!' });
    } else {
      res.send(401, 'Relevamiento no encontrado');
    }
  }, function (error) {
    res.send('Relevamiento no encontrado');
  });
});

// GET /usuario/:usuarioId
// Toma un usuario por id
router.get('/relevamiento/:relevamientoId', function (req, res) {
  var relevamiento = Model.Relevamiento.build();

  relevamiento.retrieveById(req.params.relevamientoId, function (relevamiento) {
    if (relevamiento) {
      res.json(relevamiento);
    } else {
      res.send(401, 'Relevamiento no encontrado');
    }
  }, function (error) {
    res.send('Relevamiento no encontrado');
  });
});

// DELETE /usuario/usuarioId
// Borra el usuarioId
router.delete('/relevamiento/:relevamientoId', function (req, res) {
  var relevamiento = Model.Relevamiento.build();

  relevamiento.removeById(req.params.relevamientoId, function (relevamiento) {
    if (relevamiento) {
      res.json({ message: 'Relevamiento borrado!' });
    } else {
      res.send(401, 'Relevamiento no encontrado');
    }
  }, function (error) {
    res.send('Relevamiento no encontrado');
  });
});

module.exports = router; 
