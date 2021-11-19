exports = module.exports = function() {
  var jose = require('jose');
  
  return {
    
    sign: function(claims, cb) {
      console.log('SIGN THE JWT');
      console.log(claims)
      
      jose.generateKeyPair('RS256')
        .then(function(o) {
          console.log(o);
          console.log(o.privateKey)
          console.log(o.publicKey)
          
          return new jose.SignJWT(claims)
            .setProtectedHeader({ alg: 'RS256' })
            //.setIssuedAt()
            //.setIssuer('urn:example:issuer')
            //.setAudience('urn:example:audience')
            //.setExpirationTime('2h')
            .sign(o.privateKey)
          
          //return cb(null, 'jwt');
        })
        .then(function(jwt) {
          console.log(jwt)
          
          return cb(null, jwt);
        })
        .catch(function(error) {
          console.log(error);
          
          return cb(error);
        })
      
      
    }
    
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/jose/jwt';
exports['@singleton'] = true;
exports['@require'] = [];
