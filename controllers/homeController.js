const db = require("../models/index"),
Parttime = db.parttime,
member = db.member,
daily = db.daily, 
monthly = db.monthly,
Sequelize = require('sequelize'),
schedule = db.schedule, 
Op = db.Sequelize.Op;

exports.main = (req, res) => {
    res.render("index");
};

/*로그인 실패 혹은 로그아웃 시 로그인 페이지로 이동*/
exports.login = async (req, res) => {
    res.render("login"); 
};

/*회원가입*/
exports.join = (req, res) => {
    res.render("signUp");
};


exports.clear = (req, res) => {
    res.render("clear");
};

// 아르바이트 관련
exports.job = (req, res) => {
    res.render("jobinfo");
};

// 친구추가 뷰
exports.friend = (req, res) => {
    res.render("addFriend");
};

// 친구 목록 뷰
exports.friendlist=async(req,res)=>{
    res.render("friendlist");
};


const getPtlist = async (id) => { //아르바이트 list를 get하는 함수
    try {
        const ptlist = await  Parttime.findAll({
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

const findName = async (id) => { //id로 member에서 name을 찾는다,
    try{
        data = member.findOne(
            {
                where : {
                    memberId : id
                }
            }
        )

        return data; 

    }catch(err) {
        return err; 
    }
}

const getScheduleCount = async (id) => { //일정 목록을 따오는 함수
    try {
        const scheduleList = await  schedule.findAll({
            group : [[Sequelize.fn('date_format', Sequelize.col('startTime'), '%Y-%m-%d'), 'startTime'] ],
            attributes : [ [Sequelize.fn('date_format', Sequelize.col('startTime'), '%Y-%m-%d'), 'startTime'] , [Sequelize.fn('COUNT', 'startTime'), 'count']], 
                where: {
                        scdlMemId : id
                }
        })

        return scheduleList; 
    }catch (err) {
        return err; 
    }
};

const getAllSchedule = async (id) => { //해당 id의 모든 스케줄을 불러오는 함수.
    try {
        let today = new Date(); 
        let year = today.getFullYear(); 
        let month = today.getMonth() + 1;
        let day = today.getDate();

        if(month < 10) {
            month = "0"+month;
        }
        if(day < 10) {
            day = "0"+day;
        }
        let thisDay = year + "-" + month + "-" + day; 
        const scheduleList = await  schedule.findAll({ //schedule 에서 id와 날짜를 조건으로 가져온다.
            include : [{
                model : Parttime, 
                attributes : ['parttimeName' , 'parttimeId', 'color']
            }
            ], 
                where: {
                        scdlMemId : id,
                        $custom: Sequelize.where(Sequelize.fn('date_format', Sequelize.col('startTime'),'%Y-%m-%d'),thisDay)
                },
                attributes : [
                    [Sequelize.fn('date_format', Sequelize.col('startTime'), '%Y-%m-%d %H:%i'), 'startTime'] ],
                order: [
                    ['startTime', 'ASC'],
                ] 

        })

        return scheduleList; 

    }catch (err) {
        return err; 
    }

};

exports.index = async (req, res) => { //로그인 세션
    if(!req.session.login) {
        req.session.login = false
        req.session.idx = -1
        res.render("login");
    }


    else {
        try{
            getAllSchedule(req.session.idx).then (
                scheduleList => {
                    getPtlist(req.session.idx).then (
                        ptlist => {     
                            findName(req.session.idx). then (
                                name => {
                                    res.render("index", {now_user : name.memberName, data : ptlist, schedule : scheduleList});
                                }
                            )
                                    
                                }
                            )
                        }
                    )

                } catch (err) {
            res.status(500).send({
                message: err.message

            });
        }
    }
};





