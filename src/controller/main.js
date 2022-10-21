const registerModel = require("../models/registerModel");


const uploadimage = async function (req, res) {
  try {
    let files = req.files;
    let data = req.body;
    
    if (files.length > 0) {
        let validImage = files[0].mimetype.split("/");
        if (validImage[0] != "image") {
            return res
            .status(400)
            .send({ status: false, message: "Please Provide Valid Image.." });
        }
        let uploadedFileURL = await uploadFile(files[0]);
        data.profileImage = uploadedFileURL;
        console.log(uploadedFileURL);
    } else {
      return res.status(400).send({ msg: "No file found" });
    }

    let savedData = await registerModel.create(data);
    res.status(201).send({ status: true, data: savedData });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: "Something went wrong" });
  }
};

module.exports={uploadimage}