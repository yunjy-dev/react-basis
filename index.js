const express = require('express')
const app = express()
const port = 5000
const key = require("./configs/key");
const {UserModel} = require("./models/UserModel");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended:true
}));

//applicaion.json
app.use(bodyParser.json());

app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(
    key.mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true,
        useFindAndModify:false
    }
).then(()=> console.log('DB connected...'))
.catch(err=>console.log(err));


app.get('/', (req, res) => {
  res.send('Hello World!!')
})

app.post('/register', (req, res)=>{
    const user = new UserModel(req.body);
    user.save(
        (err, userInfo)=>{
            if(err) return res.json({success:false, err})
            return res.status(200).json({
                success:true
            })
        }
    )
})




app.post('/login', (req,res) => {
    //1. 요청된 메일을 db에서 조회
    UserModel.findOne({email: req.body.email},(err, userInfo)=>{
        console.log("==== retrive");
        if(!userInfo){
            console.log("==== userInfo not exists");
            return res.json({
                loginSuccess:false,
                message : "No email found"
            })
        }
        console.log("==== userInfo exists");
        //callback으로 반환받은 userInfo 로 2,3단계 진행

        //2. 비밀번호가 존재한다면 맞는지 확인
        userInfo.comparePassword(req.body.password, (err, isMatched)=>{
            console.log("==== comparePassword");
            if(!isMatched){//비밀번호 틀림
                console.log("==== is not matched");
                return res.json({
                    loginSuccess:false, 
                    message: "wrong password"
                });
            }
            console.log("==== is matched");
            //3. 비밀번호까지 맞으면 토큰 생성
            userInfo.generateToken((err, user)=>{
                if(err) return res.status(400).send(err);
                //token을 저장, cookie, localStorage
                res.cookie("x_auth", user.token)
                .status(200)
                .json({
                    loginSuccess:true,
                    userId: user._id
                })
            })//3.UserModel.genToken
        })//2.UserModel.comparePassword
    })//1.UserModel.findOne
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})