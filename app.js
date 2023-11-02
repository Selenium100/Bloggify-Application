require("dotenv").config();
const express = require('express');
const path = require('path')
const userRouter = require('./routes/user')
const blogRouter = require('./routes/blog')
const connectMongodb = require('./connectMongoDB')
const checkForAuthenticationCookie = require('./middlewares/authentication')
const Blog = require('./models/blog')
const cookieParser = require('cookie-parser')
const mongoDbURL = process.env.MONGO_URL //'mongodb://127.0.0.1:27017/blogify'
const PORT = process.env.PORT || 4000
const app = express();

app.set('view engine','ejs')
app.set('views',path.resolve('./views'))


console.log('Mongodb url is ' + mongoDbURL);
connectMongodb.connectMongodb(mongoDbURL);

//middleware to deal with form data
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie.checkForAuthenticationCookie('token'));
app.use('/blog/public', express.static(__dirname + "/blog/public"))

app.get('/',async (req,res)=>{
   const allblogs = await Blog.find({});
   res.render('homepage',{
      user:req.user,
      blogs:allblogs
   })
})

app.use('/user',userRouter)
app.use('/blog', blogRouter)

app.listen(PORT, () => console.log(`Server is up and running on localhost:${PORT}`))


