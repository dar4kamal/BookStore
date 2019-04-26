const express = require('express');
const controller = require('./products.controller');
const { role } = require('../auth/middlewares');
const resource = '/products';
const router = express.Router();


router.route(resource)
    .get(controller.getAll)
    .post(role("admin"), controller.create);

router.route(resource + '/:id')
    .get(controller.get)
    .put(role("admin"), controller.replace)
    .patch(role("admin"), controller.update)
    .delete(role("admin"), controller.remove);

module.exports =  router;
