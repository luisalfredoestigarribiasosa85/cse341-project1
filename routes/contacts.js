const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');
const validation = require('../middleware/validate');

router.get('/contacts', contactsController.getAll);
router.get('/contacts/:id', contactsController.getSingle);
router.post('/contacts', validation.saveContact, contactsController.createContact);
router.put('/contacts/:id', validation.saveContact, contactsController.updateContact);
router.delete('/contacts/:id', contactsController.deleteContact);
module.exports = router;