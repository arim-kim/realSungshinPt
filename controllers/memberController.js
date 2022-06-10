const models = require("../models/index"),
Member = models.member;
Op = models.Sequelize.Op;

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
        })
};


exports.UserDelete = async (req, res) => {  //윤영추가(회원탈퇴)
        try{
            console.log("UserDelete 중 삭제할 Id", req.session.idx)
            await Member.destroy({
                where:{
                    memberId : req.session.idx
                }
                
            });
            console.log("delete완료")
            res.render("deleteUser");
    
        }catch(err) {
            res.status(500).send({
                message: err.message
            });
        }
    }
