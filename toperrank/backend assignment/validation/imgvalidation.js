const path = require("path")

const validateImage = (data) =>{
    
    const fileName = data.name;
    const extension = path.extname(fileName);

    // const allowedExtensions = /png|jpeg|jpg|gif/;
    const allowedExtensions = /png|jpeg|jpg|gif/;
    
    if (!allowedExtensions.test(extension)){

    // return res.status(406).json({status:406, error:"Unsupported extension!"});
    return "Unsupported extension!";
    }       
};

module.exports = validateImage;
