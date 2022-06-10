const req = require("express/lib/request");

const models = require("../models/index"),
Member = models.member,
Friends = models.friends;
Op = models.Sequelize.Op;

exports.addfriend=async(req,res)=>{
    res.render("addFriend")
}

exports.addFriendEmail =async (req, res)=>{
    try{
        console.log("에드프랜드이메일");
        femail=req.body.friendEmail;


        data= await Member.findOne({
            attribute : ['memberId'],
            where :{
                memberMail: femail
            }
        });

        fid= data.memberId;
        console.log("친구아이디", fid);
        console.log("내 현재값", req.session.idx)
        
        isalreadyFriend(req.session.idx, fid).then(
            e=> {
                if(e==null){
                    Friends.bulkCreate([{
                        myId: req.session.idx,
                        yourId: fid,
                        room: req.session.idx + "+" + fid
                    }, {
                        myId:  fid,
                        yourId:  req.session.idx,
                        room: req.session.idx + "+" + fid
                    }], { returning: true })
                    res.render("newFriend");
                }else{
                    console.log(err);
                    res.render("warning"); //윤영추가 6/11
                }
            }
        )
        
    }catch(err){
       console.log(err);
    }
}

//이미 친구인지 확인도 해야함

const isalreadyFriend= async(myId,fid)=>{
    try{
        data= await Friends.findOne({ //친구가 
        where:{
            myId: myId,
            yourId: fid
        }
       
    })
    console.log("이즈올레디프랜드의 DATa:", data);
     return data; 
    }catch{
        console.log("왜 자꾸 친구래....")
    }
}

