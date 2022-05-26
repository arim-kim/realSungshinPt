const express = require("express"),
        app = express(),
        homeController = require("./controllers/homeController"),
        errorController = require("./controllers/errorController"),
        layouts = require("express-ejs-layouts"),
        bodyParser = require("body-parser"),
        mysql = require("mysql");

app.set("port", process.env.PORT || 80);
app.set("view engine", "ejs");

app.use(layouts);

app.use(
express.urlencoded({
extended: true
})
);
app.use(express.static('public'));

const con = mysql.createConnection({
        host: '34.64.173.255',
        user: 'cc',
        password: 'password',
        database: 'SSPT'
});

con.connect(function(err) {
        if(err) throw err;
        console.log('Connected');
});

app.get("/", homeController.main);
app.get("/join", homeController.join);
app.get("/job", homeController.job);
app.get("/friend", homeController.friend);
app.get("/test", homeController.test);

app.post("/", (req, res)=> {
        
        let id = req.body.id; 
        let pw = req.body.pw; 
        console.log(id + " : " + pw); 
        const sql = 'SELECT * from member WHERE memberid=? and password=?';

        con.query(sql, [id,pw], function(err, results, fields) {
                if(err) throw err;
                if(results.length > 0) res.send('you are correct');
                else res.send('your input is wrong');
        })

        console.log("제출되었습니다");  
});  
//app.post("/join", homeController.joinCheck);
app.post("/join", (req, res) => {
    const sql = "INSERT INTO member SET ?"

    con.query(sql, req.body, function(err, result, fields) {
            if(err) throw err;
            console.log(result);
            console.log("-------");
            console.log(req.body.email);
            console.log(req.body.name);
            res.send("등록이 완료되었습니다.");
    });
});

app.post("/job", (req, res) => {
    const sql = "INSERT INTO job SET ?"

    con.query(sql, req.body, function(err, result, fields) {
            if(err) throw err;
           console.log(result);
            res.send("등록이 완료되었습니다.");
    });
});


app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
console.log(`Server running at http://localhost:${app.get("port")}`);
});