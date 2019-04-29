const express = require('express');
const controller = require('./cart.controller');
const resource = '/cart';
const router = express.Router();

router.route(resource + "/:id")
    .get(controller.getAll)
    .patch(controller.deleteAll)
    // .post(controller.pay)

router.route(resource + "/:id/:item")
    .patch(controller.addItem)

router.route(resource + "/del/:id/:item")
    .patch(controller.deleteItem)

module.exports = router;
