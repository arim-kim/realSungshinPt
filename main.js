const express = require("express"),
        app = express(),
        homeController = require("./controllers/homeController"),
        errorController = require("./controllers/errorController"),
        layouts = require("express-ejs-layouts"),
        bodyParser = require("body-parser"),
        memberController = require("./controllers/memberController"),
        parttimeController = require("./controllers/parttimeController"),
        db = require("./models/index"),
        models = require("./models"),
        session = require('express-session'),
        MysqlStore = require('connect-mysql')(session),
        mysql = require("mysql")
        loginFu = require("./controllers/loginManager");

db.sequelize.sync();

app.set("port", process.env.PORT || 80);
app.set("view engine", "ejs");

app.use(layouts);

app.use(
express.urlencoded({
extended: true
})
);
app.use(express.static('public'));
app.use(session({
	secret:'keyboard cat',
	resave:false,
	saveUninitialize:true
}));

app.get("/", homeController.index);
app.get("/signUp", homeController.join);
app.get("/signUP", memberController.getAllMembers);
app.get("/job", homeController.job);
app.get("/job", parttimeController.getAllParttimes);
app.get("/friend", homeController.friend);
app.get("/test", homeController.testEnv);
app.get("/schedule1", homeController.schedule1);
app.get("/schedule2", homeController.schedule2);
app.get("/job-list", parttimeController.getOneJob); 

/* 로그인 DB 연동*/
app.post("/", async (req, res)=> {
        loginFu.login_f(req.body.mail,req.body.pw,res,req);     
}); 
       


app.post('/signUp', (req, res) => {
        console.log(req.body);
    
        models.member.create({
                memberMail: req.body.memberMail,
                memberName: req.body.memberName,
                password: req.body.password
        })
        .then( result => {
                console.log("데이터 추가 완료");
                res.render("clear");
        })
        .catch( err => {
                console.log(err)
                console.log("데이터 추가 실패");
        })
});



app.post('/job', (req, res) => {
        console.log(req.body);
    
        models.parttime.create({
                ptMemberId : 51,
                parttimeName: req.body.parttimeName,
                weekPay: req.body.weekPay,
                tax: req.body.tax,
                color : req.body.color
        })
        .then( result => {
                console.log("데이터 추가 완료");
                res.render("clear");
        })
        .catch( err => {
                console.log(err)
                console.log("데이터 추가 실패");
        })
});


app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
console.log(`Server running at http://localhost:${app.get("port")}`);
});