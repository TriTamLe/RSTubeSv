const User = require('../models/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class UserController {
  register(req, res, next) {
    const { username, password, fullname, email } = req.body;

    if (!username || !password || !email)
      return res.status(400).json({
        success: false,
        message: 'Thiếu email, mật khẩu hoặc tên đăng nhập',
      });

    User.findOne({ username })
      .then(user => {
        if (user)
          return res.status(400).json({
            success: false,
            message: 'Tên đăng nhập này đã tồn tại trong hệ thống!',
          });
        User.findOne({ email })
          .then(user => {
            if (user)
              return res.status(400).json({
                success: false,
                message: 'Email này đã tồn tại trong hệ thống!',
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
                    message: 'Đã tạo thành công người dùng mới',
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
        message: 'Vui lòng nhập tên đăng nhập hoặc mật khẩu',
      });

    User.findOne({ username }).then(user => {
      if (user === null)
        return res.status(404).json({
          success: false,
          message: 'Người dùng này không tồn tại trong hệ thống',
        });

      argon2.verify(user.password, password).then(validate => {
        if (!validate)
          return res.status(400).json({
            success: false,
            message: 'Mật khẩu không đúng',
          });

        res.status(200).json({
          success: true,
          message: 'Đăng nhập thành công',
          token: jwt.sign(
            {
              userID: user._id,
            },
            process.env.ACCESS_TOKEN,
          ),
          user,
        });
      });
    });
  }
}

module.exports = new UserController();
