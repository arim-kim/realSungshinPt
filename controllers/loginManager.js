
const models = require("../models/index"); 

function login_f(member_mail,member_password,res,req) {
    var responseData; 
    models.member.findOne({
        where : {memberMail : member_mail, password : member_password}
    }).then(function(user) {
        if(user == null) {
                console.log("로그인 실패"); 
        }
        else {
                req.session.login = true
                req.session.idx = user.dataValues.memberId
                responseData = {'result' : 'ok', 'session' : req.session.login}; 
                res.render("signUp", {now_user :req.session.idx} );
                // signUp.ejs 조금 수정했어요 session 확인하려구 
                console.log("로그인 성공"); 
        }
    });
}

exports.login_f = login_f; 
