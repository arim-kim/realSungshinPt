const models = require("../models/index"),
member = models.member,
parttime = models.parttime;

/*로그인*/
exports.login = async (res,req) => {

    var responseData; 
    console.log("로그인 검사");

    models.member.findOne({

        where : {memberMail : req.body.mail, password : req.body.pw}
        
    }).then(function(user) {
        if(user == null) {
            console.log("로그인 실패"); 
            res.send("<script>alert('사용자 정보가 일치하지 않습니다.');location.href='/login';</script>");
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
                    res.redirect("/");
                }
            ); 
            console.log("로그인 성공"); 
        }
    });
}

/*로그아웃*/
exports.logout = function (req, res) {
    console.log(req.session);
    req.session = null;  
    console.log("로그아웃");
    res.render("logout");
};

/*로그인 사용자 아르바이트 리스트*/
const getPtlist = async (id) => {
    try {
        const ptlist = await  parttime.findAll({
            attributes : ['parttimeName' , 'color'],
            where : {
                ptMemberId : id
            }
        })
        return ptlist; 
    
    } catch (err) {
        return err; 
    }
};
