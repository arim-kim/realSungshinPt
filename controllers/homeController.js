const db = require("../models/index"),
Parttime = db.parttime,
member = db.member,
Op = db.Sequelize.Op;


exports.main = (req, res) => {
    res.render("index", {layout : false});
};

exports.join = (req, res) => {
    res.render("signUp");
};
exports.job = (req, res) => {
    res.render("jobInfo");
};
exports.friend = (req, res) => {
    res.render("addFriend");
};

exports.index = async (req, res) => {
    
    if(!req.session.login) {
        req.session.login = false
        req.session.idx = -1
    }
        try{
            data = await member.findAll();
            console.log(data[0].dataValues); 
            res.render("index", {data : data[0].dataValues});

        }catch (err) {
            res.status(500).send({
                message: err.message
            });
        }


};


exports.getAllParttimes = async (req, res) => {
    try {
        data = await Parttime.findAll();
        console.log(data);
        res.render("jobinfo");
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};


exports.schedule1 = (req, res) => {
    res.render("schedule1");
};

exports.schedule2 = (req, res) => {
    res.render("schedule2");
};

require('dotenv').config();
const mysql = require('mysql2/promise');

// const db = mysql.createPool({
// 	host: process.env.DB_HOST,
// 	user: process.env.DB_USER,
// 	password: process.env.DB_PW,
// 	port: process.env.DB_PORT,
// 	database: process.env.DB_NAME,
// 	waitForConnections: true,
// 	insecureAuth: true
// });

exports.testEnv = (req, res) => {
	// let exec = async () => {
	// 	let sql = "SELECT * FROM members";
	// 	let [rows, fields] = await db.query(sql);
	// 	console.log(rows);
	// 	res.render("test", {mem : rows});
	// };
	// exec();
};