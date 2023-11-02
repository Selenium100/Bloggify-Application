const { Router } = require("express");
const router = Router();
const multer = require('multer')
const Blog = require('../models/blog')
const Commment = require('../models/comment')
const path = require('path')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./blog/public/uploads/`))
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null,fileName)
    }
  })

  const upload = multer({ storage: storage })

router.get("/add-new", (req,res) =>{
    return res.render("addBlog" , {
        user:req.user
    })
})


router.post('/', upload.single('coverImage'), async (req,res)=>{
    const {title,body} = req.body;
    console.log(req.body);
    console.log(`file name is ${req.file.filename}`);
    const blog = await Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImageURL: `/blog/public/uploads/${req.file.filename}`
    })
    return res.redirect(`blog/${blog._id}`)
})

router.post('/comment/:blogId' , async (req,res)=>{
  await Commment.create({
  content: req.body.content,
  blogId: req.params.blogId
})
return res.redirect('/blog/')
})

router.get('/:id', async (req,res)=>{
  const blogg = await Blog.findById(req.params.id);
  console.log(`blog is ${blogg}`);
  console.log(blogg);
  console.log(blogg.coverImageURL);

  return res.render('blog',{
    blogg,
    user:req.user
  })
})

module.exports = router;