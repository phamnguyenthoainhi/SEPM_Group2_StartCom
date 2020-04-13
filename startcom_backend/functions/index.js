const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const app = require('express')();
const cors = require('cors');
app.use(cors())

const {
    getAllBusinessIdeas,getBusinessIdeaById,
    postBusinessIdea,editBusinessIdea,deleteBusinessIdea
} = require('./handlers/businessIdea')

const {signUp,signIn} = require('./handlers/user')

app.get("/get_all_business_ideas",getAllBusinessIdeas);
app.get("/get_business_idea/:id",getBusinessIdeaById);
app.post("/post_business_idea",postBusinessIdea);
app.put("/edit_business_idea/:id",editBusinessIdea);
app.delete("/delete_business_idea/:id",deleteBusinessIdea);

app.post("/signup",signUp);
app.post("/signin",signIn);

exports.api = functions.region('asia-east2').https.onRequest(app);
