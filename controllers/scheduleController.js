const db = require("../dbconnection"),
      models = require("../models/index"),
      Parttime = models.parttime,
      schedule = models.schedule; 


// 일단 파트타임으로 했는데 스케쥴 config에 추가하고 전체적으로 수정해야함 
exports.editSchedule = async (req, res) => {
    try {
        data = await schedule.findAll({where : 
            {scdlMemId : 1}});
        console.log(data);
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};

exports.getOneJob = async (req, res) => {
    try {
        data = await schedule.findAll();
        res.render("job_list", {data : data})
        // signUp.ejs 조금 수정했어요 session 확인하려구 
        console.log(data); 

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


const getPtlist = async (id) => {
    try {
        const ptlist = await Parttime.findAll({
            attributes : ['parttimeName' , 'parttimeId'],
            where : {
                ptMemberId : id
            }
        })
        console.log(ptlist); 
        return ptlist; 

    }catch (err) {
        return err; 
    }

};

const getptId = async (id ,pattimeName) => {
    try {
        const ptId = await  Parttime.findOne({
            attributes : ['pattimeId'],
            where : {
                ptMemberId : id, 
                parttimeName : pattimeName
            }
        })
        console.log(ptId); 
        return ptId; 

    }catch (err) {
        return err; 
    }

};

exports.getOneJob = async (req, res) => {
    try {
        data = await schedule.findAll();
        res.render("job_list", {data : data})
        // signUp.ejs 조금 수정했어요 session 확인하려구 
        console.log(data); 


    }catch (err) {
        res.render("schedule1");
        console.log("해당 날짜에는 일정이 없습니다. 추가하세요");  
        res.status(500).send({
            message: err.message
        });
    }
}

exports.addSchedule = async (req, res) => {
    getPtlist(req.session.idx).then (
        ptlist => {     
            console.log(ptlist); 
            res.render("addSchedule", { pt : ptlist});}
    );    
}

exports.addScheduleClear = async (req, res) => {
    try {
        await schedule.create({
            scdlMemId: req.session.idx,
            scdlPtId: req.body.scdlPtId,
            isCovered: req.body.isCovered,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            holiday: req.body.holiday,
            overPay: req.body.overPay,
            rest: req.body.rest,
            night: req.body.night,
            extra: req.body.extra,
            wage: req.body.wage
        });
        res.send("submit");
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
}


// module.exports = {
//     // 아르바이트 테이블에서 정보 받아와야하는데 이렇게하려면 models/parttime.js도 추가해야하는지 찾아보기
//     // 일단 raw query 사용햠
//     addSchedule : async (req, res) => {
//         try {
//             let sql = 'SELECT * FROM parttime where ptMemberId=49';
//             let [rows, fields] = await con.query(sql);
//             res.render("addSchedule", { pt: rows });
//         } catch (err) {
//             res.status(500).send({
//                 message: err.message
//             });
//         }
//     },
//     // sequelize 사용
//     addScheduleClear : async (req, res) => {
//         try {
//             //let scdl = getScheduleParams(req.body);
//             //const schedule
//             await Schedule.create({
//                 scdlMemId: req.body.scdlMemId,
//                 scdlPtId: req.body.scdlPtId,
//                 isCovered: req.body.isCovered,
//                 startTime: req.body.startTime,
//                 endTime: req.body.endTime,
//                 holiday: req.body.holiday,
//                 overPay: req.body.overPay,
//                 rest: req.body.rest,
//                 night: req.body.night,
//                 extra: req.body.extra,
//                 wage: req.body.wage
//             });
//             res.render("submit");
//         } catch (err) {
//             res.status(500).send({
//                 message: err.message
//             });
//         }
//     }
// };
    /*
    addSchedule : async (req, res) => {
        let sql = 'SELECT * FROM parttime where ptMemberId=51';
        let [rows, fields] = await db.query(sql);
        //console.log(rows);
        res.render("addSchedule", { pt: rows });
    },
    addScheduleClear : async (req, res) => {
        try {
            let scdl = getScheduleParams(req.body);
            let sql = "INSERT INTO schedule(scdlMemId, scdlPtId, isCovered, startTime, endTime, holiday, overPay, rest, night, extra, wage) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            let params = [51, 8, scdl.isCovered, scdl.startTime, scdl.endTime, scdl.holiday, scdl.overPay, scdl.rest, scdl.night, scdl.extra, scdl.wage];
            await db.query(sql, params);
            res.render("submit");
        } catch (err) {
            res.status(500).send({
                message: err.message
            });
        }
    }
    */
// };
// exports.addSchedulePost = async (req, res) => {

//     console.log("여기로 들어왔어요~");

//     try {
//         // console.log(req.body);
//         schedule.create({
//                 // 여기 내가 수정해놨엉!!
//                 scdlMemId : getptId(req.session.id,req.body.parttimeName ),
//                 scdlPtId :14,
//                 isCovered: req.body.isCovered, 
//                 startTime : req.body.start,
//                 endTime : req.body.end,
//                 holiday : req.body.holiday,
//                 overPay : req.body.overPay,
//                 rest : 50,
//                 night : 50, 
//                 extra : 50,
//                 wage : 50
//         })
//         .then( result => {
//                 console.log(result);
//                 res.render("clear");
//         })
//         .catch( err => {
//                 console.log(err)
//                 console.log("데이터 추가 실패");
//         })

//     }catch (err) {
        
//         res.status(500).send({
//             message: err.message
//         });
//     }
// }; 

// exports.addSchedule = async (req, res) => {
//     getPtlist(req.session.idx).then (
//         ptlist => {     
//             console.log(ptlist); 
//             res.render("addSchedule", { pt : ptlist});}
//     ); 
   
// }
/*getScdl1Params = body => {
    return {
        wage : body.wage,
        startTime : body.startTime,
        endTime : body.endTime,
        isCovered : body.isCovered,
        rest : body.rest
    };
},
getScdl2Params = body => {
    return {
        overPay : body.overPay,
        night : body.night,
        holiday : body.holiday,
        extra : body.extra
    };
};*/


/*
exports.showscdl1 = (req, res) => {
    let sql = 'SELECT * FROM parttime where ptMemberId=2';
    let [rows, fields] = await db.query(sql);
    //console.log(rows);
    res.render("schedule1", { pt: rows });
    res.render("schedule1");
};

exports.showscdl2 = (req, res) => {
    res.render("schedule2");
};


exports.testScdl = async (req, res) => {
    let sql = 'SELECT * FROM parttime where ptMemberId=2';
    let [rows, fields] = await db.query(sql);
    //console.log(rows);
    res.render("addSchedule", { pt: rows });
};

// */
// module.exports = {
//     addSchedule : async (req, res) => {
//         let sql = 'SELECT * FROM parttime where ptMemberId=2';
//         let [rows, fields] = await db.query(sql);
//         //console.log(rows);
//         res.render("addSchedule", { pt: rows });
//     },
//     addScheduleClear : async (req, res) => {
//         try {
//             let scdl = getScheduleParams(req.body);
//             let sql = "INSERT INTO schedule(scdlMemId, scdlPtId, isCovered, startTime, endTime, holiday, overPay, rest, night, extra, wage) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
//             let params = [51, 8, scdl.isCovered, scdl.startTime, scdl.endTime, scdl.holiday, scdl.overPay, scdl.rest, scdl.night, scdl.extra, scdl.wage];
//             await db.query(sql, params);
//             res.render("submit");
//         } catch (err) {
//             res.status(500).send({
//                 message: err.message
//             });
//         }
//     }
//     /*
//     saveScdl1 : async (req, res, next) => {
//         let scdl1Params = await getScdl1Params(req.body);
//         res.locals.wage = parseInt(scdl1Params.wage);
//         res.locals.startTime = scdl1Params.startTime;
//         res.locals.endTime = scdl1Params.endTime;
//         res.locals.isCovered = parseInt(scdl1Params.isCovered);
//         res.locals.rest = parseInt(scdl1Params.rest);
//         res.render("schedule2");
//         next();
//     },
//     addSchedule : async (req, res, next) => {
//         let scdl2Params = getScdl2Params(req.body);
//         let sql =
//         "INSERT INTO schedule(scdlMemId, scdlPtId, isCovered, startTime, endTime, holiday, overPay, rest, night, extra, wage) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
//         let params = [2, 1, res.locals.isCovered, res.locals.startTime, res.locals.endTime, scdl2Params.holiday, scdl2Params.overPay, res.locals.rest, scdl2Params.night, scdl2Params.extra, res.locals.wage];
//         await db.query(sql, params);
//         res.render("submit");
//     }
//     */
// };

