const parttime = require("../models/parttime");

const db = require("../dbconnection"),
      models = require("../models/index"),
      Sequelize = require('sequelize'),
      Parttime = models.parttime,
      schedule = models.schedule,
      dayFunc = require('date-fns'); 


// exports.editSchedule = async (req, res) => {
//     getPtlist(req.session.idx).then (
//         ptlist => {     
//             console.log(ptlist); 
//             res.render("addSchedule", { pt : ptlist});}
//     );    
// };

// // 수정해야함 
// exports.editScheduleClear = async (req, res) => {
//     getPtlist(req.session.idx).then (
//         ptlist => {     
//             console.log(ptlist); 
//             res.render("addSchedule", { pt : ptlist});}
//     );    
// };


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

exports.getSchedule = async (req, res) => {
    
      var thisDay = new Date(req.query.date);
    //   var thisDay = parseISO(thisDay);
      console.log(thisDay);
      startOfDay = dayFunc.startOfDay(thisDay);
      endOfDay = dayFunc.endOfDay(thisDay);

    try {  data = await schedule.findAll( {

        include : [{
            model : Parttime, 
            attributes : ['parttimeName' , 'parttimeId', 'color']
        }
        ], 
            where: {
                    scdlMemId : req.session.idx,
                    $custom: Sequelize.where(Sequelize.fn('date_format', Sequelize.col('startTime'),'%Y-%m-%d'),req.query.date)
            }                
        });
        
        res.render("job_list", {data : data})
        console.log(data); 

    }catch (err) {
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

        res.render("clear");

    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
}


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