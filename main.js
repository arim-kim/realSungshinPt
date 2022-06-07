const express = require("express"),
        app = express(),
        homeController = require("./controllers/homeController"),
        errorController = require("./controllers/errorController"),
        layouts = require("express-ejs-layouts"),
        bodyParser = require("body-parser"),
        memberController = require("./controllers/memberController"),
        parttimeController = require("./controllers/parttimeController"),
        scheduleController = require("./controllers/scheduleController"),
        chatController=require("./controllers/chatController"),
        db = require("./models/index"),
        cors=require('cors'), //윤영추가 6/1
        models = require("./models"),
        session = require('express-session'),
        MysqlStore = require('connect-mysql')(session),
        mysql = require("mysql"),
        http=require('http').createServer(app), //윤영추가
        loginFu = require("./controllers/loginManager");
        const {Socket}= require('engine.io');
        const io=require("socket.io")(http); //윤영추가

    
    

db.sequelize.sync();

app.set("port", process.env.PORT || 80);
app.set("view engine", "ejs");


app.use(layouts);
app.use(cors()); //윤영추가
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


const { engine } = require("express/lib/application");
const moment=require("moment");

const port=80; //윤영 임시추가.. 근데 port없이 어떻게 http.
http.listen(port,()=>{
        console.log(`Listeninig to port ${port}`)
}) //윤영추가(이거지우면 chat X)






io.on('connection', (socket,req,res) =>{
        console.log('User connected',socket.id); //매번 요청시마다 socket.id는 다르게 찍힘
        socket.on("new_message",(data)=>{ //from client()
                console.log("Client(채팅).html) says ",data);
                io.emit('new_message',data) //to client 전달
                var now=moment(); //현재 날짜 시간 얻어오기 moment()
                now.format("MM.DD T HH:mm "); //왜 오후 4시가 07로 표기됨? 뒤질래?
                var currentUserId= "1"; //여기다가 session.Idx? 하면될듯 
                //receiver은 chatController에서 받아오면 되나.
                models.chat.create({ //여기서 sql구동
                        senderId: currentUserId,
                        receiverId:"2",
                        chatTime:now,
                        chatContent:data
                        });
                
                console.log(data,"를 언급");

         })

       

    }) //윤영추가
    



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
app.get("/chat", chatController.getAllfriend);
// app.get('/chat/friendId', chatController.findById);


//app.get("/schedule1", homeController.schedule1);
//app.get("/schedule2", homeController.schedule2);
app.get("/addSchedule", scheduleController.addSchedule);
app.get("/addScheduleClear", scheduleController.addScheduleClear);
app.get("/job-list", parttimeController.getOneJob); 
app.get('/chat/:friendId',);
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

