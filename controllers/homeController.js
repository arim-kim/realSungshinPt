const db = require("../models/index"),
Parttime = db.parttime,
member = db.member,
Sequelize = require('sequelize'),
schedule = db.schedule, 
Op = db.Sequelize.Op;



exports.main = (req, res) => {
    res.render("index", {layout : false});
};

exports.join = (req, res) => {
    res.render("signUp");
};
exports.job = (req, res) => {
    res.render("jobInfo");
};

exports.friend = (req, res) => {
    res.render("addFriend");
};

exports.login = async (req, res) => {
    res.render("login"); 
}


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
        console.log(thisDay);
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
                            console.log(scheduleList);
                            res.render("index", {now_user :req.session.idx, data : ptlist, schedule : scheduleList});}
                    ); 
                }

            )
        }catch (err) {
            res.status(500).send({
                message: err.message
            });
        }
    }
};


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


// exports.schedule1 = (req, res) => {
//     res.render("schedule1");
// };

// exports.schedule2 = (req, res) => {
//     res.render("schedule2");
// };

exports.testEnv = (req, res) => {
	// let exec = async () => {
	// 	let sql = "SELECT * FROM members";
	// 	let [rows, fields] = await db.query(sql);
	// 	console.log(rows);
	// 	res.render("test", {mem : rows});
	// };
	// exec();
};