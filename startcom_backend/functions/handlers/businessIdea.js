const admin = require('firebase-admin');
const db = admin.firestore();

//get all business ideas
exports.getAllBusinessIdeas = (req,res)=>{
    const businessIdeas = []
    return db.collection('BusinessIdea').get()
        .then((query)=>{
            query.forEach(doc => {
                var idea = doc.data();
                idea.id = doc.id;
                businessIdeas.push(idea);
            })
            return res.json(businessIdeas)
        })
        .catch((error)=>{
            console.log(error);
            return res.json(error)
        })
}

//get business idea by id
exports.getBusinessIdeaById = (req,res) =>{
    return db.collection('BusinessIdea').doc(req.params.id).get()
        .then((doc)=>{
            if(doc!==null){
                var idea = doc.data();
                idea.id = doc.id;
                return res.json(idea);
            }
            return res.json({error: "Business Idea does not exist."});
        })
        .catch((error)=>{
            console.log(error);
            return res.json(error);
        })
}

//post business idea
exports.postBusinessIdea = (req,res)=>{
    var businessIdea = req.body
    return db.collection('BusinessIdea').add(businessIdea)
        .then((doc)=>{
            businessIdea.id = doc.id;
            return res.json(businessIdea);
        })
        .catch((error)=>{
            console.log(error);
            return res.json(error);
        })
}

//edit business idea
exports.editBusinessIdea = (req,res)=>{
    return db.collection('BusinessIdea').doc(req.params.id).update(req.body)
        .then(()=>{
            return res.json(req.body);
        })
        .catch((error)=>{
            console.log(error)
            return res.json(error)
        })
}

//delete business idea
exports.deleteBusinessIdea = (req,res)=>{
    return db.collection('BusinessIdea').doc(req.params.id).delete()
        .then(()=>{
            return res.json({message:'successfully deleted'});
        })
        .catch((error)=>{
            console.log(error);
            return res.json(error)
        })
}