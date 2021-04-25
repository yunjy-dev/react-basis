const mongoose = require("mongoose");

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


const UserSchema = mongoose.Schema(
    {
        name:{
            type: String,
            maxlength:50
        },
        email:{
            type:String,
            trim:true,
            unique:1
        },
        id:{
            type:String,
            trim:true,
            unique:1
        },
        password:{
            type:String,
            minlength:5
        },
        lastname:{
            type:String,
            maxlength:50
        },
        role:{
            type:Number,
            default:0
        },
        image:String,
        token:{
            type:String
        },
        tokenExp:{
            type:Number
        }

    }
);

UserSchema.pre('save', function(next){
    // 비밀번호 암호화
    // bcrypt.genSalt(saltRounds, function(err, salt) {
    //     bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
    //         // Store hash in your password DB.
    //     });
    // });

    //localhost:5000/register
    //body/raw/json    
    // {
    //     "name":"name",
    //     "email":"email@email.com",
    //     "id":"id",
    //     "password":"password"
    // }

    let user = this;

    if(user.isModified('password')){

        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);
            
            
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                user.password = hash;
                next();
            });
        });

    } else {
        //비밀번호 변경이 아닌 경우 바로 update
        next()
    }

    
});

const UserModel = mongoose.model('UserModel', UserSchema);
module.exports = {UserModel};