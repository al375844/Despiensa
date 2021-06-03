const express = require('express');
const listsController = require('../controller/listsController');

const router = express.Router();

//'lists'
router.put('/newList/:usuario/:nombreLista', listsController.newList);

router.put('/deleteList/:usuario', listsController.deleteList);

router.put('/updateList/:usuario', listsController.updateList);

router.put('/addFood/:usuario', listsController.addFood);

router.put('/deleteFood/:usuario/', listsController.deleteFood);

router.put('/buyFood/:usuario/:nombreLista', listsController.buyFood);

module.exports = router;
