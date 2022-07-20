//Contact with database
const slugify = require("slugify")
const Blogs = require("../models/blogs.js")
const { v4: uuidv4 } = require('uuid')
//Save data
exports.create = (req,res) =>{
    const {title, content, author} = req.body
    let slug = slugify(title)

    //ถ้าชื่อบทความเป็นภาษาไทยทั้งหมด slug จะเป็นค่าว่างจึงใช้ uuid เข้ามาช่วยสร้างชื่อ slug
    if(!slug)slug = uuidv4()
    

    //ป้องกันการป้อนค่าว่าในเนื้อหา
    switch(true){
        case !content && !title:
            return res.status(400).json({error:"กรุณาป้อนชื่อและเนื้อหาบทความ"})
            break;   
        case !title: 
            return res.status(400).json({error:"กรุณาป้อนชื่อบทความ"})
            break;
        case !content:
            return res.status(400).json({error:"กรุณาป้อนเนื้อหาบทความ"})
            break;

    }
    //บันทึกข้อมูลไปยัง MongoDB
    Blogs.create({title, content, author, slug},(err,blog)=>{
        if(err){
            res.status(400).json({error:"มีชื่อบทความซ้ำกัน"})
        } else{
            res.json(blog)
        }
    })
}

//ดึงข้อมูลทุกบทความ
exports.getAllBlogs = (req,res) =>{
    Blogs.find({}).exec((err,article)=>{
        res.json(article)
    }) 
}

//ดึงบทความที่สนใจ 
exports.singleBlog = (req,res) =>{
    const {slug} = req.params
    Blogs.findOne({slug}).exec((err,article)=>{
        res.json(article)
    })
}

//การลบบทความ
exports.remove = (req,res) =>{
    const {slug} = req.params
    Blogs.findOneAndRemove({slug}).exec((err,article)=>{
        if(err) console.log(err)
        res.json({message:"ลบบทความเรียบร้อย"})
    })
}

exports.update = (req,res) =>{
    const {slug} = req.params
    const {title, content, author} = req.body

    let newSlug = slugify(title)

    if(!newSlug)newSlug = uuidv4()

    switch(true){
        
        case !content && !title:
            return res.status(400).json({error:"กรุณาป้อนชื่อและเนื้อหาบทความ"})
            break;   
        case !title: 
            return res.status(400).json({error:"กรุณาป้อนชื่อบทความ"})
            break;
        case !content:
            return res.status(400).json({error:"กรุณาป้อนเนื้อหาบทความ"})
            break;

    }

    Blogs.findOneAndUpdate({slug},{title, content, author, slug:newSlug},{new:true}).exec((err,article)=>{
        if(err){
            res.status(400).json({error:"มีชื่อบทความซ้ำกัน"})
        } else{
            res.json(article)
        }
    })
}

