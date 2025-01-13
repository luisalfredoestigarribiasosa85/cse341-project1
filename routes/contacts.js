const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

router.get('/contacts', contactsController.getAll);
router.get('/contacts/:id', contactsController.getSingle);

module.exports = router;