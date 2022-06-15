//일정 models(아르바이트의 하위개념.)
const { schedule } = require("../models/index");
const models = require("../models/index"),
moment = require("moment"),
member = models.member,
parttime = models.parttime;


module.exports = (sequelize, Sequelize) => {
    const schedule = sequelize.define("schedule", {
        idSchedule: { //일정id(기본키)
            type: Sequelize.INTEGER,
            autoIncrement : true,
            allowNull: false,
            primaryKey: true
        },
        scdlMemId: { //memberId(기본키)
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        scdlPtId: { //아르바이트 id(parttimeId)
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        isCovered: { //대타여부
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue : 0
        },
        startTime: { // 일정(알바) 시작 날짜+시간
            type: Sequelize.DATE,
            allowNull: false
        },
        endTime: { //일정(알바) 끝 날짜+시간.
            type: Sequelize.DATE,
            allowNull: false,
            validate: {
                isAfterStartTime(value) { //끝나는 시간이 시작 시간보다 빠를 때 처리.
                    if (!moment(value).isAfter(moment(this.startTime))) {
                        throw new Error("시작 시간 이후로 설정해주세요!");
                    }
                  }
            }
        },
        holiday: { //주휴수당
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue : 0
        },
        overPay: { //연장수당
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue : 0
        },
        rest: { //휴일수당
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue : 0
        },
        night: { //야간수당.
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue : 0
        },
        extra: {  //추가 수당.
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue : 0
        },
        wage: { //시급 (기본값은 현재 2022-06-14 기준 최저시급으로 설정하였습니다.)
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

