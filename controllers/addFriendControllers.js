const req = require("express/lib/request");

const models = require("../models/index"),
Member = models.member,
Friends = models.friends;
Op = models.Sequelize.Op;


//우선 입력된 이메일이 회원인지 확인
const isUser = async (email)=>{
    try{
        data=await Member.findOne({
            where:{
             memberMail: email   
            }
        })
        return true;
    }catch{
        console.log(err);
    }
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
                    Friends.create({
                        myId : req.session.idx,
                        yourId: fid
                    });
                    console.log("추가완료");
                    res.render("newFriend");
        
                }else{
                    res.render("alreadyFriend");        
                }
               
            }
        )
        console.log(y);
        
    }catch{
        console.log("error");
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