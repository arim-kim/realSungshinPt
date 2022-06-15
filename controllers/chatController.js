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
        Room = await getRoom(req.session.idx, req.query.friendId);
        AllChat = await getAllChat(req.session.idx, req.query.friendId);
        console.log("룸 아이디값 : " + Room.room);
        res.render("chat", {nowUser : req.session.idx, friendId : req.query.friendId, AllChat : AllChat, room : Room.room});
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
                [Op.or] : [
                    {senderId : myId,  receiverId : friendId},
                    {senderId : friendId,  receiverId : myId},
                ],
            },
            order : ['chatTime']
        });
        return data; 
    } catch(err) {
        console.log(err);
        res.render("warning");
    }
}

/* 채팅방 번호 가져오기 */
const getRoom =  async (myId, friendId) => {
    try {
        data = await Friend.findOne({
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
