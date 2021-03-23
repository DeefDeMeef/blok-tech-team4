const express = require(`express`);
const router = express.Router();
const filterController = require(`../controllers/filterController`);

router.get('/applyFilter', (req, res) => {res.render(`filterSports`)});

router.post('/applyFilter', filterController.applyFilter);

module.exports = router;
