var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
<<<<<<< HEAD
  res.render('index', { title: 'Express App is Running Successfuly' });
=======
  res.render('index', { title: 'Express is running' });
>>>>>>> 87a4e866157a75fc689c02903b3c9a2102d0ecca
});

module.exports = router;
