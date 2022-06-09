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
        addFriendController=require("./controllers/addFriendControllers"),
        friendlistController=require("./controllers/friendlistController"),
        friendCalendarController = require("./controllers/friendCalendarController");
        db = require("./models/index"),
        cors=require('cors'), 
        models = require("./models"),
        session = require('express-session'),
        MysqlStore = require('connect-mysql')(session),
        mysql = require('mysql2'),
        http=require('http').createServer(app), 
        loginFu = require("./controllers/loginManager");
        const {Socket}= require('engine.io');
        const io=require("socket.io")(http); 


db.sequelize.sync();

app.use(session({
	secret:'keyboard cat',
	resave:false,
	saveUninitialize:true
}));

app.set("port", process.env.PORT || 80);
app.set("view engine", "ejs");


app.use(layouts);
app.use(cors()); //윤영추가
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.get("/", homeController.index);
app.get("/signUp", homeController.join);
app.get("/job", homeController.job);
app.get("/friend", homeController.friend); //친구추가view
app.get("/test", homeController.testEnv);


app.get("/logout", loginFu.logout); // 로그아웃

app.get("/friendlist", friendlistController.getAllfriend); //뷰 분리시 사용(운영추가)
app.post("/friend", addFriendController.addFriendEmail);
// app.get("/friend", addFriendController.addFriendEmail);
app.post("/addFriend", addFriendController.addFriendEmail);

app.get("/job-list", scheduleController.getSchedule); 
app.get("/jobEdit", parttimeController.editJob);
app.get("/login", homeController.login); 
app.get("/addSchedule", scheduleController.addSchedule);
app.post("/addScheduleClear", scheduleController.addScheduleClear);
app.post("/jobEdit",parttimeController.jobEditClear);
app.post("/job-list",scheduleController.deleteSchedule);
app.get("/jobDelete", parttimeController.jobDelete);
app.post("/jobDelete", parttimeController.jobDeleteClear);
app.get("/friendCalendar", friendCalendarController.showFriendCalendar); 
app.get("/friend-job-list", friendCalendarController.showFriendJobList);
app.get("/showMonthWage", scheduleController.showMonthWage);

const { engine } = require("express/lib/application");
const moment=require("moment");

const port=80; //윤영 임시추가.. 근데 port없이 어떻게 http.
http.listen(port,()=>{
        console.log(`Listeninig to port ${port}`)
}) //윤영추가(이거지우면 chat X)



io.on('connection', (socket,req,res) =>{
        console.log('User connected',socket.id); //매번 요청시마다 socket.id는 다르게 찍힘
        socket.on("new_message",(data, senderId, receiverId)=>{ //from client()
                console.log("Client(채팅).html) says ",data);
                io.emit('new_message',data) //to client 전달
                var now=moment(); //현재 날짜 시간 얻어오기 moment()
                now.format("MM.DD T HH:mm "); //왜 오후 4시가 07로 표기됨? 뒤질래?
                models.chat.create({ //여기서 sql구동
                        senderId: senderId,
                        receiverId: receiverId,
                        chatTime:now,
                        chatContent:data
                        });
                
                console.log(data,"를 언급");

         })

    }) //윤영추가


/* 로그인 */
app.post("/login", async (req, res, next)=> {
        loginFu.login_f(req.body.mail,req.body.pw,res,req);    
}); 

/* 회원가입 */
app.post('/signUp', async (req, res, err) => {
        memberController.signUp(res, req);
})

/* 아르바이트 */
app.post("/job", async(req, res, err) => {
        parttimeController.addParttime(res, req, err);
})

// app.post("/friend", async(req,res)=>{
//         addFriendController.addFriendEmail(res,req);
// })

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

