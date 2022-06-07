module.exports = (sequelize, Sequelize) => {
    const monthly = sequelize.define("member", {
        monthlyMemId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        month: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        monthlyTotal : {
            type: Sequelize.INTEGER,
        },
        monthlyPtId : {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    }, 
    {
        timestamps: false,
        tableName: 'monthly'

    });

    return monthly;
}