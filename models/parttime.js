module.exports = (sequelize, Sequelize) => {
    const parttime = sequelize.define("parttime", {
        parttimeId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        ptMemberId: {
            type: Sequelize.INTEGER,
            foreignKey: 'memberId',
            allowNull: false,
            primaryKey: true
        },
        parttimeName: {
            type: Sequelize.STRING,
            defaultValue: 'X',
            allowNull: false
        },
        weekPay: {
            type: Sequelize.INTEGER,
            defaultValue : 1,
            allowNull: true
        },
        tax: {
            type: Sequelize.INTEGER,
            defaultValue : 0,
            allowNull: true
        },
        color: {
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