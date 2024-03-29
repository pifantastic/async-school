
var express = require('express')
var routes = require('./routes')
var http = require('http')
var path = require('path')

require('jade').filters.code = function (block) {
  return block
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/#/g, '&#35;')
    .replace(/\\/g, '\\\\')
    //.replace(/\n/g, '\\n');
}

var app = express()

app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.bodyParser())
app.use(express.methodOverride())
app.use(app.router)
app.use(express.static(path.join(__dirname, 'public')))

if (app.get('env') == 'development') {
  app.use(express.errorHandler())
}

app.get('/', routes.index)
app.get('/lookup/:name', routes.lookup)

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
});
