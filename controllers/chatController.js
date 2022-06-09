const e = require("cors");
const res = require("express/lib/response");
const db = require("../models/index"),
Chat = db.chat,
Member=db.member,
Op = db.Sequelize.Op;
const Friend=db.friends;
var fid=new Array();


const models = require("../models/index"),
friends = models.friends;

//크레이트로 방...만들기..
//파트타임 컨트롤러에 있음.
//

const getId= async(name)=>{ //이름으로 id찾기
    try{  
        id=await Member.findOne({
            attributes : ['memberId'],
            where : {
                membername : name
            }
        })
        console.log("getID",id);
        
        return id;
    }catch{
        console.log(err);
    }
}


const getName = async(id) => {
try{
    data = await Member.findOne({
        attributes : ['memberName'],
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
    try {

        data = await Friend.findAll({
            where: {
                myId: 50
            }
        });
       
        await data.forEach(e => {
            e.yourId
            getName(e.yourId).then(
                new_data=>{
                    // console.log("forEach",new_data);
                    fid.push(new_data);
                
                }
            )
            return 0;
      });
        
        await res.render("chat", {FFFF:fid});  
        fid=[];

    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};


exports.addChat=async(req,res)=>{
    try {
        var date=new Date();
        console.log(date.getMonth,date.getDate,date.getHours, date.getMinutes)
        console.log("추가하는중")
        Chat.create({
            chatContent : req.body.messageContent,
            receiverId: getId(req.query.friendId),
            senderId: '51',
            chatTime: '2022-06-08 10:30'
        
        })
        res.render("chat");
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
}


exports.addfriend=async(req,res)=>{
    res.render("addFriend")
}

exports.addFriendReal=async(req,res)=>{
    
    models.friends.bulkCreate([{
        myId: req.session.idx,
        yourId: req.body.friendEmail,
        room: req.session.idx + "+" + req.body.friendEmail
    }, {
        myId: req.body.friendEmail,
        yourId: req.session.idx,
        room: req.session.idx + "+" + req.body.friendEmail
    }], { returning: true })

    .then( result => {
        console.log("친구추가 완료");
        res.render("clear");
    })
    .catch( err => {
        console.log(err)
        console.log("친구추가 실패");
    })
}

