import { Projects } from "../models/Projects.js";

export const PostProject = async (req, res) => {
  try {
    const { _id } = req.user_name;
    const { title, githubProject , Skills} = req.body;
    const data = await Projects.create({
      title,
      githubProject,
      freelancer_id: _id,
      Skills
    });

    res.status(200).json({ sucess: true, message: "Project Posted" });
  } catch (error) {
    res.status(500).json({ sucess: false, message: "Server Error", error });
  }
};

export const all_projects_of_freelancer = async (req, res) => {
  try {
    const { _id } = req.user_name;
    const projects = await Projects.find({ freelancer_id: _id });
    return res
      .status(200)
      .json({ sucess: true, message: "Projects Of freelancer ", projects });
  } catch (error) {
    res
      .status(500)
      .json({ sucess: false, message: "Server Error", error: error });
    console.log(error);
  }
};

export const all_projects_of_freelancerbyid= async(req,res)=>{
  try {
    const id = req.params['id'];
    const projects = await Projects.find({freelancer_id:id});
    return res
    .status(200)
    .json({ sucess: true, message: "Projects Of freelancers by id ", projects });
} catch (error) {
  res
    .status(500)
    .json({ sucess: false, message: "Server Error", error: error });
  console.log(error);
}
}

export const deleteProject = async(req,res)=>{
  try {
    const id = req.params['id'];
    await Projects.deleteOne({_id:id});
    return res.status(200).json({sucess:true , message:"Project Deleted Successfully" })
  } catch (error) {
    res
    .status(500)
    .json({ sucess: false, message: "Server Error", error: error });
  console.log(error);
  }
}