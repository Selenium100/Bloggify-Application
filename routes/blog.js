const { Router } = require("express");
const router = Router();
const multer = require('multer')
const Blog = require('../models/blog')
const path = require('path')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./uploads/`))
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
    console.log(req.file);
    const blog = await Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImageURL: `uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${blog._id}`)
})

module.exports = router;