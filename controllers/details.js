import { link } from "fs";
import { UserDetail } from "../models/UserDetails.js";
import getDataUri from "../util/dataUrl.js";
import cloudinary from "cloudinary";

export const save_Details = async (req, res) => {
  try {
    // console.log(req.body);
    const { _id } = req.user_name;
    const { mobile, address, github, linkedin, bio, } = req.body;


    const file = req.file;
    let mycloud;
    // console.log(file)
    if(!file){
      console.log("file is not uploaded ...");
    }else{
      const fileUri = getDataUri(file);

      mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      console.log(mycloud);
      console.log("file is here");
    }
    // console.log("File: ", file);
    
    const details = await UserDetail.findOne({ user_id: _id });
    // console.log(details);
    
    if (details) {
      const profile1 = details.profile
      const object = {
        mobile_no: mobile || details.mobile_no ,
        address: address || details.address,
        githubLink: github || details.githubLink ,
        linkedinLink: linkedin || details.linkedinLink ,
        bio: bio || details.bio ,
        profile: {
          public_id: mycloud?.public_id || profile1.public_id,
          url: mycloud?.secure_url || profile1.url,
        },
      };
      await details.updateOne(object);

      return res
        .status(200)
        .json({ sucess: true, message: "Details Updated Successfully" });
    }

    await UserDetail.create({
      mobile_no: mobile,
      address,
      githubLink: github,
      linkedinLink: linkedin,
      bio,
      user_id: _id,
      // add attribute here
      profile: {
        public_id: mycloud ? mycloud.public_id : '' ,
        url: mycloud ? mycloud.secure_url : '',
      },
    });

    res
      .status(200)
      .json({ sucess: true, message: "Details Saved Successfully" });
  } catch (error) {
    res.status(500).json({ sucess: false, message: "Server Error", error });
    console.log(error);
  }
};

export const getDetails = async (req, res) => {
  try {
    const { _id } = req.user_name;
    const details = await UserDetail.find({ user_id: _id });
    return res
      .status(200)
      .json({ sucess: true, message: "Details Found", details });
  } catch (error) {
    res.status(500).json({ sucess: false, message: "Server Error", error });
    console.log(error);
  }
};

export const getDetailsbyid = async (req, res) => {
  try {
    const id = req.params["id"];
    const details = await UserDetail.find({ user_id: id });
    return res
      .status(200)
      .json({ sucess: true, message: "Details Found", details });
  } catch (error) {
    res.status(500).json({ sucess: false, message: "Server Error", error });
    console.log(error);
  }
};
