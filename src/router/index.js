const router = require('express').Router()
const login = require('../controller/login/index')
const search = require('../controller/search');

router.use('/', (req,res,next)=>{
    console.log(req.method + ':' + req.url);
    next()
})


router.use('/login', login);
router.use('/search', search);

module.exports = router