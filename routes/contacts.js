const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

router.get('/contacts', contactsController.getAll);
router.get('/contacts/:id', contactsController.getSingle);
router.post('/contacts', contactsController.createContact);
router.put('/contacts/:id', contactsController.updateContact);
router.delete('/contacts/:id', contactsController.deleteContact);
module.exports = router;