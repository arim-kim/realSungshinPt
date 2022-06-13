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
        friendlistController = require("./controllers/friendlistController"),
        addFriendController = require("./controllers/addFriendControllers"),
        friendCalendarController = require("./controllers/friendCalendarController"),
        db = require("./models/index"),
        cors=require('cors'), 
        models = require("./models"),
        session = require('express-session'),
        MysqlStore = require('connect-mysql')(session),
        mysql = require('mysql2'),
        http=require('http').createServer(app), 
        loginController = require("./controllers/loginController");
        const {Socket}= require('engine.io');
        const io=require("socket.io")(http); 


db.sequelize.sync();
app.use(session({
	secret:'keyboard cat',
	resave:false,
	saveUninitialize:true
}));
app.use(bodyParser.json());

app.set("port", process.env.PORT || 80);
app.set("view engine", "ejs");

app.use(layouts);
app.use(cors()); //윤영추가
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/", homeController.index);
app.get("/job", homeController.job);

/* 회원가입 및 탈퇴*/
app.get("/signUp", homeController.join);
app.post('/signUp', async (req, res, err) => {
        memberController.signUp(res, req);
})
app.get("/deleteUser", memberController.userDelete);

/* 로그인 및 로그아웃 */
app.get("/login", homeController.login); 
app.post("/login", async (req, res)=> {
        loginController.login(res,req);    
}); 
app.get("/logout", loginController.logout);

/* 채팅 */
app.get("/chat",chatController.getAllChat);


app.get("/friend", addFriendController.addfriend);
app.get("/friend", addFriendController.addFriendEmail);
app.post("/friend", addFriendController.addFriendEmail);


app.get("/friendlist", friendlistController.getAllfriends); //뷰 분리시 사용(운영추가)
app.get("/job-list", scheduleController.getSchedule); 
app.get("/jobEdit", parttimeController.editJob);
app.get("/addSchedule", scheduleController.addSchedule);
app.post("/addScheduleClear", scheduleController.addScheduleClear);
app.post("/jobEdit",parttimeController.jobEditClear);
app.post("/job-list",scheduleController.deleteSchedule);
app.get("/jobDelete", parttimeController.jobDelete);
app.post("/jobDelete", parttimeController.jobDeleteClear);
app.get("/friendCalendar", friendCalendarController.showFriendCalendar); 
app.get("/friend-job-list", friendCalendarController.showFriendJobList);
app.get("/showMonthWage", scheduleController.showMonthWage);
app.get("/deleteFriend", friendlistController.deleteFriend);
app.post("/deleteFriend", friendlistController.deleteFriendClear);
app.get("/clear", homeController.clear );
const { engine } = require("express/lib/application");
const moment=require("moment");
const member = require("./models/member");

const port=80; //윤영 임시추가.. 근데 port없이 어떻게 http.
http.listen(port,()=>{
        console.log(`Listeninig to port ${port}`)
}) //윤영추가(이거지우면 chat X)

    

io.on('connection', (socket) =>{   //,req,res
        console.log('User connected',socket.id); //매번 요청시마다 socket.id는 다르게 찍힘

        console.log(socket.rooms);
        socket.on("room",(room) => {
                socket.join(room);
                console.log("회원이 입장")
        })
        console.log(socket.rooms);

        socket.on("new_message",(data, senderId, receiverId , room, socketId)=>{ //from client()

                console.log("채팅방번호 : " + room)
                
                console.log("Client(채팅).html) says ",data);
                io.to(room).emit('new_message',data, socketId) //to client 전달
                var now=moment(); //현재 날짜 시간 얻어오기 moment()
                now.format("MM.DD T HH:mm "); 
                models.chat.create({ //여기서 sql구동
                        senderId: senderId,
                        receiverId: receiverId,
                        chatTime:now,
                        chatContent:data
                });
                console.log(data,"를 언급");

         })    
})

/* 아르바이트 */
app.post("/job", async(req, res, err) => {
        parttimeController.addParttime(res, req, err);
})


app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

