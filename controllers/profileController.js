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
            console.log(profilePost);
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

module.exports = {
    showProfilePage
}