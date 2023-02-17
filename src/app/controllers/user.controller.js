const User = require('../models/user.model');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class UserController {
  register(req, res, next) {
    const { username, password, fullname, email } = req.body;

    if (!username || !password || !email)
      return res.status(400).json({
        success: false,
        message: 'Lack of information',
      });

    User.findOne({ username })
      .then(user => {
        if (user)
          return res.status(400).json({
            success: false,
            message: 'Username had existed!',
          });
        User.findOne({ email })
          .then(user => {
            if (user)
              return res.status(400).json({
                success: false,
                message: 'Email had existed!',
              });

            argon2
              .hash(password)
              .then(hashedPass => {
                User.create({
                  username: username,
                  password: hashedPass,
                  fullname,
                  email,
                }).then(newUser => {
                  return res.status(200).json({
                    success: true,
                    message: 'Success to create new user',
                    user: newUser,
                    token: jwt.sign(
                      { userId: newUser._id },
                      process.env.ACCESS_TOKEN,
                    ),
                  });
                });
              })
              .catch(next);
          })
          .catch(next);
      })
      .catch(next);
  }

  signin(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password)
      return res.status(400).json({
        success: false,
        message: 'Lack of information',
      });

    User.findOne({ username }).then(user => {
      if (user === null)
        return res.status(404).json({
          success: false,
          message: 'Username not existed',
        });

      argon2.verify(user.password, password).then(validate => {
        if (!validate)
          return res.status(400).json({
            success: false,
            message: 'Incorrect password',
          });

        res.status(200).json({
          user,
          success: true,
          message: 'Login success',
          token: jwt.sign(
            {
              userId: user._id,
            },
            process.env.ACCESS_TOKEN,
          ),
        });
      });
    });
  }
}

module.exports = new UserController();
