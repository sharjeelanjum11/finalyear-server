var express = require('express');

const app = express();
var router = express.Router();

const { verifyOtp } = require('../controllers/usercontroller');
/* GET users listing. */
router.post('/', verifyOtp)





module.exports = router;
