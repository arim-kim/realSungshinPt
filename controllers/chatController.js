const e = require("cors");
const res = require("express/lib/response");
const db = require("../models/index"),
        Chat = db.chat,
        Member=db.member,
        friends = db.friends,
        Op = db.Sequelize.Op;
const Friend=db.friends;



const getAllChat =  async (myId, friendId) => {
    try {
         data = await Chat.findAll({
            where : {
                [Op.or] : [
                    {senderId : myId,  receiverId : friendId},
                    {senderId : friendId,  receiverId : myId},
                ]
            },
            order : ['chatTime']
        });
        return data; 
    }catch(err) {
        console.log(err);
    }
}


const getRoom =  async (myId, friendId) => {
    try {
        data = await friends.findOne({
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