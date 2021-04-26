const {UserModel} = require("../models/UserModel");

let auth = (req, res, next)=>{


    //인증처리
    //1쿠키에서 토큰 가져오기
    let token = req.cookies.x_auth;
    //2.토큰 복호화
    UserModel.findByToken(token, (err, userInfo) => {
        if(err) throw err;
        if(!userInfo) return res.json({ isAuth:false, error:true, err});
        
        //index.js에서 req.xx으로 사용할 수 있다.
        req.token = token;
        req.userInfo = userInfo;
        
        //middleware 빠져나가기
        next();

    })
    //3. 유저가 있으면 ok
    
    //4. 유저가 없으면 no

}

module.exports = {auth};