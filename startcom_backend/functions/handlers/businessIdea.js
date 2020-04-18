const admin = require('firebase-admin');
const db = admin.firestore();
const { uploadImage } = require('./utilities')

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

//post business idea
exports.postBusinessIdea = (req, res) => {
    var businessIdea = req.body
    if (businessIdea.image) {
        const imageUpload = uploadImage(businessIdea.image, businessIdea.name)
        const ideaUpload = imageUpload.then((url) => {
            businessIdea.image = url
            return db.collection('BusinessIdea').add(businessIdea)
                .then((doc) => {
                    businessIdea.id = doc.id
                    return businessIdea
                })
                .catch(error => {
                    console.log(error)
                    return error
                })
        })
        return Promise.all([imageUpload, ideaUpload])
            .then(results => {
                return res.json(results[1])
            })
            .catch(error => {
                console.log(error)
                return res.json(error)
            })

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
exports.editBusinessIdea = (req, res) => {
    var businessIdea = req.body
    if (businessIdea.image && !businessIdea.image.includes("https://storage.googleapis.com/startcom-sepm.appspot.com/images/")) {
        const imageUpdate = uploadImage(businessIdea.image, businessIdea.name)
        const ideaUpdate = imageUpdate.then((url) => {
            businessIdea.image = url
            return db.collection('BusinessIdea').doc(req.params.id).update(req.body)
                .then(() => {
                    businessIdea.id = req.params.id
                    return businessIdea
                })
                .catch(error => {
                    console.log(error)
                    return error
                })
        })
        return Promise.all([imageUpdate, ideaUpdate])
            .then(results => {
                return res.json(results[1])
            })
            .catch(error => {
                console.log(error)
                return res.json(error)
            })
    }
    else {
        return db.collection('BusinessIdea').doc(req.params.id).update(businessIdea)
            .then(() => {
                businessIdea.id = req.params.id
                return res.json(businessIdea);
            })
            .catch((error) => {
                console.log(error)
                return res.json(error)
            })
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