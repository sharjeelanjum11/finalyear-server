var express = require('express');

const app = express();
var router = express.Router();

const { Otphandler } = require('../controllers/usercontroller');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.post('/send-verification-code',Otphandler)



module.exports = router;
