module.exports = (sequelize, Sequelize) => {
    const member = sequelize.define("member", {
        memberMail: {
            type: Sequelize.STRING,
            allowNull: false
        },
        memberId: {
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