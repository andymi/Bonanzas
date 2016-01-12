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
router.post('/obra', function (req, res) {

  // bodyParser debe hacer la magia
  var numero = req.body.numero;
  var codigo = req.body.codigo;
  var codigoAnterior1 = req.body.codigoAnterior1;
  var codigoAnterior2 = req.body.codigoAnterior2;
  var denominacion = req.body.denominacion;
  var especialidad = req.body.especialidad;
  var epoca = req.body.epoca;
  var autor = req.body.autor;
  var funcionOriginal = req.body.funcionOriginal;
  var tecnicaMaterial = req.body.tecnicaMaterial;
  var origen = req.body.origen;
  var primero = req.body.primero;
  var segundo = req.body.segundo;
  var tercero = req.body.tercero;

  var obra = Model.Obra.build({ numero: numero, codigo: codigo, codigoAnterior1: codigoAnterior1, codigoAnterior2: codigoAnterior2, 
  denominacion: denominacion, especialidad: especialidad, epoca: epoca, autor: autor, 
  funcionOriginal: funcionOriginal, tecnicaMaterial: tecnicaMaterial, origen: origen, primero: primero, segundo: segundo, 
  tercero: tercero});

  obra.add(function (success) {
    res.json({ message: 'Obra creado!' });
  },
	function (err) {
  res.send(err);
	});
});

// (trae todos los usuarios)
// GET /usuario
router.get('/obra', function (req, res) {
  var obra = Model.Obra.build(); // funcion de secuelize su modelo se llama museo

  obra.retrieveAll(function (obra) {
    if (obra) {
      res.json(obra);
    } else {
      res.send(401, 'No se encontraron las obras');
    }
  }, function (error) {
    res.send('Obra no encontrado');
  });
});

// Rutas que terminan en /usuarios/:usuariosId
// router.route('/usuario/:usuarioId')

// PUT /usuarios/:usuarioId
// Actualiza usuario
router.put('/obra/:obraId', function (req, res) {
  var obra = Model.Obra.build();


  obra.numero = req.body.numero;
  obra.codigo = req.body.codigo;
  obra.codigoAnterior1 = req.body.codigoAnterior1;
  obra.codigoAnterior2 = req.body.codigoAnterior2;
  obra.denominacion = req.body.denominacion;
  obra.especialidad = req.body.especialidad;
  obra.epoca = req.body.epoca;
  obra.autor = req.body.autor;
  obra.funcionOriginal = req.body.funcionOriginal;
  obra.tecnicaMaterial = req.body.tecnicaMaterial;
  obra.origen = req.body.origen;
  obra.primero = req.body.primero;
  obra.segundo = req.body.segundo;
  obra.tercero = req.body.tercero;

  obra.updateById(req.params.obraId, function (success) {
    console.log(success);
    if (success) {
      res.json({ message: 'Obra actualizado!' });
    } else {
      res.send(401, 'Obra no encontrado');
    }
  }, function (error) {
    res.send('Obra no encontrado');
  });
});

// GET /usuario/:usuarioId
// Toma un usuario por id
router.get('/obra/:obraId', function (req, res) {
  var obra = Model.Obra.build();

  obra.retrieveById(req.params.obraId, function (obra) {
    if (obra) {
      res.json(obra);
    } else {
      res.send(401, 'Obra no encontrado');
    }
  }, function (error) {
    res.send('Obra no encontrado');
  });
});

// DELETE /usuario/usuarioId
// Borra el usuarioId
router.delete('/obra/:obraId', function (req, res) {
  var obra = Model.Obra.build();

  obra.removeById(req.params.obraId, function (obra) {
    if (obra) {
      res.json({ message: 'Obra borrado!' });
    } else {
      res.send(401, 'Obra no encontrado');
    }
  }, function (error) {
    res.send('Obra no encontrado');
  });
});

module.exports = router; 
