module.exports = function (sequelize, DataTypes) {
  var Obra = sequelize.define(
    'Obra',
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID Obra'
      },
      numero: {
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: 'Numero',
        comment: 'Numero interno del museo que sirve de identificacion de la obra'
      },
      codigo: {
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: 'Codigo',
        comment: 'Codigo de la Obra'
      },
      codigoAnterior1: {
        type: DataTypes.STRING(512),
        //allowNull: false,
        defaultValue: 'Codigo Anterior 1',
        comment: 'Codigo 1 anterior de la obra '
      },
      codigoAnterior2: {
        type: DataTypes.STRING(512),
        //allowNull: false,
        defaultValue: 'Codigo Anterior 2',
        comment: 'Codigo 2 anterior de la Obra'
      },
      denominacion: {
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: 'Denominacion',
        comment: 'Denominacion de la Obra'
      },
      especialidad: {
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: 'Especialidad',
        comment: 'Especialidad de la Obra' 
      },
      epoca: {
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: 'Epoca',
        comment: 'Epoca a la que pertenece la Obra' 
      },
      autor: {
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: 'Nombre Autor',
        comment: 'Nombre del autor de la Obra'
      },
      funcionOriginal: {
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: 'Funcion Original',
        comment: 'Funcion Original de la Obra'
      },
      tecnicaMaterial: {
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: 'Tecnica Material',
        comment: 'Tecnica material que se uso en la Obra'
      },
      origen: {
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: 'Origen',
        comment: 'Origen de la Obra'
      },
      primero: {
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: 'Primero',
        comment: 'Primer codigo obtenido'
      },
      segundo: {
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: 'Segundo',
        comment: 'Segundo Codigo obtenido'
      },
      tercero: {
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: 'Tercero',
        comment: 'Tercer Codigo obtenido'
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Obra.findAll( { } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (obraId, onSuccess, onError) {
          Obra.find( { where: { id: obraId } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        retrieveByFecha: function (obraEpoca, onSuccess, onError) {
          Obra.find( { where: { Epoca: obraEpoca } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var numero = this.numero;
          var codigo = this.codigo;
          var codigoAnterior1 = this.codigoAnterior1;
          var codigoAnterior2 = this.codigoAnterior2;
          var denominacion = this.denominacion;
          var especialidad = this.especialidad;
          var epoca = this.epoca;
          var autor = this.autor;
          var funcionOriginal = this.funcionOriginal;
          var tecnicaMaterial = this.tecnicaMaterial;
          var origen = this.origen;
          var primero = this.primero;
          var segundo = this.segundo;
          var tercero = this.tercero;

          Obra.build({ numero: numero, codigo: codigo, codigoAnterior1: codigoAnterior1, codigoAnterior2: codigoAnterior2, denominacion: denominacion, especialidad: especialidad, epoca: epoca, autor: autor, funcionOriginal: funcionOriginal, tecnicaMaterial: tecnicaMaterial, origen: origen, primero: primero, segundo: segundo, tercero: tercero })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (obraId, onSuccess, onError) {
          var id = obraId;
          var numero = this.numero;
          var codigo = this.codigo;
          var codigoAnterior1 = this.codigoAnterior1;
          var codigoAnterior2 = this.codigoAnterior2;
          var denominacion = this.denominacion;
          var especialidad = this.especialidad;
          var epoca = this.epoca;
          var autor = this.autor;
          var funcionOriginal = this.funcionOriginal;
          var tecnicaMaterial = this.tecnicaMaterial;
          var origen = this.origen;
          var primero = this.primero;
          var segundo = this.segundo;
          var tercero = this.tercero;

          Obra.update({ numero: numero, codigo: codigo, codigoAnterior1: codigoAnterior1, codigoAnterior2: codigoAnterior2, denominacion: denominacion, especialidad: especialidad, epoca: epoca, autor: autor, funcionOriginal: funcionOriginal, tecnicaMaterial: tecnicaMaterial, origen: origen, primero: primero, segundo: segundo, tercero: tercero },{ where: { id:id } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (obraId, onSuccess, onError) {
          Obra.destroy({ where: { id: obraId }})
          .then(onSuccess).catch(onError);
        }
      },
      timestamps: true,
      paranoid:true,
      createdAt: 'fechaCrea',
      updatedAt: 'fechaModifica',
      deletedAt: 'fechaBorra',
      underscore: false,
      freezeTableName:true,
      tableName: 'Obra',
      comment: 'Obras registrados en el sistema'
    }
  );
  return Obra;
};
