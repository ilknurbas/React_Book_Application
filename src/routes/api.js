const express = require('express');
const router = express.Router();
const BookDb = require('../models/bookDb');

router.get('/', (req, res) => {
    BookDb.find({})
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.get("/:bookId", async (req, res) => {
    try {
        if (await BookDb.findById(req.params.bookId)) {
            res.status(200).json(await BookDb.findById(req.params.bookId));
        } else {
            res.status(404).json({
                message: "There is no such valid book with given bookId."
            });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
});


router.post('/save', (req, res) => {
    console.log('Saving...'+ req.body);
    const newBookDb = new BookDb(req.body);
    newBookDb.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Internal server errors while saving data' });
            return;
        }
        return res.json({
            msg: 'Congrats, your data have been saved.'+req.body
        });
    });
});


router.delete("/:bookId", async (req, res) => {
    try {
        const deletedBook = await BookDb.remove({ _id: req.params.bookId });
        res.status(200).json(deletedBook);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.put("/:bookId", async (req, res) => {
    try {
        const updatedBook = await BookDb.updateOne(
            { _id: req.params.bookId },
            {
                $set: {
                    title: req.body.title,
                    author:req.body.author,
                    date:req.body.date
                }
            }
        );
        res.status(200).json(updatedBook);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

module.exports = router;