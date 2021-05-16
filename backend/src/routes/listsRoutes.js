const express = require('express');
const listsController = require('../controller/listsController');

const router = express.Router();

//'lists'
router.put('/newList/:usuario/:nombrePerfil/:nombreLista', listsController.newList);

router.put('/deleteList/:usuario/:nombrePerfil/:nombreLista', listsController.deleteList);

router.put('/updateList/:usuario/:nombrePerfil/:nombreLista', listsController.updateList);

router.put('/addFood/:usuario/:nombrePerfil/:nombreLista', listsController.addFood);

router.put('/deleteFood/:usuario/:nombrePerfil/:nombreLista', listsController.deleteFood);

router.put('/buyFood/:usuario/:nombrePerfil/:nombreLista', listsController.buyFood)