const app = require('./app')
const config = require('config')

app.listen(config.get('port'), ()=> {
    console.log('server listen port 3000')
})