import express from 'express';
import bodyParser from 'body-parser';
import {innitialize} from './src/config/dbConfig';
import bcrypt from 'bcrypt';
import User from './src/models/UserModels';

let app = express();
const port = 2020;
const dbName = "example";
const collectName = "users";

//enable post data from request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

innitialize(dbName, collectName, (dbCollection) => {
    // register user
    app.post('/user',async (req, res, next) => {    
        await dbCollection.findOne({email: req.body.email}, async (err, user) => {
            if(user == null){ //Kiểm tra xem email đã được sử dụng chưa
                 bcrypt.hash(req.body.password, 10, (err,hash) => { //Mã hóa mật khẩu trước khi lưu vào db
                    if (err) {
                        return next(err);
                    }
                    const user = new User(req.body)
                    user.password = hash;
                    dbCollection.insertOne({"email": user.email, "password": user.password})
                });
            }else{
                res.json({err: 'Email has been used'})
            }
        });
    });
    // login user
    app.post("/login",async (req, res, next) => {
         let user = await dbCollection.findOne({email: req.body.email});
            if (!user){
                return res.json({err: 'Username are incorrect'})
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(result === true){
                    // req.session.user = user
                    res.json({
                        user: user,
                        "login": "success"
                    })
                }else{
                    return res.json({err: 'Password are incorrect'})
                }
            })
        })
    //count user
    app.get ('/user',async (req, res) => {
        let numberUser = await dbCollection.find().toArray();
        res.json(numberUser);
    });


}, (err) => {
    throw (err);
})

app.listen(port, () => {
    console.log(`server listening at ${port}`);
});
