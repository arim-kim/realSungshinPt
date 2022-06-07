//모델의 대문

'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.member = require("./member.js")(sequelize, Sequelize);
db.parttime = require("./parttime.js")(sequelize, Sequelize);

db.chat= require('./chat.js')(sequelize, Sequelize);
db.friends=require('./friend.js')(sequelize,Sequelize);

db.schedule = require("./schedule.js")(sequelize, Sequelize);
db.daily = require("./daily.js")(sequelize, Sequelize);
db.monthly = require("./monthly")(sequelize, Sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.parttime.belongsTo(db.member, {foreignKey : 'ptMemberId'});
db.member.hasMany(db.parttime, {foreignKey : 'ptMemberId'});

db.parttime.hasMany(db.schedule, {foreignKey : 'scdlPtId'});
db.schedule.belongsTo(db.parttime, {foreignKey : 'scdlPtId'});

db.daily.belongsTo(db.parttime,{foreignKey : 'dailyPtId'}); 
db.parttime.hasMany(db.daily,{foreignKey : 'dailyPtId'} );

db.daily.belongsTo(db.member,  {foreignKey : 'dailyMemId'}); 
db.member.hasMany(db.daily,  {foreignKey : 'dailyMemId'});

db.monthly.belongsTo(db.parttime,{foreignKey : 'monthlyPtId'}); 
db.parttime.hasMany(db.monthly,{foreignKey : 'monthlyPtId'} );

db.monthly.belongsTo(db.member,  {foreignKey : 'monthlyMemId'}); 
db.member.hasMany(db.monthly,  {foreignKey : 'monthlyMemId'});

module.exports = db;