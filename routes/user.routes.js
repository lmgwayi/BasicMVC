module.exports = rs => {
    const router = require("express").Router();
    const controller = require('../controller/user.controller')


     router.post('/signup', controller.create);//add user

     router.get('/', controller.getAll)

     router.delete('/', controller.deletAll);

     router.put('/:id', controller.update)

     router.delete('/:id', controller.deleteOne)

rs.use('/v1/users',router);
}