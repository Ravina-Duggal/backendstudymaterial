const fs = require('fs')
const path = require('path')
const multer = require('multer')
const SECRET = "LIZASECRET"


var imageStorageFun = multer.diskStorage({

    destination: function (req, file, cb) {
        // console.log("req:" + req);
        // console.log("file:" + file);
        var string = file.fieldname.split("_");

        var dir = "server/public/" + string[0]

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {

        var string = file.fieldname.split("_")
        var dir = "server/public/" + string[0]
        var fileName = file.originalname.replace(path.extname(file.originalname), "")
        req.body[string[1]] = fileName + path.extname(file.originalname)
        let filePath = dir + "/" + req.body[string[1]]

        // if (fs.existsSync(filePath)) {
            req.body[string[1]] = fileName + Date.now() + path.extname(file.originalname)
            //logger.error("exists:", path);
        // }
        cb(null, req.body[string[1]]) //Appending extension
    }
})

function unlinkImage(pic) {
    console.log(pic);
    if (pic != undefined && pic != "") {
        fs.unlink( "server/public/"+ pic, (err) => {
            // if(err) console.log(err);
            // else console.log("image Replaced");
         });
    }
}

var uploadImageFun = multer({
    storage: imageStorageFun
});

module.exports = {
    uploadImageFun,
    unlinkImage,
    SECRET
}