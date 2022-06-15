// 윤영주석처리 14일 10:54 (근데 이거 잘 이해를 못하겠어,,,)
const res = require("express/lib/response");
const models = require("../models/index"),
      Sequelize = require('sequelize'),
      Parttime = models.parttime,
      Member = models.member,
      schedule = models.schedule,
      daily = models.daily, 
      monthly = models.monthly;


const getPtlist = async (id) => { //내 id로 partimeName을 불러옴
    //이 함수는 내가 가진 아르바이트를 리스트로 보는 뷰에서 활동을 합니다.
    try {
        const ptlist = await Parttime.findAll({
            attributes : ['parttimeName' , 'parttimeId'],
            where : {
                ptMemberId : id
            }
        })
        console.log(ptlist); 
        return ptlist;  //내 id와 연결된 parttime 구조체들을 return

    }catch (err) {
        res.render("deleteError"); //for client;
        console.log(err) //for developer
    }
};


exports.getSchedule = async (req, res) => { 
//캘린더의 해당 날짜를 클릭 시, 그 해당 날짜의 일정이 있는 지 없는지 get하는 함수

      var thisDay = new Date(req.query.date);  //클릭 시 date를 받아옵니다.
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

        dailyPay = await  daily.findOne({ //일급 가져옵니다.
            attributes : [ 'dailyMemId' , [Sequelize.fn('sum', Sequelize.col('dailyTotal')), 'total']], //일급의 총합
            group : ['dailyMemId'], 
            raw : true, 
            where : { //조건으로 내 id와 date들을 줌.
                dailyMemId : req.session.idx,
                $custom: Sequelize.where(Sequelize.fn('date_format', Sequelize.col('date'),'%Y-%m-%d'),req.query.date)
            }
        })

        res.render("job_list", {data : data, dailyPay : dailyPay});  // 해당 날짜에 일정이 있을 시 render로 데이터를 보내줍니다.

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

        res.render("clear"); //작업이 정상적으로 완료 시, clear뷰로 랜더합니다.

    } catch (err) {
        res.render("scheduleError"); //user를 위해 error가 났다는 것을 뷰에 표기합니다.
    }
}

// 일정 삭제하기 
exports.deleteSchedule= async (req, res) => {
    try {
        console.log(req.body.idSchedule);
        await schedule.destroy({ //일정아이디를 이용해 일정을 삭제를 합니다
            where : { idSchedule: req.body.idSchedule}
        });
        res.render("clear");
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
}

//월급구하기 
const getMonthPay = async (id, month) => {

    try {
        const monthPay = await monthly.findOne({ //해당 월과 나의 id를 조건으로 해당월 의 월급을 sum하여 monthPay에 저장합니다.
            attributes : [ 'monthlyMemId' ,'month', [Sequelize.fn('sum', Sequelize.col('monthlyTotal')), 'total']],
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

// 월급 상세 정보 보내기
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

        getMonthPay(id, month).then ( //월급 명세서에는 info함수에 들어간 상세정보를 이용하여 render해줍니다.
            monthPay => 
            getMonthPay_byPt(id,month).then (
                monthPay_byPt => {
                    console.log(monthPay_byPt)
                    res.render("showMonthWage", {monthWage : monthPay, monthPay_byPt : monthPay_byPt, monthName : getMonthInfo.memberName, monthNum : month})
                }
              )
            )
        
    } catch (err) {
        
    }
}