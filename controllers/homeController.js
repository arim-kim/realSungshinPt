exports.main = (req, res) => {
    res.render("index");
};

exports.join = (req, res) => {
    res.render("joinPage");
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