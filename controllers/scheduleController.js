//const db = require("../dbconnection"),
const con = require("../dbconnection");
const db = require("../models/index"),
Schedule = db.schedule,
Op = db.Sequelize.Op;
/*
getScheduleParams = body => {
    return {
        scdlMemId : body.scdlMemId,
        scdlPtId : body.scdlPtId,
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
*/

module.exports = {
    // 아르바이트 테이블에서 정보 받아와야하는데 이렇게하려면 models/parttime.js도 추가해야하는지 찾아보기
    // 일단 raw query 사용햠
    addSchedule : async (req, res) => {
        try {
            let sql = 'SELECT * FROM parttime where ptMemberId=49';
            let [rows, fields] = await con.query(sql);
            res.render("addSchedule", { pt: rows });
        } catch (err) {
            res.status(500).send({
                message: err.message
            });
        }
    },
    // sequelize 사용
    addScheduleClear : async (req, res) => {
        try {
            //let scdl = getScheduleParams(req.body);
            //const schedule
            await Schedule.create({
                scdlMemId: req.body.scdlMemId,
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
            res.render("submit");
        } catch (err) {
            res.status(500).send({
                message: err.message
            });
        }
    }

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
};