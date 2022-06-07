exports.getParttimes = async (res, req, err) => {
    models.parttime.create({
        // 여기 내가 수정해놨엉!!
        ptMemberId : req.session.idx,
        parttimeName: req.body.parttimeName,
        weekPay: req.body.weekPay,
        tax: req.body.tax,
        color : req.body.color
    }).then( result => {
        console.log("데이터 추가 완료");
        res.render("clear");
    }).catch( err => {
        console.log(err)
        console.log("데이터 추가 실패");
    })  
};
