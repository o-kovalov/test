var superagent = require('superagent');
var agent = superagent.agent();
var theAccount = {
  "email": "testapp367@gmail.com",
  "password": "367testapp"
};

exports.login = function (request, done) {
  request
    .post('/login')
    .send(theAccount)
    .end(function (err, res) {
      if (err) {
        throw err;
      }
      agent.saveCookies(res);
      done(agent);
    });
}