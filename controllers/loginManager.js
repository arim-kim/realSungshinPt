
const models = require("../models/index"),
member = models.member,
parttime = models.parttime;

const getPtlist = async (id) => {
    try {
        const ptlist = await  parttime.findAll({
            attributes : ['parttimeName' , 'color'],
            where : {
                ptMemberId : id
            }
        })
        return ptlist; 

    }catch (err) {
        return err; 
    }

};

exports.login_f = async (member_mail,member_password,res,req) => {
    var responseData; 
    console.log("로그인 검사");
    models.member.findOne({
        where : {memberMail : member_mail, password : member_password}
    }).then(function(user) {
        if(user == null) {
                console.log("로그인 실패"); 
                res.render("login"); 
        }
        else {
            if(req.session.num == undefined) {
                req.session.num = 1; 
            }
            else {
                req.session.num ++; 
            }
                console.log(req.session.num);
                req.session.login = true
                req.session.idx = user.dataValues.memberId
                responseData = {'result' : 'ok', 'session' : req.session.login}; 
                getPtlist(req.session.idx).then (
                    ptlist => {     
                        console.log(ptlist); 
                        res.render("index", {now_user :req.session.idx, data : ptlist});}
                ); 
                // signUp.ejs 조금 수정했어요 session 확인하려구 
                console.log("로그인 성공"); 
        }
    });
}

