const app = require('./app')
// const config = require('config')
var port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log('server listen port 3000')
})