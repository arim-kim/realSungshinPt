const con = require("../config/mysql"),
        connect = con.init(); 
        dotenv = require('dotenv');

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

exports.index = (req, res) => {
    let test = async() => {
            let sql = 'SELECT COUNT(*) as cnt FROM members'; 
            let [rows, fields] = await connect.query(sql); 
            res.render("index", {data : rows[0].cnt});
            console.log(rows[0]); 

    };
    test();
};

exports.schedule1 = (req, res) => {
    res.render("schedule1");
};

exports.schedule2 = (req, res) => {
    res.render("schedule2");
};


exports.testEnv = (req, res) => {
	let exec = async () => {
		let sql = 'SELECT * FROM members';
		let [rows, fields] = await connect.query(sql);
		console.log(rows);
		res.render("test", {mem : rows});
	};
	exec();
};