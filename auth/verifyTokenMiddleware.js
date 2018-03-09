var jsonwebtoken = require('jsonwebtoken');
var secretkeys = require('../secret.keys');

var verifyToken = function (request, response, next) {
  console.log('headers in verifyToken: ',request.headers);
  var tokenEncoded = request.headers['auth-access-token'];
  if (!tokenEncoded)
    return response.status(403).send({
      auth: false,
      token: null,
      message: 'no has enviado el token a travez de los headers'
    });
  jsonwebtoken.verify(tokenEncoded, secretkeys.token,
    function (err, tokenDecoded) {
      if (err)
        return response.status(500).send({
          auth: false,
          token: null,
          message: 'failed to authenticate, expired token, invalid token'
        });
      request.params.userid = tokenDecoded.userid;
      request.params.type = tokenDecoded.type;
      next();
    });
};
module.exports = verifyToken;
