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

exports.clear = (req, res) => {
    res.render("clear");
};

exports.join = (req, res) => {
    res.render("signUp");
};

exports.job = (req, res) => {
    res.render("jobinfo");
};

exports.friend = (req, res) => {
    res.render("addFriend");
};

exports.login = async (req, res) => {
    res.render("login"); 
};

exports.friendlist=async(req,res)=>{
    res.render("friendlist");
};

const getPtlist = async (id) => {
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

const findName = async (id) => {
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

const getScheduleCount = async (id) => {
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

const getAllSchedule = async (id) => {
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
        const scheduleList = await  schedule.findAll({
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
                    [Sequelize.fn('date_format', Sequelize.col('startTime'), '%Y-%m-%d %h:%m'), 'startTime'] ],
                order: [
                    ['startTime', 'ASC'],
                ] 

        })

        return scheduleList; 

    }catch (err) {
        return err; 
    }

};

exports.index = async (req, res) => {
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





