const express = require('express');
const controller = require('./cart.controller');
const resource = '/cart';
const router = express.Router();

router.route(resource + "/:id")
    .get(controller.getAll)

router.route(resource + "/empty/:id")
    .get(controller.deleteAll)

router.route(resource + "/add/:id")
    .patch(controller.addItem)

router.route(resource + "/delete/:id")
    .patch(controller.deleteItem)

router.route(resource + "/charge/:id")
    .post(controller.pay)

module.exports = router;
