const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { authUser } = require('./modules/basicAuth')
const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');



// Route includes
const userRouter = require('./routes/user.router');

const ordersRouter = require('./routes/orders.router');

const galleryRouter = require('./routes/gallery.router')

// const adminRouter = require('./routes/admin.router')

// const adminRouter = require('./routes/admin.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());


// Variable to store the levelIndex on the server
let levelIndex = 0;

app.get('/api/getLevelIndex', (req, res) => {
  console.log('GET /api/getLevelIndex', levelIndex);

  res.json({ levelIndex });
});

app.post('/api/updateLevelIndex', (req, res) => {
  const { newLevelIndex } = req.body;
  console.log('POST /api/updateLevelIndex', newLevelIndex);
  levelIndex = newLevelIndex;
  res.json({ success: true });
});



/* Routes */
app.use('/api/user', userRouter);

app.use('/orders', ordersRouter);

app.use('/api/gallery', galleryRouter);

// app.use('/api/admin', adminRouter)


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5001;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
