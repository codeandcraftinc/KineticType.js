var express = require('express');
var app = express();

app.use(express.static(__dirname));
app.use('/dist', express.static(__dirname + '/../dist'));

app.listen(process.env.PORT || 3000, function () {
  console.log('server listening at http://localhost:3000/');
});
