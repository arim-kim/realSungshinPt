const models = require("../models/index"),
Member = models.member;
Op = models.Sequelize.Op;


exports.signUp = async (res, req) => { //회원가입 함수

        models.member.create({  //create해줍니다.
                memberMail: req.body.memberMail,
                memberName: req.body.memberName,
                password: req.body.password
        })
        .then( res => {
                console.log("회원가입 완료");
                res.render("clear");
        })
        .catch( err => {
                console.log(err)
                console.log("회원가입 실패");
                res.send("<script>alert('이미 사용중인 이메일입니다.');location.href='/signUp';</script>");
        })
};

/* 회원 탈퇴 */
exports.userDelete = async (req, res) => {  
    try {
        console.log("UserDelete 중 삭제할 Id", req.session.idx)
        await Member.destroy({ //세션에 저장된 id로 memberId를 찾아 destroy 해준다.
            where:{
                memberId : req.session.idx
            }
        });
        
        console.log("회원 삭제 완료")
        res.render("deleteUser"); //탈퇴 완료 view로 랜더.
    
    } catch(err) {
       res.render("deleteError"); //오류 view로  보내준다.(for user)
        console.log(err); //for developer
    }
}
