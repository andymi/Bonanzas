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
router.post('/nivel', function (req, res) {

  // bodyParser debe hacer la magia
  var categoria = req.body.categoria;
 

  var nivel = Model.Nivel.build({ categoria: categoria });

  nivel.add(function (success) {
    res.json({ message: 'Usuario creado!' });
  },
	function (err) {
  res.send(err);
	});
});

// (trae todos los usuarios)
// GET /usuario
router.get('/nivel', function (req, res) {
  var nivel = Model.Nivel.build(); // funcion de secuelize su modelo se llama museo

  nivel.retrieveAll(function (nivel) {
    if (nivel) {
      res.json(nivel);
    } else {
      res.send(401, 'No se encontraron Niveles');
    }
  }, function (error) {
    res.send('Nivel no encontrado');
  });
});

// Rutas que terminan en /usuarios/:usuariosId
// router.route('/usuario/:usuarioId')

// PUT /usuarios/:usuarioId
// Actualiza usuario
router.put('/nivel/:nivelId', function (req, res) {
  var nivel = Model.Nivel.build();

  nivel.categoria = req.body.categoria;
  

  nivel.updateById(req.params.nivelId, function (success) {
    console.log(success);
    if (success) {
      res.json({ message: 'Nivel actualizado!' });
    } else {
      res.send(401, 'Nivel no encontrado');
    }
  }, function (error) {
    res.send('Nivel no encontrado');
  });
});

// GET /usuario/:usuarioId
// Toma un usuario por id
router.get('/nivel/:nivelId', function (req, res) {
  var nivel = Model.Nivel.build();

  nivel.retrieveById(req.params.nivelId, function (nivel) {
    if (nivel) {
      res.json(nivel);
    } else {
      res.send(401, 'Nivel no encontrado');
    }
  }, function (error) {
    res.send('Nivel no encontrado');
  });
});

// DELETE /usuario/usuarioId
// Borra el usuarioId
router.delete('/nivel/:nivelId', function (req, res) {
  var nivel = Model.Nivel.build();

  nivel.removeById(req.params.nivelId, function (nivel) {
    if (nivel) {
      res.json({ message: 'Nivel borrado!' });
    } else {
      res.send(401, 'Nivel no encontrado');
    }
  }, function (error) {
    res.send('Nivel no encontrado');
  });
});

module.exports = router; 
