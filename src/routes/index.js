import authRoute from './authRoute.js';
import userRoute from './userRoute.js';

function routes(app) {
  app.use('/auth', authRoute);
  app.use('/api', userRoute);

  app.get('/', (req, res) => {
    req.header;
    res.cookie('userName', 'admin', {
      maxAge: 60000,
      httpOnly: true,
    });
    res.render('home');
  });
}

export default routes;