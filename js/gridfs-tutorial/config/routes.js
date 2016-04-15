
module.exports = function(app) {

  var upload = require('../controllers/uploadController');

  app.route('/upload/:filename')
    .get(upload.read);

  app.route('/upload')
    .post(upload.create);
};

