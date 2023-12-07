const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// // Middleware to restrict access to admin users
// const rejectIfNotAdmin = (req, res, next) => {
//   if (req.isAuthenticated() && req.user.isadmin) {
//     next(); // User is authenticated and an admin
//   } else {
//     res.status(403).json({ message: 'Access Denied' }); // Forbidden access
//   }
// };

// Middleware to check if the user is authenticated and authorized
// const checkAuthentication = (req, res, next) => {
//   if (!req.isAuthenticated() || req.user.username !== 'User1') {
//     return res.status(403).send('Not authorized');
//   }
//   next();
// };

// // Endpoint for the button action
// router.post('/button-action', checkAuthentication, (req, res) => {
//   // Perform the action here
//   res.send('Action completed successfully');
// });



// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

// // Admin-only route example
// router.get('/admin-dashboard', rejectIfNotAdmin, (req, res) => {
//   // Admin specific logic here
//   res.send("Admin Dashboard");
// });

module.exports = router;
