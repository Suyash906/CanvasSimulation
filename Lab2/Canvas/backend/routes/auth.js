var jwt = require('jsonwebtoken');
var config = require('../config/application');
function verifyToken(req, res, next) {
  console.log(req.headers);
  var token = req.headers['authorization'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, config.secretKey, function(err, decoded) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // if everything good, save to request for use in other routes
    //next();
  });
}
module.exports = verifyToken;