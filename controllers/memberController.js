const models = require("../models/index"),
member = models.member;

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
