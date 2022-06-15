//일급 데이터 베이스
module.exports = (sequelize, Sequelize) => {
    const daily = sequelize.define("daily", {
        dailyMemId: { //기본키
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        dailyPtId: { //
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        date: {
            type: Sequelize.DATE,
            primaryKey: true,
        },
        
        dailyTotal : { //일급 총합
            type: Sequelize.INTEGER,
        }, 
        dayCoveredTime : {  //대타 시간.
            type: Sequelize.INTEGER,

        },
        dailyWorkTime : {
            type: Sequelize.INTEGER,
        }
    },
    {
        timestamps: false,
        tableName: 'daily'

    });

    return daily;
}