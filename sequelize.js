const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'carolain',
  database: 'pagos_renthub',
  define: {
    timestamps: false, // Desactiva la creación automática de createdAt y updatedAt
  },
});

module.exports = sequelize;

const { DataTypes } = require('sequelize');

const Pagos = sequelize.define('Pagos', {
  usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  usuario_nombre: {
    type: DataTypes.CHAR,
    allowNull: false,
  },
  monto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Pagos;
