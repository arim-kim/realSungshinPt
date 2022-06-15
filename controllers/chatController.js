const e = require("cors"),
    res = require("express/lib/response"),  
    Sequelize = require('sequelize'),
    db = require("../models/index"),
    Chat = db.chat,
    Member=db.member,
    Op = db.Sequelize.Op,
    Friend=db.friends;


/* 채팅 내용 가져오기 */
exports.getAllChat = async (req, res) => {
    try {
        Room = await getRoom(req.session.idx, req.query.friendId); //ROOM에 저장된 내 id와 친구 id를 이용해 해당 room id를 가져옵니다.
        AllChat = await getAllChat(req.session.idx, req.query.friendId); //나와 내친구가 했던 채팅 기록을 끌고 와 AllChat에 저장합니다.
        console.log("룸 아이디값 : " + Room.room);
        res.render("chat", {nowUser : req.session.idx, friendId : req.query.friendId, AllChat : AllChat, room : Room.room});
        //대화 기록들과 Room을 chat.ejs로 랜더링 해줍니다.
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};

const getAllChat =  async (myId, friendId) => {
    try {
         data = await Chat.findAll({
            attributes : [

                [Sequelize.fn('date_format', Sequelize.col('chatTime'), '%Y-%m-%d %h:%i'), 'chatTime'],
                'senderId',
                'receiverId',
                'chatContent',
                'chatNumber'
            ],
            where : {
                [Op.or] : [ //나- 친구 , 친구(나)- 나(친구) 경우의 수가 2가지 이므로  조건으로 2개 다 언급해줍니다.
                    {senderId : myId,  receiverId : friendId},
                    {senderId : friendId,  receiverId : myId},
                ],
            },
            order : ['chatTime'] //채팅 타임 순서대로 뜨도록 order로 설정해줍니다.
        });

        return data;  //exports된 함수로 data를 보내줍니다.
    } catch(err) {
        console.log(err);
        res.render("warning");
    }
}

/* 채팅방 번호 가져오기 */
const getRoom =  async (myId, friendId) => {
    try {
        data = await Friend.findOne({ //내 아이디+친구아이디로 룸 id를 설정하였습니다. 
            where: {
                myId: myId,
                yourId : friendId
            }
        });
        return data; 
    
    }catch(err) {
        console.log(err);
    }
}
