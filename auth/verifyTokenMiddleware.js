var jsonwebtoken = require('jsonwebtoken');
var secretkeys = require('../secret.keys');

var verifyToken = function (request, response, next) {
  var tokenEncoded = request.headers['auth-access-token'];
  if (!tokenEncoded)
    return response.status(403).send({
      auth: false,
      token: null
    });
  jsonwebtoken.verify(tokenEncoded, secretkeys.token,
    function (err, tokenDecoded) {
      if (err)
        return response.status(500).send({
          auth: false,
          token: null,
          message: 'failed to authenticate'
        });
      console.log('data tokendecode: ', tokenDecoded);      
    });
};
module.exports = verifyToken;