
//오류 핸들링 함수.
const httpStatus = require("http-status-codes");
exports.logErrors = (error, req, res, next) => { //로그인 에러를 잡아주는 module
console.error(error.stack);
next(error);
};

exports.respondNoResourceFound = (req, res) => { //어긋난 페이지로 들어갔을 떄 생기는 오류,
        let errorCode = httpStatus.NOT_FOUND;
        res.status(errorCode);
        res.send(`${errorCode} | The page does not exist!`);
};

exports.respondInternalError = (error, req, res, next) => { //코드 에러시 나타나는 오류.
        let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
        console.log(`ERROR occurred: ${error.stack}`);
        res.status(errorCode);
        res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};