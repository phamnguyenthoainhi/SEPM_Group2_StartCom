const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const app = require('express')();
const cors = require('cors');
app.use(cors());

const {
    getAllBusinessIdeas,getBusinessIdeaById,
    postBusinessIdea,editBusinessIdea,deleteBusinessIdea
} = require('./handlers/businessIdea');

const {
    signUp,signIn, getAllInvestors, getAllConsultants,
    editProfile, deleteAccount, validateFirebaseIdToken
} = require('./handlers/user');


app.get("/get_all_business_ideas",getAllBusinessIdeas);
app.get("/get_business_idea/:id",getBusinessIdeaById);
app.post("/post_business_idea",postBusinessIdea);
app.put("/edit_business_idea/:id",editBusinessIdea);
app.delete("/delete_business_idea/:id",deleteBusinessIdea);


app.post("/signup",signUp);
app.post("/signin",signIn);
app.get("/get_all_investors",getAllInvestors);
app.get("/get_all_consultants",getAllConsultants);
app.put("/edit_profile/:id",validateFirebaseIdToken,editProfile);

exports.api = functions.region('asia-east2').https.onRequest(app);
exports.onAccountDeleted = functions.auth.user().onDelete(deleteAccount);
