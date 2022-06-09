module.exports = (sequelize, Sequelize) => {
    const friends = sequelize.define("friends", {
        myId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey: 'memberId',
            primaryKey: true
            
        },
        yourId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey: 'memberId',
            primaryKey: true
        },
        room: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false,
        tableName: 'friends'
    });
    return friends;
}