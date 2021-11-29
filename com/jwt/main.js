exports = module.exports = function() {
  var jose = require('jose');
  
  return {
    
    sign: function(claims, key, cb) {
      return new jose.SignJWT(claims)
        .setProtectedHeader({ alg: 'RS256' })
        .sign(key)
        .then(function(jwt) {
          return cb(null, jwt);
        })
        .catch(function(error) {
          return cb(error);
        });
    },
    
    verify: function(token, key, cb) {
      return jose.jwtVerify(token, key)
        .then(function(jwt) {
          return cb(null, jwt.payload);
        })
        .catch(function(error) {
          return cb(error);
        });
    }
    
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/jose/jwt';
exports['@singleton'] = true;
exports['@require'] = [];
