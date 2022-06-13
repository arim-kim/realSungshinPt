const model=require("../models/index"),
    Member=model.member,
    Op=model.Sequelize.Op,
    Friend=model.friends;
    var fid =new Array(); //멤버 다담은 배열
    var FID= new Array();   //멤버 아이디 순으로 정렬한 배열



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

        res.render("deleteError");

    }
}



exports.getAllfriends = async (req, res, next) => {

    try{
        data = await Friend.findAll({ //내 id와 연결된 친구들을 data구조체에 담습니다.
            where: {
                myId: req.session.idx
            }
        });

        await data.forEach(e => {  //그냥 render해버리면 memberId가 view에 뜸으로, forEach문으로 구조체의 각 인덱스를 getOne함수로 돌립니다.
          console.log(e.yourId);
          getOne(e.yourId).then( //getOne함수로 name을 각 얻어 fid배열에 넣어줍니다.
              new_data=>{
                  fid.push(new_data);//그냥 fid를 render해도 되지만, 새로고침시 순서가 매번 바껴서 뜹니다
            })

            return 0; 
        });

        FID= fid.sort(function(a,b){
             return a.memberId-b.memberId //순서가 바뀌는 것을 막기위해 sort로 정렬후 FID배열에 넣어줌
           });

        await res.render("friendlist", { FFFF : FID});
        fid = []; //fid배열에 다시 담을수 있도록 비워줍니다.
        

    }catch(err){
        console.log(err);
        res.render("deleteError");
    }

}
    

exports.deleteFriendClear = async (req, res) => { //친구를 삭제합니다

    try {
        await Friend.destroy({
            where : { 
                
                [Op.or] : [
                {myid : req.session.idx,  
                    yourid : req.body.friendId   },
                {yourid : req.session.idx,  myid :req.body.friendId }, //쌍으로 연결되었으니 쌍으로 삭제합니다.
            ]
        }});
        res.render("deleteFclear");
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
}

exports.deleteFriend = async (req, res) => {
    try{
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
        
        await res.render("deleteFriend", { data : fid });

        
        fid = [];


    }catch(err){
        console.log(err);
        res.render("deleteError");



    }
}