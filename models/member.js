//사용자들 model
module.exports = (sequelize, Sequelize) => {
    const member = sequelize.define("member", {
        memberMail: {
            type: Sequelize.STRING,
            allowNull: false
        },
        memberId: { //기본키.
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        memberName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    });

    return member;
}