const express = require('express')
const app = express()
const port = 5000
const key = require("./configs/key");
const {UserModel} = require("./models/UserModel");
const bodyParser = require("body-parser");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended:true
}));

//applicaion.json
app.use(bodyParser.json());

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})