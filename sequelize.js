const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://pagos_renthub_user:e6PucSbFzWXuXRmuikqB9OtmgFwlZots@dpg-cm0ha521hbls73dal070-a/pagos_renthub');

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
