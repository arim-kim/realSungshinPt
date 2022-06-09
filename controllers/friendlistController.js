const model=require("../models/index"),
    Member=model.member,
    Op=model.Sequelize.Op,
    Friend=model.friends;
    var fid =new Array();

const getOne = async(id) => {
    try{
        data = await Member.findOne({
            attributes : ['memberName', 'memberId'],
            where : {
                memberId : id
            }
        })
        return data; 
    }catch(err) {
        console.log(err);
    }
}

const getAllfriend = async(id) => {

    try{
        data = await Friend.findAll({
            where: {
                myId: id
            }
        });
        await data.forEach(e => {
            e.yourId
          console.log(e.yourId);
          getOne(e.yourId).then(
              new_data=>{
                  fid.push(new_data);
              })});
    
      return fid; 

    }catch(err) {
        console.log(err);
    }
}



exports.getAllfriends = async (req, res) => {

    try{

        // 후보1
        data = await Friend.findAll({
            where: {
                myId: req.session.idx
            }
        });

        await data.forEach(e => {
            e.yourId
          console.log(e.yourId);
          getOne(e.yourId).then(
              new_data=>{
                  fid.push(new_data);
              })
            return 0; });
        
        await res.render("friendlist", { FFFF : fid });

        // 후보 2 
        // let allfriend = await getAllfriend(req.session.idx);
        // console.log(allfriend);
        // res.render("friendlist", { FFFF : allfriend });

        //후보 3
        // getAllfriend(req.session.idx).then(
        //     e => {
        //         res.render("friendlist", { FFFF : e });
        //     }
        // )
        fid = [];


    }catch(err){
        console.log(err);
    }

}
    
