exports = module.exports = function() {
  var jose = require('jose');
  
  return {
    
    sign: function(claims, key, cb) {
      // TODO: allow header params to be passed in
      
      var head = {};
      head.alg = 'RS256';
      if (key.id) { head.kid = key.id; }
      
      return new jose.SignJWT(claims)
        .setProtectedHeader(head)
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
