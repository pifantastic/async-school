var dns = require('dns')

exports.index = function (req, res) {
  res.render('index', { title: 'Async School' });
};

exports.lookup = function (req, res) {
  dns.lookup(req.params.name, function (err, address) {
    res.json({
      error : err || false,
      address : address || []
    })
  })
}
