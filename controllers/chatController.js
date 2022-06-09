const e = require("cors");
const res = require("express/lib/response");
const db = require("../models/index"),
Chat = db.chat,
Member=db.member,
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
        console.log("함수 내 데이터 : " + data);
        return data; 
    }catch(err) {
        console.log(err);
    }
}


exports.getAllChat = async (req, res) => {
    try {
        AllChat = await getAllChat(req.session.idx, req.query.friendId);
        res.render("chat", {nowUser : req.session.idx, friendId : req.query.friendId, AllChat : AllChat});
        
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};


// exports.addfriend=async(req,res)=>{
//     res.render("addFriend")
// }

// exports.addFriendReal=async(req,res)=>{
    
//     models.friends.bulkCreate([{
//         myId: req.session.idx,
//         yourId: req.body.friendEmail,
//         room: req.session.idx + "+" + req.body.friendEmail
//     }, {
//         myId: req.body.friendEmail,
//         yourId: req.session.idx,
//         room: req.session.idx + "+" + req.body.friendEmail
//     }], { returning: true })

//     .then( result => {
//         console.log("친구추가 완료");
//         res.render("clear");
//     })
//     .catch( err => {
//         console.log(err)
//         console.log("친구추가 실패");
//     })
// }

