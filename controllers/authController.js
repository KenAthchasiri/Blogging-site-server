const jwt = require('jsonwebtoken')
const expressJWT  = require('express-jwt');

exports.login = (req,res) =>{
    const {username,password} = req.body

    if(password === process.env.PASSWORD){
        const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'1d'})
        return res.json({token,username})
    } else {
        return res.status(400).json({error:'รหัสผ่านไม่ถูกต้อง!'})
    }
    
}

//ตรวจสอบ token เพื่อเรียกใช้งาน api
exports.requireLogin = expressJWT({
    secret: "mern-stack-crud-secret@12345",
    algorithms:['HS256'],
    userProperty: 'auth'
})