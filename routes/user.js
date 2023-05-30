var express = require('express');

const app = express();
var router = express.Router();

const { Otphandler } = require('../controllers/usercontroller');
/* GET users listing. */
router.post('/', Otphandler)





module.exports = router;
