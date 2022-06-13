const models = require("../models/index"),
      Sequelize = require('sequelize'),
      Parttime = models.parttime,
      schedule = models.schedule,
      daily = models.daily,
      member = models.member;

//친구 캘린더 보여주기 (내 캘린더 보기와 다른 ejs (일급을 보여주면 안되므로))
exports.showFriendCalendar = async (req, res) => {
    console.log(req.query.friendId);
    req.session.friendId = req.query.friendId;
    getFriendName(req.session.friendId).then (
        friendName => 
        res.render("friend_calendar", {friendName : friendName.memberName}) 
    );
    
};

const getFriendName  = async (id) => {
    try {
        data = member.findOne({
            where : {memberId : id}
        }) 
        return data;
    }catch(err) {
        return err; 
    }
};

// 친구 일정 목록 보여주기 
exports.showFriendJobList = async (req, res) => {

    var thisDay = new Date(req.query.date);
    console.log(thisDay);
    
    try { data = await schedule.findAll( {

      include : [{
          model : Parttime, 
          attributes : ['parttimeName' , 'parttimeId', 'color']
      }
      ], attributes : [
        [Sequelize.fn('date_format', Sequelize.col('startTime'), '%Y-%m-%d %h:%m'), 'startTime'],
        [Sequelize.fn('date_format', Sequelize.col('endTime'), '%Y-%m-%d %h:%m'), 'endTime'],
        'idSchedule',
    ],
          where: {
                  scdlMemId : req.session.friendId,
                  $custom: Sequelize.where(Sequelize.fn('date_format', Sequelize.col('startTime'),'%Y-%m-%d') , req.query.date)
          }                
      });


    console.log(data);
    res.render("friend_job_list", {date : data, friend : req.session.friendId}); 

    }catch (err) {
        res.status(500).send({
         message: err.message
    });
}
}