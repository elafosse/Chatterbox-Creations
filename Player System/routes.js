const express = require('express');
const client = require('./client');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Index Page
router.get('/', (req, res) => {
    res.render('pages/index');
});

router.post('/', (req, res) => {
    console.log(req.body)
    client(req.body)
    res.render('pages/index');
});

module.exports = router;