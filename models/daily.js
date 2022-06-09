module.exports = (sequelize, Sequelize) => {
    const daily = sequelize.define("daily", {
        dailyMemId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        dailyPtId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        date: {
            type: Sequelize.DATE,
            primaryKey: true,
        },
        
        dailyTotal : {
            type: Sequelize.INTEGER,
        }, 
        dayCoveredTime : {
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