const express = require('express');
const listsController = require('../controller/listsController');

const router = express.Router();

//'lists'
router.put('/newList/:usuario/:nombreLista', listsController.newList);

router.put('/deleteList/:usuario/:nombreLista', listsController.deleteList);

router.put('/updateList/:usuario/:viejoNombreLista', listsController.updateList);

router.put('/addFood/:usuario/:nombreLista', listsController.addFood);

router.put('/deleteFood/:usuario/:nombreLista', listsController.deleteFood);

router.put('/buyFood/:usuario/:nombreLista', listsController.buyFood);

module.exports = router;