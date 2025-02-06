const multer=require('multer');
const fs=require('fs');
const path=require('path');

const uploadsDir=path.join(__dirname,'uploads');
const productsDir=path.join(__dirname,'products');

[uploadsDir,productsDir].forEach((dir)=>{
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir,{recursive:true});
        console.log(dir)
    }
})



const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, uploadsDir);
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix=Date.now()+'-'+Math.round.apply(Math.random()*1e9);
        const ext=path.extname(file.originalname);
        const filename=path.basename(file.originalname,ext);
        cb(null, filename+"-"+uniqueSuffix+".png");
    }
})
const pstorage=multer.diskStorage({
    destination:  (req,file,cb1)=>{
        cb1(null,productsDir);
    },
    filename: (req,file,cb1)=>{
        console.log(req.body)
        const uniqueSuffix=Date.now()+'-'+Math.round.apply(Math.random()*1e9);
        const ext=path.extname(file.originalname,);
        const filename=path.basename(file.originalname,ext);
        cb1(null, filename+"-"+uniqueSuffix+".png");
    }
})



exports.upload=multer({storage:storage})
exports.pupload=multer({storage:pstorage});
