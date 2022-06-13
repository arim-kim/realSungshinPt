const req = require("express/lib/request");

const models = require("../models/index"),
Member = models.member,
Friends = models.friends;
Op = models.Sequelize.Op;

exports.addfriend=async(req,res)=>{
    res.render("addFriend")
}//친구추가화면 연결


exports.addFriendEmail =async (req, res)=>{
    try{
        console.log("에드프랜드이메일");
        femail=req.body.friendEmail;


        data= await Member.findOne({ // 입력한 email의 memberId 호출
            attribute : ['memberId'],
            where :{
                memberMail: femail
            }
        });
        if(data==null){ //member가 아닐시, warning뷰로 이동
            res.render("warning");
            
        }  
            

        fid= data.memberId;
        console.log("친구아이디", fid);
        console.log("내 현재값", req.session.idx); 
        
        isalreadyFriend(req.session.idx, fid).then( //
            e=> {
                if(e==null){ //친구가 안되어있을때 null값임으로 bulkCreate으로 친구 생성
                    Friends.bulkCreate([{
                        myId: req.session.idx,
                        yourId: fid,
                        room: req.session.idx + "+" + fid
                    }, {
                        myId:  fid,
                        yourId:  req.session.idx,
                        room: req.session.idx + "+" + fid
                    }], { returning: true })

                    res.render("newFriend"); //친구추가완료 view

                }else{ //이미 친구일시 e값은 구조체가 들어있기때문에
                    res.render("alreadyFriend"); //already freind뷰로 보내줍니다
                }
            }
        )
        
    }catch(err){

        console.log(err);
       res.render("deleteError");

    
    }
}

//이미 친구인지 확인도 해야함

const isalreadyFriend= async(myId,fid)=>{
    try{
        data= await Friends.findOne({ //친구테이블에 존재하는지.
        where:{
            myId: myId,
            yourId: fid
        }
       
    })
    console.log("이즈올레디프랜드의 DATa:", data);
     return data; //data가 null이면 친구가 아니고, 구조체 들어있으면 친구가 이미 돼있다.

    }catch(err){
        console.log(err)
    }
}

