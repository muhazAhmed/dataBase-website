// const cloudModel = require ("../models/cloudModel")
const aws = require("aws-sdk");
// const fs = require ("fs")

// =================================>   aws-sdk   <=====================

aws.config.update({
  accessKeyId: process.env.AWS_API_KEY,
  secretAccessKey: process.env.AWS_API_SECRET,
  region: process.env.AWS_REGION_NAME,
});
//     const s3 = new aws.S3();
//     var params = {
//       ACL: 'public-read',
//       Bucket: "imagetourl",
//       ContentType : "image/JPG",
//       Body: fs.createReadStream(req.file.path),
//       Key: `userAvatar/${req.file.originalname}`
//     };

//     s3.upload(params, (err, data) => {
//       if (err) {
//         console.log('Error occured while trying to upload to S3 bucket', err);
//       }

//       if (data) {
//         fs.unlinkSync(req.file.path); // Empty temp folder
//         const locationUrl = data.Location;
//         let newUser = new cloudModel({ ...req.body, avatar: locationUrl });
//         newUser
//           .save()
//           .then(Image => {
//             res.json({ message: 'Image uploaded successfully', Image });
//           })
//           .catch(err => {
//             console.log('Error occured while trying to save to DB');
//           });
//       }
//     });
// }

let uploadFile = async (file) => {
  return new Promise(function (resolve, reject) {
    // this function will upload file to aws and return the link
    let s3 = new aws.S3({ apiVersion: "2006-03-01" }); // we will be using the s3 service of aws

    var uploadParams = {
      ACL: "public-read",
      Bucket: "imagetourl", //HERE
      Key: "abc/" + file.originalname, //HERE
      Body: file.buffer,
    };

    s3.upload(uploadParams, function (err, data) {
      if (err) {
        return reject({ error: err });
      }
      return resolve(data.Location);
    });
  });
};

module.exports = { uploadFile };
