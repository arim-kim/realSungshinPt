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
    const mysql = require('mysql2/promise');
    let test = async() => {
            const db = mysql.createPool({
                    host: '34.64.173.255',
                    user: 'cc',
                    password: 'password',
                    port: 3306,
                    database: 'SSPT',
                    waitForConnetctions: true,
                    insecureAuth: true
            });

            // let sql = 'SELECT * FROM members';
            // let [rows, fields] = await db.query(sql);
            // res.render("index", {data : rows[0]});
            // console.log(rows);
            // console.log(rows[0].memberId)

            let sql = 'SELECT COUNT(*) as cnt FROM members'; 
            let [rows, fields] = await db.query(sql); 
            res.render("index", {data : rows[0].cnt});
            console.log(rows[0]); 

    };
    test();
};
*/

exports.schedule1 = (req, res) => {
    res.render("schedule1");
};

exports.schedule2 = (req, res) => {
    res.render("schedule2");
};

require('dotenv').config();
const mysql = require('mysql2/promise');

const db = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PW,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	waitForConnections: true,
	insecureAuth: true
});

exports.testEnv = (req, res) => {
	let exec = async () => {
		let sql = "SELECT * FROM members";
		let [rows, fields] = await db.query(sql);
		console.log(rows);
		res.render("test", {mem : rows});
	};
	exec();
};