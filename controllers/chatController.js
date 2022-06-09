const e = require("cors");
const res = require("express/lib/response");
const db = require("../models/index"),
Chat = db.chat,
Member=db.member,
Op = db.Sequelize.Op;
const Friend=db.friends;
var fid=new Array();


const getAllChat = async (myId, friendId) => {
    try {
        data = await Chat.findAll({
            where : {
                [Op.or] : [
                    {senderId : myId,  receiverId : 50},
                    {senderId : 50,  receiverId : myId},
                ]
                
            },
            order : ['chatTime']
        });
        return data; 
    }catch(err) {
        console.log(err);
    }


}
const getOne = async(id) => {
try{
    data = await Member.findOne({
        attributes : ['memberName', 'memberId'],
        where : {
            memberId : id
        }
    })

    return data; 
}catch(err) {
    console.log(err);
}
}

exports.getAllfriend = async (req, res) => {

    req.session.friendId = req.query.friendId;
    

    try {

        data = await Friend.findAll({
            where: {
                myId: req.session.idx
            }
        });
       
        AllChat = getAllChat(req.session.idx, req.session.friendId);

        data.forEach(e => {
            e.yourId
            console.log(e.yourId);
            getOne(e.yourId).then(
                new_data=>{
                    fid.push(new_data);
                }
            )

            console.log(fid);

            return 0;
      });

      getAllChat(req.session.idx, req.session.friendId).then (
          AllChat => {
            console.log(AllChat);
            res.render("chat", {nowUser : req.session.idx, friendId : req.session.friendId, FFFF:fid, AllChat : AllChat});

          }
      )
        fid=[];

//     } catch (err) {
//         res.status(500).send({
//             message: err.message
//         });
//     }
// };





\