const db = require("../models/index"),
Member = db.member,
Op = db.Sequelize.Op;

exports.getAllMembers = async (req, res) => {
    try {
        data = await Member.findAll();
        console.log(data);
        res.render("singUp");
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};