const express = require(`express`);
const router = express.Router();
const filterController = require(`../controllers/filterController`);
const likeController = require(`../controllers/likeController`);

router.get('/filter', (req, res) => {res.render(`filterSports`, {matches: []})});

router.post('/applyFilter', filterController.applyFilter);

router.post('/like', likeController.applyLike);

module.exports = router;