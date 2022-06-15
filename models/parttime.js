//아르바이트 models
module.exports = (sequelize, Sequelize) => {
    const parttime = sequelize.define("parttime", {
        parttimeId: { //기본키 (자동증가)
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        ptMemberId: { //기본키(parttimeId와 엮여야 해당 사용자에게 알맞은 뷰 제공 가능)
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        parttimeName: { //아르바이틍 이름
            type: Sequelize.STRING,
            defaultValue: 'X',
            allowNull: false
        },
        weekPay: { //주급
            type: Sequelize.INTEGER,
            defaultValue : 1,
            allowNull: true
        },
        tax: { //세금(알바 할 때 세금을 떼감.)
            type: Sequelize.INTEGER,
            defaultValue : 0,
            allowNull: true
        },
        color: { //지정컬러.
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false,
        tableName: 'parttime'
    });

    return parttime;
}