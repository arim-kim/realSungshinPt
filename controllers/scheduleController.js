const member = require("../models/member");

const models = require("../models/index"),
      Sequelize = require('sequelize'),
      Parttime = models.parttime,
      Member = models.member,
      schedule = models.schedule,
      daily = models.daily, 
      monthly = models.monthly;


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


// 일정 가져오기 
exports.getSchedule = async (req, res) => {
    
      var thisDay = new Date(req.query.date);
      console.log(thisDay);

    try {  
        
        data = await schedule.findAll( {

            // join 
        include : [{
            model : Parttime, 
            attributes : ['parttimeName' , 'parttimeId', 'color']
        }
        ], 
        attributes : [
            [Sequelize.fn('date_format', Sequelize.col('startTime'), '%Y-%m-%d %h:%m'), 'startTime'],
            [Sequelize.fn('date_format', Sequelize.col('endTime'), '%Y-%m-%d %h:%m'), 'endTime'],
            'idSchedule', 'isCovered'
        ],
            where: {
                    scdlMemId : req.session.idx,
                    $custom: Sequelize.where(Sequelize.fn('date_format', Sequelize.col('startTime'),'%Y-%m-%d'),req.query.date)
            }                
        });

        dailyPay = await  daily.findOne({
            attributes : [ 'dailyMemId' , [Sequelize.fn('sum', Sequelize.col('dailyTotal')), 'total']],
            group : ['dailyMemId'], 
            raw : true, 
            where : {
                dailyMemId : req.session.idx,
                $custom: Sequelize.where(Sequelize.fn('date_format', Sequelize.col('date'),'%Y-%m-%d'),req.query.date)
            }
        })

        res.render("job_list", {data : data, dailyPay : dailyPay}); 

    }catch (err) {
        console.log("해당 날짜에는 일정이 없습니다. 추가하세요");  
        res.status(500).send({
            message: err.message
        });
    }
}
//일정 추가하기 
exports.addSchedule = async (req, res) => {
    getPtlist(req.session.idx).then (
        ptlist => {     
            console.log(ptlist); 
            res.render("addSchedule", { pt : ptlist});}
    );    
}

// 일정 추가하기 - post 
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

        res.render("clear");

    } catch (err) {
        res.render("scheduleError");
    }
}

// 일정 삭제하기 
exports.deleteSchedule= async (req, res) => {
    try {
        console.log(req.body.idSchedule);
        await schedule.destroy({
            where : { idSchedule: req.body.idSchedule}
        });
        res.render("clear");
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
}

const getMonthPay = async (id, month) => {

    try {
        const monthPay = await monthly.findOne({
            attributes : [ 'monthlyMemId' ,'month', [Sequelize.fn('sum', Sequelize.col('monthlyTotal')), 'total', 'member']],
            group : ['month'], 
            raw : true, 
            where : {
                monthlyMemId : id,
                month : month
            }
        })
        return monthPay;

    }catch (err) {
        return err; 
    }
}

// 
const getMonthPay_byPt = async (id,month ) => {

    try {
        const monthPay_byPt = await monthly.findAll({
           
            include : [{
                model : Parttime, 
                attributes : ['parttimeName' , 'parttimeId', 'color']
            }
            ], 
            where: {
                    monthlyMemId : id,
                    month : month
            }                
        });

        return monthPay_byPt;

    }catch (err) {
        return err; 
    }
}

// 월급보기 
exports.showMonthWage = async (req, res) => {
    try {
        const id = req.session.idx, 
              month =  req.query.month;
        console.log(req.body.idSchedule);
        
        const getMonthInfo = await Member.findOne({
            where: {
                memberId : id
            }
        });

        getMonthPay(id, month).then (
            monthPay => 
            getMonthPay_byPt(id,month).then (
                monthPay_byPt => {
                    console.log(monthPay_byPt)
                    res.render("showMonthWage", {monthWage : monthPay, monthPay_byPt : monthPay_byPt, monthName : getMonthInfo.memberName, monthNum : month});
                    // console.log(monthPay_byPt);
                    console.log(monthPay);
                    res.render("showMonthWage", {monthWage : monthPay, monthPay_byPt : monthPay_byPt, day : req.query.month})
                }
              )
            )
        
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
}