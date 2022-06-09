const model=require("../models/index"),
    Member=model.member,
    Op=model.Sequelize.Op,
    Friend=model.friends;

var fid=new Array();



const getName = async(id) => {
try{
    console.log("겟네임ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ")
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
        console.log("getAllFREINEFIE");

        data = await Friend.findAll({
            where: {
                myId: req.session.idx
            }
        });
       
        await data.forEach(e => {
            console.log("바보야 ", e.yourId);

            getName(e.yourId).then(
                new_data=>{
                    // console.log("forEach",new_data);
                    fid.push(new_data);
                
                }
            )
            return 0;
      });
        
        await res.render("friendlist", {FFFF:fid});  
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
