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

exports.test = (req, res) => {
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

            let sql = 'SELECT * FROM member';
            let [rows, fields] = await db.query(sql);
            res.render("test", {mail : rows[0].email});
    };
    test();
};

exports.schedule1 = (req, res) => {
    res.render("schedule1");
};

exports.schedule2 = (req, res) => {
    res.render("schedule2");
};