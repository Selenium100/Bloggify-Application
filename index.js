const express = require('express');
const path = require('path')
const userRouter = require('./routes/user')
const connectMongodb = require('./connectMongoDB')
const mongoDbURL = 'mongodb://127.0.0.1:27017/blogify'
const PORT = 4000
const app = express();

app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

//middleware to deal with form data
app.use(express.urlencoded({extended:false}))

connectMongodb.connectMongodb(mongoDbURL);

app.get('/',(req,res)=>{
   res.render('homepage')
})

app.use('/user',userRouter)

app.listen(PORT, () => console.log(`Server is up and running on localhost:${PORT}`))

