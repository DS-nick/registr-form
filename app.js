const Koa = require('koa');
const app = new Koa();
const fs = require('fs')

const config = require('config');
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')
const passport = require('koa-passport')
const pug = require('pug')
const favicon = require('koa-favicon');

app.use(favicon(__dirname + '/public/favicon.ico'));

const Router = require('koa-router');
const router = new Router();
const LocalStrategy = require('passport-local').Strategy;

app.keys = ['session key']
app.use(session(app));
app.use(bodyParser())
require('./handlers/templates').init(app);
require('./handlers/09-flash').init(app);
app.use(passport.initialize())
app.use(passport.session())








require('./auth')













router.get('/', async (ctx, next)=> {
  if (ctx.isAuthenticated()) {
    ctx.body = pug.renderFile(__dirname + '/views/welcome.pug')
    // ctx.type = 'html';
    // ctx.body = fs.createReadStream('./views/welcome.html');

  }else {
    ctx.flash('success', 'поздравляем, вы выиграли джек-пот!');
    ctx.body = ctx.render('login.pug')
    console.log(ctx.flash('success', 'поздравляем, вы выиграли джек-пот!'))
    // ctx.type = 'html'
    //   ctx.body = fs.createReadStream('./views/login.html')
  }
  
  
  
})

  .get('/style.css', async (ctx)=> {
    ctx.type = 'css'
    ctx.body = fs.createReadStream('./views/style.css')
  })

router.post('/login', 

  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true,
    successFlash: true
    
  })


)

router.get('/logout', async (ctx)=> {
  if (ctx.isAuthenticated()) {
    ctx.logout();
    ctx.redirect('/');
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
  
})
router.get('/app', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./views/welcome.html');
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
})



app.use(router.routes());

module.exports = app;
