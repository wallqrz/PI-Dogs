  const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Race', {
    id: {
      type: DataTypes.UUID,//genera un id en combinacion de numeros y letras que es unico y universal
      defaultValue: DataTypes.UUIDV4,//tipo de dato predeterminado en sql, numero generado aleatoriamente
      allowNull: false,// mientras este en false, no permite que ese campo este incompleto
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    heightMin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    heightMax: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weightMin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weightMax: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lifeSpan: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    createdInDb:{           //se crea para facilitar la buscado de un dato creado en la DB
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    timestamps: false
  });
};
