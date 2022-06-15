//월급 관련 model
module.exports = (sequelize, Sequelize) => {
    const monthly = sequelize.define("member", {
        monthlyMemId: { //기본키
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        month: { //1,2,3, ...., 12월 (기본키)
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        monthlyTotal : { //월급 총합.
            type: Sequelize.INTEGER,
        },
        monthlyPtId : { //해당 알바 월급 총합.
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