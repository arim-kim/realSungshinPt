const db = require("../models/index"),
Parttime = db.parttime,
Op = db.Sequelize.Op;

exports.getAllParttimes = async (req, res) => {
    try {
        data = await Parttime.findAll();
        console.log(data);
        res.render("jobinfo");
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};

exports.getOneJob = async (req, res) => {
    try {
        data = await Parttime.findAll();
        res.render("job_list", {data : data})
        // signUp.ejs 조금 수정했어요 session 확인하려구 
        console.log("일정 보여주기"); 

        // data = await Parttime.findAll({
        //     where : {memberMail : member_mail, password : member_password}
        // }).then(function(user) {
        //     if (data == null) {
        //         res.render("schedule1");
        //         console.log("해당 날짜에는 일정이 없습니다. 추가하세요");  
        //     }
        //     else {
        //             res.render("job_list", {data : data})
        //             // signUp.ejs 조금 수정했어요 session 확인하려구 
        //             console.log("일정 보여주기"); 
        //     }
        // });

    }catch (err) {
        res.render("schedule1");
        console.log("해당 날짜에는 일정이 없습니다. 추가하세요");  
        res.status(500).send({
            message: err.message
        });
    }
}