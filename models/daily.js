module.exports = (sequelize, Sequelize) => {
    const daily = sequelize.define("member", {
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
        dateWeekNum: {
            type: Sequelize.INTEGER,

            type: Sequelize.STRING,
            allowNull: false
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