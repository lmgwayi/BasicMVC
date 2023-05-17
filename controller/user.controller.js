const db = require("../models")
const User = db.user


exports.getAll = (req, res)=>{


      User.find()
        .then(data=>{
            res.send(data)
            console.log(data)
        })
        .catch(error=>{
            res.status(500).send("Could not find user", error)
            console.log("Could not find user",error)
        })
}


exports.create = async (req, res)=>{
    if (!req.body){
             res.status(400).send("Cannot add without info")
             return;
        
    }
    let results;

    await fetch('https://randomuser.me/api/')
            .then(res=>res.json())
            .then(data=>{
             console.log(results=data.results[0].email)})

    const user = new User({
        fname : req.body.fname,
        email: results,
        password: req.body.password
    })

    try{
        user.save()
        .then(user=>{

            console.log(user)
            res.send(user)
        })
        return
    }catch (err){
              res.status(500).send('Could not creat new user')
              console.log(`Some err occured : ${err.message}`)
    }
}

exports.deletAll = (req, res)=>{

    User.deleteMany()
        .then(data=>{
            res.send(data)
            console.log(data)
        })
        .catch(error=>{
            res.status(500).send("Could not delete all users",error)
            console.log("Could not delete all", error)
        })
}

exports.deleteOne = (req, res)=>{

    const id = req.params.id

    User.findByIdAndRemove(id, { useFindAndModify: false})
        .then(data => {
            if(!data) {
                res.status(404).send({
                    msg: `Cannot delete User with id=${id}. Maybe it was not exit`
                })
            } else res.status(201).send({msg: "User was deleted successfully."})
        })
        .catch(err => {
            res.status(500).send({msg:`Error deleting User with id=${id}, Error: ${err}`})
        })
}

exports.update = (req, res)=>{
    if(!req.body){
        res.status(400).send("Cannot update user")
        return;
    }
    const id = req.params.id

    User.findByIdAndUpdate(id,req.body, { useFindAndModify: false})
        .then(data => {
            if(!data) {
                res.status(404).send({
                    msg: `Cannot update User with id=${id}. Maybe it was not found`
        
                })
            } else res.status(201).send({ msg: "User was updated successfully."})
        })
        .catch(err => {
            res.status(500).send({ msg: `Error updating User with id=${id}`})
        })
}