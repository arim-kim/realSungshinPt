const model=require("../models/index"),
    Member=model.member,
    Op=model.Sequelize.Op,
    Friend=model.friends;

var fid=new Array();



const getName = async(id) => {
try{
    data = await Member.findOne({
        attributes : ['memberName'],
        where : {
            memberId : id
        }
    })

    return data; 
}catch(err) {
    console.log(err);
}
}

exports.getAllfriend = async (req, res) => {
    try {
        console.log("getAllFREINEFIE");

        data = await Friend.findAll({
            where: {
                myId: req.session.idx
            }
        });
       
        await data.forEach(e => {

            getName(e.yourId).then(
                new_data=>{
                    fid.push(new_data);
                
                }
            )
            return 0;
      });
        
        await res.render("friendlist", {FFFF:fid});  
        fid=[];

    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};




