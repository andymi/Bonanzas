'use strict';

var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// MariaDB DATABASE_URL = mariadb://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var dbName  = (url[6] || null);
var user     = (url[2] || null);
var pwd      = (url[3] || null);
var protocol = (url[1] || null);
var dialect  = (url[1] || null);
var port     = (url[5] || null);
var host     = (url[4] || null);
var storage  = process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(dbName, user, pwd,
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true,      // solo Postgres
    maxConcurrentQueries: 100,
    define: {
      timestamps: true,
      paranoid: true
    },
    pool: { maxConnections:5, maxIdleTime: 30 }
  }
);


// Importar definicion de la tabla relevamiento
var relevamientoPath = path.join(__dirname,'relevamiento');
var Relevamiento = sequelize.import(relevamientoPath);

// importar definicion de la tabla obra
var obraPath = path.join(__dirname,'obra');
var Obra = sequelize.import(obraPath);

Relevamiento.belongsTo(Obra);
Obra.hasMany(Relevamiento);

// exportar tablas
exports.Obra = Obra;
exports.Relevamiento = Relevamiento;
// sequelize.sync() inicializa tabla de preguntas en DB
sequelize.sync().then(function () {
  console.log ('sequelize SYNC');
  // then(..) ejecuta el manejador una vez creada la tabla
  Obra.count().then(function (count) {
        if (count === 0) {
          Obra.bulkCreate(
          [
            { numero: '1' ,codigo: '12' ,codigoAnterior1: '123' , codigoAnterior2: '234' ,denominacion:'esta obra se denomina san ignacio guazu', especialidad: 'en alfareria', epoca:'siglos xvii-xviii', autor:'ni idea', funcionOriginal:'ni idea', tecnicaMaterial:'tallado', origen:'su origen procede de lo profundo de las misiones', primero: 'primero', segundo:'segundo', tercero:'tercero' },
            { numero: '1' ,codigo: '12' ,codigoAnterior1: '123' , codigoAnterior2: '234' ,denominacion:'esta obra se denomina san ignacio guazu', especialidad: 'en alfareria', epoca:'siglos xvii-xviii', autor:'ni idea', funcionOriginal:'ni idea', tecnicaMaterial:'tallado', origen:'su origen procede de lo profundo de las misiones', primero: 'primero', segundo:'segundo', tercero:'tercero' },
            { numero: '1' ,codigo: '12' ,codigoAnterior1: '123' , codigoAnterior2: '234' ,denominacion:'esta obra se denomina san ignacio guazu', especialidad: 'en alfareria', epoca:'siglos xvii-xviii', autor:'ni idea', funcionOriginal:'ni idea', tecnicaMaterial:'tallado', origen:'su origen procede de lo profundo de las misiones', primero: 'primero', segundo:'segundo', tercero:'tercero' }
          ]
          ).then(function () {
            console.log('Base de datos (tabla Obra) inicializada');
          });
        }
  });
  Relevamiento.count().then(function (count) {
        if (count === 0) {
          Relevamiento.bulkCreate(
          [
            { fechaRelev: '2016-01-08 20:16:01' ,fechaCatalog: '2016-01-08 20:16:01' ,fechaRevision: '2016-01-08 20:16:01' ,quienRelevo: 'andy' ,quienCatalogo: 'andy',quienReviso: 'san ignacio',observaciones: 'la obra fue catalogada de interes nacional e internacional' },
            { fechaRelev: '2016-01-08 20:16:01' ,fechaCatalog: '2016-01-08 20:16:01' ,fechaRevision: '2016-01-08 20:16:01' ,quienRelevo: 'usu'  ,quienCatalogo: 'usu' ,quienReviso: 'san ignacio',observaciones: 'la obra fue catalogada de interes nacional e internacional' },
            { fechaRelev: '2016-01-08 20:16:01' ,fechaCatalog: '2016-01-08 20:16:01' ,fechaRevision: '2016-01-08 20:16:01' ,quienRelevo: 'usu1' ,quienCatalogo: 'usu1',quienReviso: 'san ignacio',observaciones: 'la obra fue catalogada de interes nacional e internacional' }
          ]
          ).then(function () {
            console.log('Base de datos (tabla Relevamiento) inicializada');
          });
        }
  });
});
