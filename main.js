const express = require("express"),
        app = express(),
        homeController = require("./controllers/homeController"),
        errorController = require("./controllers/errorController"),
        layouts = require("express-ejs-layouts"),
        bodyParser = require("body-parser"),
        mysql = require("mysql");
        cors=require('cors');

app.set("port", process.env.PORT || 80);
app.set("view engine", "ejs");

app.use(layouts);

app.use(
express.urlencoded({
extended: true
})
);
app.use(express.static('public'));


const socketIO=require("socket.io")
//const io=socketIO(app);
const moment=require("moment");
const Connection = require("mysql/lib/Connection");

//Connection.connect();

//io.on("connection",(socket) => {
//        socket.on("chatting", (data)=>{  //클라이언트의 요청듣기 chatting변수일치시켜야함 
//            const {name, msg}=data;
//             io.emit("chatting",{
//                 name,
//                 msg,
//                 time: moment(new Date()).format("h:ss A")
//             })

//        Connection.query(
//                "INSERT INTO message (message) VALUES ('" +data +"')",
//                function(error, result){
        
//                }
//             )
//        })
//     })



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
app.get("/join", homeController.join);  //회원가입페이지?
app.get("/job", homeController.job);    //jobinfo  아르바이트 추가
app.get("/friend", homeController.friend);      //addfriend
app.get("/test", homeController.test);  
app.get("/chat",homeController.chat);   //chatting
app.post("/chat", homeController.chat);
app.get("/addSchedule",homeController.addSchedule) //일정 추가
//요청이 왔을 때 내부적으로 사용되는 get요청


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