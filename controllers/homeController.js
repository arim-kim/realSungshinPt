exports.main = (req, res) => {
    res.render("index");
};

exports.join = (req, res) => {
    res.render("joinPage");
};
exports.job = (req, res) => {
    res.render("jobinfo");
};
exports.friend = (req, res) => {
    res.render("addFriend");
};

exports.chat=(req,res)=>{
    res.render("chat");
}
exports.addSchedule=(req,res)=>{
    res.render("schedule1");
}

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