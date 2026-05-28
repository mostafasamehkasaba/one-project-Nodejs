const express = require("express");
const AppError = require('../middlewares/appError')

const router = express.Router();
const multer  = require('multer')

const diskStorage = multer.diskStorage({
    destination: function(req,file,cb,next ){
        console.log("FIle" ,file)
        cb(null,'uploads')
    },
    filename: function(req,file,cb){
        const ext = file.mimetype.split('/')[1];
        const filename = `user-${Date.now()}.${ext}`;
        cb(null,filename)
    }
})

const fileFilter = (req,file,cb) =>{
    const imageType = file.mimetype.split('/')[0]

    if(imageType == 'image'){
        return cb(null ,true)
    }else{

       return cb(new AppError('file must be an image', 400, 'Bad Request'), false);
    }


}

const upload = multer({
    storage :diskStorage,
    fileFilter
})


const userController =require('../controles/users.controles');
const veryfiyToken = require("../middlewares/veryfiytoken");
// get all users

// Register 

// Login

router.get("/",veryfiyToken, userController.getAllusers);
router.post("/register",upload.single('avater'), userController.register);
router.post("/login", userController.login);


module.exports = router;