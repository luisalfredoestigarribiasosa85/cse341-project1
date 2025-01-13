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


const getSingle = async (req, res, next) => {
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
            .find({ _id: objectId });

        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        res.setHeader('Content-type', 'application/json');
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch contact' });
    }
};

module.exports = {
    getAll,
    getSingle
};
