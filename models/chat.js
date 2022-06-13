
module.exports = (sequelize, Sequelize) => {
    const chat = sequelize.define("chat", {
        chatNumber: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        senderId: {
            type: Sequelize.INTEGER,
            foreignKey: 'memberId',
            allowNull: false,
            primaryKey: false
        },
        receiverId: {
            type: Sequelize.INTEGER,
            foreignKey: 'memberId',
            allowNull: false,
            primaryKey: false
        },
        chatTime: {
            type: Sequelize.DATE,
            allowNull: false,    
        },
        chatContent: {
            type: Sequelize.STRING,
            defaultValue : 1,
            allowNull: true
        }
    },
    {
        timestamps: false, 
        tableName: 'chat'
    });
    return chat;
}