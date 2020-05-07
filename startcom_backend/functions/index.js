const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const app = require('express')();
const cors = require('cors');
app.use(cors())

const {
    getAllBusinessIdeas,getBusinessIdeaById, getBusinessIdeaByOwnerId, uploadImageUser,
    postBusinessIdea,editBusinessIdea,deleteBusinessIdea, testUploadMultipleImages
} = require('./handlers/businessIdea')

const {
    signUp,signIn, getAllInvestors, getAllConsultants,
    editProfile, deleteAccount, validateFirebaseIdToken,
    deleteUser, getProfile, sendEmailByUser,
    getUnverifiedInvestors,verifyInvestor, declineInvestor,
    getAllNotifications
} = require('./handlers/user')

app.get("/get_all_business_ideas",getAllBusinessIdeas);
app.get("/get_business_idea/:id",getBusinessIdeaById);
app.get("/get_business_idea_by_owner/:id",getBusinessIdeaByOwnerId);
app.post("/post_business_idea",postBusinessIdea);
app.put("/edit_business_idea/:id",editBusinessIdea);
app.delete("/delete_business_idea/:id",deleteBusinessIdea);
app.post("/test_multiple_images",testUploadMultipleImages)
app.post("/upload_image",uploadImageUser)

app.post("/signup",signUp);
app.post("/signin",signIn);
app.get("/get_all_investors",getAllInvestors);
app.get("/get_all_consultants",getAllConsultants);
app.get("/get_profile/:id",getProfile)
app.put("/edit_profile/:id",validateFirebaseIdToken,editProfile);
app.delete("/delete_user/:id",validateFirebaseIdToken,deleteUser)
app.post("/send_email",sendEmailByUser)
app.get("/get_unverified",getUnverifiedInvestors)
app.get("/verify/:id",verifyInvestor)
app.delete("/decline/:id",declineInvestor)
app.get("/get_notifications/:id",getAllNotifications)

//app.post("/upload_image",uploadImage)
exports.api = functions.region('asia-east2').https.onRequest(app);
exports.onAccountDeleted = functions.auth.user().onDelete(deleteAccount);
