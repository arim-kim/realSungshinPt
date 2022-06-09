const models = require("../models/index"),
      Sequelize = require('sequelize'),
      Parttime = models.parttime,
      schedule = models.schedule,
      daily = models.daily;


exports.showFriendCalendar = async (req, res) => {
    console.log(req.query.friendId);
    req.session.friendId = req.query.friendId;
    res.render("friend_calendar"); 
};


exports.showFriendJobList = async (req, res) => {

    var thisDay = new Date(req.query.date);
    console.log(thisDay);
    
    try { data = await schedule.findAll( {

      include : [{
          model : Parttime, 
          attributes : ['parttimeName' , 'parttimeId', 'color']
      }
      ], 
          where: {
                  scdlMemId : req.session.friendId,
                  $custom: Sequelize.where(Sequelize.fn('date_format', Sequelize.col('startTime'),'%Y-%m-%d') , req.query.date)
          }                
      });


    console.log(data);
    res.render("friend_job_list", {date : data}); 

    }catch (err) {
        res.status(500).send({
         message: err.message
    });
}
}