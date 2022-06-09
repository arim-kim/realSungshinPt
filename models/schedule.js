const { schedule } = require("../models/index");

const models = require("../models/index"),
moment = require("moment"),
member = models.member,
parttime = models.parttime;


module.exports = (sequelize, Sequelize) => {
    const schedule = sequelize.define("schedule", {
        idSchedule: {
            type: Sequelize.INTEGER,
            autoIncrement : true,
            allowNull: false,
            primaryKey: true
        },
        scdlMemId: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        scdlPtId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        isCovered: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue : 0
        },
        startTime: {
            type: Sequelize.DATE,
            allowNull: false
        },
        endTime: {
            type: Sequelize.DATE,
            allowNull: false,
            validate: {
                isAfterStartTime(value) {
                    if (!moment(value).isAfter(moment(this.startTime))) {
                        throw new Error("시작 시간 이후로 설정해주세요!");
                    }
                  }
            }
        },
        holiday: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue : 0
        },
        overPay: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue : 0
        },
        rest: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue : 0
        },
        night: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue : 0
        },
        extra: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue : 0
        },
        wage: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue : 9160
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName : "schedule"
    });
    return schedule;

}

