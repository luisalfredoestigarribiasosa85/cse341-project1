const router = require('express').Router();

//router.get('/', (req, res) => { res.send('Hello World!') });
router.get('/contacts', require('./contacts'));

module.exports = router;