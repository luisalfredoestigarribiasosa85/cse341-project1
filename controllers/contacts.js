const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('contacts').find();
        const contacts = await result.toArray();

        res.setHeader('Content-type', 'application/json');
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }
};


const getSingle = async (req, res) => {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const objectId = new ObjectId(id);
        const contact = await mongodb
            .getDatabase()
            .db()
            .collection('contacts')
            .findOne({ _id: objectId });

        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        res.setHeader('Content-type', 'application/json');
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch contact' });
    }
};

const createContact = async (req, res) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    try {
        const result = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
        if (result.acknowledged) {
            res.status(201).send('Contact created');
        }

    } catch (error) {
        res.status(500).json({ error: 'Failed to create contact' });
    }
};

const updateContact = (req, res) => {
    const id = req.params.id;
    const contactId = new ObjectId(id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const query = { _id: contactId };
    const options = { upsert: true };
    const updateDoc = {
        $set: contact
    };
    try {
        const result = mongodb.getDatabase().db().collection('contacts').updateOne(query, updateDoc, options);
        if (result.modifiedCount > 0) {
            res.status(201).send('Contact Updated');
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update contact' });
    }
};

const deleteContact = (req, res) => {
    const id = req.params.id;
    const contactId = new ObjectId(id);
    const query = { _id: contactId };
    try {
        const result = mongodb.getDatabase().db().collection('contacts').deleteOne(query);
        if (result.deletedCount > 0) {
            res.status(201).send('Contact Deleted');
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete contact' });
    }
}

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};
