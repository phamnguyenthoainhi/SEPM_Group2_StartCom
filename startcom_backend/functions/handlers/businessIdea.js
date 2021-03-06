const admin = require('firebase-admin');
const db = admin.firestore();
const { uploadImage, uploadMultipleImages } = require('./utilities')

//get all business ideas
exports.getAllBusinessIdeas = (req, res) => {
    const businessIdeas = []
    return db.collection('BusinessIdea').get()
        .then((query) => {
            query.forEach(doc => {
                var idea = doc.data();
                idea.id = doc.id;
                businessIdeas.push(idea);
            })
            return res.json(businessIdeas)
        })
        .catch((error) => {
            console.log(error);
            return res.json(error)
        })
}

//get business idea by id
exports.getBusinessIdeaById = (req, res) => {
    return db.collection('BusinessIdea').doc(req.params.id).get()
        .then((doc) => {
            if (doc !== null) {
                var idea = doc.data();
                idea.id = doc.id;
                return res.json(idea);
            }
            return res.json({ error: "Business Idea does not exist." });
        })
        .catch((error) => {
            console.log(error);
            return res.json(error);
        })
}

exports.getBusinessIdeaByOwnerId = (req,res)=>{
    return db.collection('BusinessIdea').where('ownerId','==',req.params.id).get()
        .then((query)=>{
            if(!query.empty){
                const idea = query.docs[0].data()
                idea.id = query.docs[0].id

                return res.json(idea)
            }
            return res.json({error: 'This user has not registered any business idea.'})
        })
        .catch((error)=>{
            console.log(error)
            return res.json(error)
        })
}

//post business idea
exports.postBusinessIdea = async (req, res) => {
    var businessIdea = req.body
    if (businessIdea.image) {
        try {
            const imageUpload = await uploadImage(businessIdea.image, businessIdea.name)
            businessIdea.image = imageUpload
            return db.collection('BusinessIdea').add(businessIdea)
                .then((doc) => {
                    businessIdea.id = doc.id
                    return res.json(businessIdea)
                })
                .catch(error => {
                    console.log(error)
                    return res.json(error)
                })
        }
        catch (error) {
            console.log(error)
            return res.json(error)
        }

    }
    else {
        return db.collection('BusinessIdea').add(businessIdea)
            .then((doc) => {
                businessIdea.id = doc.id;
                return res.json(businessIdea);
            })
            .catch((error) => {
                console.log(error);
                return res.json(error);
            })
    }

}

//edit business idea
exports.editBusinessIdea = async (req, res) => {
    var businessIdea = req.body
    if (businessIdea.image && !businessIdea.image.includes("https://storage.googleapis.com/startcom-sepm.appspot.com/images/")) {
        try {
            const imageUpdate = await uploadImage(businessIdea.image, req.params.id)
            businessIdea.image = imageUpdate
            return db.collection('BusinessIdea').doc(req.params.id).update(req.body)
                .then(() => {
                    businessIdea.id = req.params.id
                    return res.json(businessIdea)
                })
                .catch(error => {
                    console.log(error)
                    return res.json(error)
                })
        }
        catch (error) {
            console.log(error)
            return res.json(error)
        }

    }
    else {
        try{
            const update = await db.collection('BusinessIdea').doc(req.params.id).update(businessIdea)
            return db.collection('BusinessIdea').doc(req.params.id).get()
            .then((doc) => {
                const idea = doc.data()
                idea.id = req.params.id
                return res.json(idea);
            })
            .catch((error) => {
                console.log(error)
                return res.json(error)
            })
        }
        catch(error){
            console.log(error)
            return res.json(error)
        }
    }
}

//delete business idea
exports.deleteBusinessIdea = (req, res) => {
    return db.collection('BusinessIdea').doc(req.params.id).delete()
        .then(() => {
            return res.json({ message: 'successfully deleted' });
        })
        .catch((error) => {
            console.log(error);
            return res.json(error)
        })
}

exports.testUploadMultipleImages = (req,res)=>{
    return uploadMultipleImages(req.body.list, req.body.name)
        .then((urlList)=>{
            return res.json(urlList)
        })
        .catch(error=>{
            console.log(error)
            return res.json(error)
        })
}

exports.uploadImageUser = async (req,res) =>{
    return uploadImage(req.body.image, req.body.id)
        .then((imageUrl)=>{
            return res.json({url:imageUrl})
        })
        .catch(error=>{
            console.log(error)
        })
}
