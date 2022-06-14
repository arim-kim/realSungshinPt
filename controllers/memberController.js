const models = require("../models/index"),
Member = models.member;
Op = models.Sequelize.Op;


/* 회원 가입 */
exports.signUp = async (res, req) => {

        models.member.create({
                memberMail: req.body.memberMail,
                memberName: req.body.memberName,
                password: req.body.password
        })
        .then( result => {
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
        await Member.destroy({
            where:{
                memberId : req.session.idx
            }
        });
        
        console.log("회원 삭제 완료")
        res.render("deleteUser");
    
    } catch(err) {
        res.status(500).send({
            message: err.message
        });
    }
}
