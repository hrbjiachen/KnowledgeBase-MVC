const userData = require("../models/userData");
const postData = require("../models/postData");
const rm = require("../util/responseMsg");

const showProfilePage = async (req, res) => {

    try {
        const [rows] = await userData.getUserById(req.params.id);
        if (rows.length) {
            const [profilePost] = await postData.getPostsByUserId(req.params.id);
            const profileInfo = { ...rows[0] };
            delete profileInfo["password"];
            userInfo = req.session.info;
            console.log(profileInfo);
            res.render("profile", { userInfo , profileInfo, profilePost, profileCSS: true, postCSS: true });
        } else {
            res.render("error", { error });
        }
      } catch (error) {
        res.render("error", { error });
      }



    // const profileID = req.params.id;
    
    // const [rows] =  await userData.getUserById(profileID);
    
    // console.log(req.session.user);
    // const [profilePost] = await postData.getPostsByUserId(profileID);
    // res.render("profile", { userInfo, profilePost, homeCSS: true, postCSS: true });
};

const editProfilePage = async (req, res) => {

    try {
        const userInfo = req.session.user;
        console.log(userInfo);
        res.render("edit", { userInfo, homeCSS: true, editCSS: true });
      } catch (error) {
        res.render("error", { error });
      }

    // const profileID = req.params.id;
    
    // const [rows] =  await userData.getUserById(profileID);
    
    // console.log(req.session.user);
    // const [profilePost] = await postData.getPostsByUserId(profileID);
    // res.render("profile", { userInfo, profilePost, homeCSS: true, postCSS: true });
};

const editProfileInfo = async (req, res) => {
    try {
        let userInfo = req.session.user;
        const { user_id } = userInfo;
        await userData.updateUserColumn(req.params.col,req.body.col,user_id)
        const [rows] = await userData.getUserById(user_id);
        userInfo = {...rows[0]};
        delete userInfo["password"];
        req.session.user = userInfo;
        res.json({ message: rm.SUCCESS });
    } catch (error) {
        res.render("error", { error: error.stack });
    }
}

const addLike = async (req, res) => {
    try {
        console.log("asdsadasd")
        let [likes] = await userData.getLikes(req.body.id)
        likes = {...likes[0]};
        likes = likes.likes;
        // console.log(likes.likes);
        await userData.updateUserColumn('likes',likes+1,req.body.id)
        res.json({likes:likes+1, message: rm.SUCCESS });
    } catch (error) {
        res.render("error", { error: error.stack });
    }
}

module.exports = {
    showProfilePage,
    editProfilePage,
    editProfileInfo,
    addLike
}