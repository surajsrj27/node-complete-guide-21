const express = require('express');
const router = express.Router();
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');

const User = require('../models/user');

router.get('/login', authController.getLogin);

router.post('/login', 
    [
        body('email')
            .isEmail()
            .withMessage('Please enter correct email address.')
            .normalizeEmail(),
        body('password')
            .isLength({ min: 5 })
            .isAlphanumeric()
            .trim()
    ]
    ,authController.postLogin);

router.get('/signup', authController.getSignup);

router.post(
    '/signup', 
    [
        check('email')
        .isEmail()
        .withMessage('Please enter valid Input')
        .custom((value, {req}) => {
            // if(value === 'test@test.com'){
            //     throw new Error('this email address is firbidden');
            // }
            // return true;
            return User.findOne({email: value})
            .then(userDoc => {
                if(userDoc){
                    return Promise.reject(
                        'E-mail exists already, please pick a different one.'
                    );
                }
            })    
        })
        .normalizeEmail(), 
        body(
            'password',
            'Please enter a password with only numbers and text, and at least 5 char'
            )
        .isLength({ min: 5 })
        .isAlphanumeric()
        .trim(),
        body('confirmPassword').custom((value, { req }) => {
            if(value !== req.body.password){
                throw new Error('Passwords have to match');
            }
            return true;
        })
        .trim()
    ],
    authController.postSignup);

router.post('/logout', authController.postLogout);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
