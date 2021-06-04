const express = require('express')
const {body} = require('express-validator/check')
const User = require('../model/userModel')
const authController = require('../controller/authController')

const router = express.Router();

router.post('/signup',authController.signup);
router.get('/login/:usuario', authController.login);

module.exports= router;
