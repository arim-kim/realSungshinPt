const models = require("../models/index"),
member = models.member;

exports.getMembers = async (res, req) => {

        models.member.create({
                memberMail: req.body.memberMail,
                memberName: req.body.memberName,
                password: req.body.password
        })
        .then( test => {
                console.log("데이터 추가 완료");
                res.render("clear");
        })
        .catch( err => {
                console.log(err)
                console.log("데이터 추가 실패");
        })
};