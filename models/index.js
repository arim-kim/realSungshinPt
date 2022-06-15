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

//exports한 db(맨마지막 줄)에  models들을 연결지어줍니다.
db.member = require("./member.js")(sequelize, Sequelize);
db.parttime = require("./parttime.js")(sequelize, Sequelize);

db.chat= require('./chat.js')(sequelize, Sequelize);
db.friends=require('./friend.js')(sequelize,Sequelize);

db.schedule = require("./schedule.js")(sequelize, Sequelize);
db.daily = require("./daily.js")(sequelize, Sequelize);
db.monthly = require("./monthly")(sequelize, Sequelize);


db.sequelize = sequelize;
db.Sequelize = Sequelize;

//관계 구분(일대일, 다대다, 일대다)
db.parttime.belongsTo(db.member, {foreignKey : 'ptMemberId'}); 
db.member.hasMany(db.parttime, {foreignKey : 'ptMemberId'}); //member와 parttime의 관계는 일대다 관계이다(중간발표 이후 교수님 피드백 적용  O)

db.parttime.hasMany(db.schedule, {foreignKey : 'scdlPtId'}); 
db.schedule.belongsTo(db.parttime, {foreignKey : 'scdlPtId'}); //parttime과 schedule의 관계는 일대다관계이다

db.daily.belongsTo(db.parttime,{foreignKey : 'dailyPtId'}); 
db.parttime.hasMany(db.daily,{foreignKey : 'dailyPtId'} ); // daily와 parttime의 관계는 일대다 관계이다(하루에 아르바이트를 여러 번 뛸 수 있기때문!)

db.daily.belongsTo(db.member,  {foreignKey : 'dailyMemId'}); 
db.member.hasMany(db.daily,  {foreignKey : 'dailyMemId'}); //member와 daily의 관계는 일대다 관게이다.

db.monthly.belongsTo(db.parttime,{foreignKey : 'monthlyPtId'}); 
db.parttime.hasMany(db.monthly,{foreignKey : 'monthlyPtId'} );//parttime과 monthly의 관계는 일대 다 관계이다.

db.monthly.belongsTo(db.member,  {foreignKey : 'monthlyMemId'}); 
db.member.hasMany(db.monthly,  {foreignKey : 'monthlyMemId'});//member와 monthly의 관계는 일대다관계이다.

module.exports = db; //외부에서 사용할 수 있도록 exports해줍니다.