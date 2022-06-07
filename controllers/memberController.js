const db = require("../models/index"),
Member = db.member,
Op = db.Sequelize.Op;

exports.getAllMembers = async (req, res) => {
    try {
        data = await Member.findAll();
        console.log(data);
        res.render("signUp");
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};