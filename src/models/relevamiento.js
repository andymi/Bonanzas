module.exports = function (sequelize, DataTypes) {
  var Relevamiento = sequelize.define(
    'Relevamiento',
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID nivel'
      },
      fechaRelev: {
        type: DataTypes.DATE,
        //allowNull: false,
        comment: 'Fecha del Relevamiento',
        validate: {
         //notNull: true,
          notEmpty: true
        }
      },
      fechaCatalog: {
        type: DataTypes.DATE,
        //allowNull: false,
        comment: 'Fecha del Catalogo',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      fechaRevision: {
        type: DataTypes.DATE,
        //allowNull: false,
        comment: 'Fecha de la Revision',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      quienRelevo: {
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: 'Quien Relevo',
        comment: 'Encargado del Relevamiento',
        validate: {
          is: ['[a-z]','i'],
          notNull: true,
          notEmpty: true
        }
      },
      quienCatalogo: {
        type: DataTypes.STRING(512),
        //allowNull: false,
        defaultValue: 'Quien Catalogo',
        comment: 'Encargado del Catalogamiento',
        validate: {
          is: ['[a-z]','i'],
         // notNull: true,
          notEmpty: true
        }
      },
      quienReviso: {
        type: DataTypes.STRING(512),
        //allowNull: false,
        defaultValue: 'Quien Reviso',
        comment: 'Encargado de Revisar la Obra',
        validate: {
          is: ['[a-z]','i'],
         // notNull: true,
          notEmpty: true
        }
      },
      observaciones: {
        type: DataTypes.TEXT, // no se le agrega valor por defecto a un tipo text
        //allowNull: false,
        comment: 'Observaciones sobre la Obra',
        validate: {
          is: ['[a-z]','i'],
         // notNull: true,
          notEmpty: true
        }
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Relevamiento.findAll( { } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (relevamientoId, onSuccess, onError) {
          Relevamiento.find( { where: { id: relevamientoId } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        retrieveByQuien: function (relevamientoQuienRelevo, onSuccess, onError) {
          Relevamiento.find( { where: { quienRelevo: relevamientoQuienRelevo } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var fechaRelev = this.fechaRelev;
          var fechaCatalog = this.fechaCatalog;
          var fechaRevision = this.fechaRevision;
          var quienRelevo = this.quienRelevo;
          var quienCatalogo = this.quienCatalogo;
          var quienReviso = this.quienReviso;
          var observaciones = this.observaciones;

          Relevamiento.build({ fechaRelev: fechaRelev, fechaCatalog: fechaCatalog, 
            fechaRevision: fechaRevision, quienRelevo: quienRelevo, quienCatalogo: quienCatalogo, 
            quienReviso: quienReviso, observaciones: observaciones })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (relevamientoId, onSuccess, onError) {
          var fechaRelev = this.fechaRelev;
          var fechaCatalog = this.fechaCatalog;
          var fechaRevision = this.fechaRevision;
          var quienRelevo = this.quienRelevo;
          var quienCatalogo = this.quienCatalogo;
          var quienReviso = this.quienReviso;
          var observaciones = this.observaciones;
          
          Relevamiento.update({ fechaRelev: fechaRelev, fechaCatalog: fechaCatalog, fechaRevision: fechaRevision, 
            quienRelevo: quienRelevo, quienCatalogo: quienCatalogo, quienReviso: quienReviso, 
            observaciones: observaciones },{ where: { id: relevamientoId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (relevamientoId, onSuccess, onError) {
          Relevamiento.destroy( { where: { id: relevamientoId } })
          .then(onSuccess).catch(onError);
        }
      },
      timestamps: true,
      paranoid:true,
      createdAt: 'fechaCrea',
      updatedAt: 'fechaModifica',
      deletedAt: 'fechaBorrar',
      underscore: false,
      freezeTableName:true,
      tableName: 'Relevamiento',
      comment: 'Relevamientos de las Obras',
    }
  );
  return Relevamiento;
};
