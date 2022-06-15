//윤영주석 12:01
const express = require("express"),
        app = express(),
        layouts = require("express-ejs-layouts"),
        bodyParser = require("body-parser"),
        homeController = require("./controllers/homeController"), //controllers 불러오기.
        errorController = require("./controllers/errorController"),
        memberController = require("./controllers/memberController"),
        parttimeController = require("./controllers/parttimeController"),
        scheduleController = require("./controllers/scheduleController"),
        chatController=require("./controllers/chatController"),
        friendlistController = require("./controllers/friendlistController"),
        addFriendController = require("./controllers/addFriendControllers"),
        friendCalendarController = require("./controllers/friendCalendarController"),
        loginController = require("./controllers/loginController"),
        db = require("./models/index"), //home models 불러오기
        cors=require('cors'),  //채팅관련 
        models = require("./models"), //대문 열기
        session = require('express-session'),
        MysqlStore = require('connect-mysql')(session),
        mysql = require('mysql2'),
        http=require('http').createServer(app);
        const {Socket}= require('engine.io'); //채팅관련
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

/* 친구추가 */
app.get("/friend", addFriendController.addfriend);
app.get("/friend", addFriendController.addFriendEmail);
app.post("/friend", addFriendController.addFriendEmail);


app.get("/friendlist", friendlistController.getAllfriends);             //친구 목록 

app.get("/job-list", scheduleController.getSchedule);                   //아르바이트 목록
app.post("/job-list",scheduleController.deleteSchedule);  


app.get("/jobEdit", parttimeController.editJob);                        // 아르바이트 편집
app.post("/jobEdit",parttimeController.jobEditClear);   

app.get("/addSchedule", scheduleController.addSchedule);                //일정 추가
app.post("/addScheduleClear", scheduleController.addScheduleClear);    

app.get("/jobDelete", parttimeController.jobDelete);                    //아르바이트 삭제 
app.post("/jobDelete", parttimeController.jobDeleteClear); 

app.get("/friendCalendar", friendCalendarController.showFriendCalendar);//친구 캘랜더 show
app.get("/friend-job-list", friendCalendarController.showFriendJobList);//친구 일정 show

app.get("/showMonthWage", scheduleController.showMonthWage);            //총 월급 보기
app.get("/deleteFriend", friendlistController.deleteFriend);            //친구 삭제
app.post("/deleteFriend", friendlistController.deleteFriendClear);      
app.get("/clear", homeController.clear );                               //완료 뷰

const { engine } = require("express/lib/application");
const moment=require("moment"); //채팅 시간을 위해
const member = require("./models/member");

const port=80;  //임의로 port지정
http.listen(port,()=>{
        console.log(`Listeninig to port ${port}`)
}) 
    

io.on('connection', (socket) =>{  
        console.log('User connected',socket.id); //매번 요청시마다 socket.id는 다르게 찍힘
        console.log(socket.rooms);

        socket.on("room",(room) => {
                socket.join(room); //join으로 room연결
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

