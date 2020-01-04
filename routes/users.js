const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//User model
const User = require('../models/User');

//login
router.get('/Login', (req, res) => res.render('login'));

//register
router.get('/Register', (req, res) => res.render('register'));

//Register Handle
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  //check these
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'please fill all the data' });
  }
  //check password match
  if (password !== password2) {
    errors.push({ msg: 'password do not match' });
  }
  //password length
  if (password.length < 6) {
    errors.push({ msg: 'password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    // validation passed
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });
        // bcrypt.genSalt(10, (err, salt) => {
        //   bcrypt.hash(newUser.password, salt, (err, hash) => {
        //     if (err) throw err;
        //     newUser.password = hash;
        //     newUser
        //       .save()
        //       .then(user => {
        //         req.flash(
        //           'success_msg',
        //           'You are now registered and can log in'
        //         );
        //         res.redirect('/users/login');
        //       })
        //       .catch(err => console.log(err));
        //   });
        // });
      }
    });
  }
});
module.exports = router;
