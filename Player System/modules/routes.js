const express = require('express');
const Client = require('./client');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Index Page
router.get('/', (req, res) => {
    res.render('pages/index');
});

router.post('/', (req, res) => {
    Client.create_ws(req.body).then((value) => {
        res.render('pages/avatar');
    })
});

// TODO: Complete Webpages
// Avatar Page
// router.get('/avatar', (req, res) => {
//     Client.create_ws(req.body).then((value) => {
//         res.render('pages/avatar');
//     })
// });

// Game Wait Page
router.get('/loading', (req, res) => {
    Client.send_avatar_selection(req.body).then((value) => {
        res.render('pages/loading');
    })
});

// Jeopardy Pages

// Categories Page
router.post('/jeopardy/categories', (req, res) => {
    connect_to_server(req.body).then((value) => {
        // TODO: Render '' Page
        res.render('pages/loading');
    })
});

module.exports = router;