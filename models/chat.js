//채팅 model
module.exports = (sequelize, Sequelize) => {
    const chat = sequelize.define("chat", {
        chatNumber: { //기본키
            type: Sequelize.INTEGER,
            autoIncrement: true, //자동으로 증가하게 하였습니다
            allowNull: false,
            primaryKey: true
        },
        senderId: { //sender, receiverId는 모두 member의 memberId외래키이다. member에서 삭제 시ㅡ> 자동 삭제
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