const express = require('express');
const controller = require('./reviews.controller');
const resource = '/reviews';
const router = express.Router();

router.route(resource + "/products/:id")
    .get(controller.getAll)

router.route(resource + "/users/:id")
    .get(controller.getAll)

router.route(resource + '/:id')
    .patch(controller.update)
    // .delete(controller.remove);

router.route(resource)
    .post(controller.create)


module.exports = router;
