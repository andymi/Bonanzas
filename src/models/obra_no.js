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
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'fecha de creacion de la obra'
      },
      nombre: {
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: 'Nombre',
        comment: 'Nombre de la Obra'
      },
      autor: {
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: 'Autor',
        comment: 'Nombre del Autor'
      },
      ubicacion: {
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: 'Ubicacion',
        comment: 'Ubicacion de la Obra'
      },
      precio: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
        comment: 'Precio evaluado de la Obra'
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
        retrieveByEmail: function (obraFecha, onSuccess, onError) {
          Obra.find( { where: { Fecha: obraFecha } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var fecha = this.fecha;
          var nombre = this.nombre;
          var autor = this.autor;
          var ubicacion = this.ubicacion;
          var precio = this.precio;

          Obra.build({ fecha: fecha, nombre: nombre, autor: autor, ubicacion: ubicacion, precio: precio })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (obraId, onSuccess, onError) {
          var id = obraId;
          var fecha = this.fecha;
          var nombre = this.nombre;
          var autor = this.autor;
          var ubicacion = this.ubicacion;
          var precio = this.precio;

          Obra.update({ fecha:fecha,nombre:nombre,autor:autor,ubicacion:ubicacion,precio:precio },{ where: { id:id } })
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
