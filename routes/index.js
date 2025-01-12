const router = require('express').Router();

router.get('/', (req, res) => { res.send('Hello World!') });
router.get('/Luis', (req, res) => { res.send(`<h1>Hello World Luis</h1>`) });

module.exports = router;