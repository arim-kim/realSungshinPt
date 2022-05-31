const db = require("../dbconnection"),
getScheduleParams = body => {
    return {
        wage : body.wage,
        startTime : body.startTime,
        endTime : body.endTime,
        isCovered : body.isCovered,
        rest : body.rest,
        overPay : body.overPay,
        night : body.night,
        holiday : body.holiday,
        extra : body.extra
    };
}
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
*/
module.exports = {
    addSchedule : async (req, res) => {
        let sql = 'SELECT * FROM parttime where ptMemberId=2';
        let [rows, fields] = await db.query(sql);
        //console.log(rows);
        res.render("addSchedule", { pt: rows });
    },
    addScheduleClear : async (req, res) => {
        try {
            let scdl = getScheduleParams(req.body);
            let sql = "INSERT INTO schedule(scdlMemId, scdlPtId, isCovered, startTime, endTime, holiday, overPay, rest, night, extra, wage) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            let params = [2, 4, scdl.isCovered, scdl.startTime, scdl.endTime, scdl.holiday, scdl.overPay, scdl.rest, scdl.night, scdl.extra, scdl.wage];
            await db.query(sql, params);
            res.render("submit");
        } catch (err) {
            res.status(500).send({
                message: err.message
            });
        }
    }
    /*
    saveScdl1 : async (req, res, next) => {
        let scdl1Params = await getScdl1Params(req.body);
        res.locals.wage = parseInt(scdl1Params.wage);
        res.locals.startTime = scdl1Params.startTime;
        res.locals.endTime = scdl1Params.endTime;
        res.locals.isCovered = parseInt(scdl1Params.isCovered);
        res.locals.rest = parseInt(scdl1Params.rest);
        res.render("schedule2");
        next();
    },
    addSchedule : async (req, res, next) => {
        let scdl2Params = getScdl2Params(req.body);
        let sql =
        "INSERT INTO schedule(scdlMemId, scdlPtId, isCovered, startTime, endTime, holiday, overPay, rest, night, extra, wage) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        let params = [2, 1, res.locals.isCovered, res.locals.startTime, res.locals.endTime, scdl2Params.holiday, scdl2Params.overPay, res.locals.rest, scdl2Params.night, scdl2Params.extra, res.locals.wage];
        await db.query(sql, params);
        res.render("submit");
    }
    */
};