const passport = require('koa-passport')


const LocalStrategy = require('passport-local').Strategy;


const fetchUser = (() => {
    const user = { id: 1, email: 'test@mail.ru', password: 'test' };
    return async () => {
      return user;
    }
  })();
  
  passport.serializeUser((user, done) => {
    done(null, user.id)
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await fetchUser();
      done(null, user);
    } catch(err) {
      done(err);
    }
  });
  
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  (email, password, done) => {
      console.log('Проверка на емаил')
    fetchUser()
      .then(user => {
        if (email === user.email && password === user.password) {
          done(null, user);
        } else {
          done(null, false);
        }
      })
      .catch((err) => { done(err) });
  }));