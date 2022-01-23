const DataTypes = require("sequelize").DataTypes;
const _paragraphs = require("./paragraphs");

function initModels(sequelize) {
  const paragraphs = _paragraphs(sequelize, DataTypes);

  paragraphs.belongsTo(locations, { as: "location", foreignKey: "locationID"});
  locations.hasMany(paragraphs, { as: "paragraphs", foreignKey: "locationID"});

  return {
    paragraphs,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
