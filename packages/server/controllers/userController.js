const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

//http://localhost:3001/api/v1/users /* Postman request URL for testing */
exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
};

exports.getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new Error('No user found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return next(new Error('No user found with that ID', 404));
    }
  } catch (error) {
    res.status(404).json({
      status: 'failed',
    });
  }
});

exports.createUser = async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
};

exports.updateUser = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new Error('No user found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new Error('No user found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.signup = asyncHandler(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    userName,
    role,
  } = req.body;

  if (!email || !password || !userName) {
    return next(new Error('Please enter all the fields.', 400));
  }

  const user = await User.findOne({
    email,
  });

  if (user) {
    return next(new Error('User already exists', 422));
  }
  if (password !== confirmPassword) {
    return next(new Error('Passwords do not match', 422));
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    passwordHash: hashedPassword,
    userName: userName,
    role,
  });
  const token = jwt.sign(
    {
      id: newUser._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

//require authentication
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new Error(
        'You are not logged in! Please log in to get access.',
        401
      )
    );
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new Error(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }
  // if (freshUser.changedPasswordAfter(decoded.iat)) {
  //   return next(
  //     new Error(
  //       'User recently changed password! Please log in again.',
  //       401
  //     )
  //   );
  // }
  req.user = freshUser;
  next();
});

//sends the client with the current users data as middleware.
exports.getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user.id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    role: req.user.role,
  };
  res.status(200).json(user);
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new Error(
          'You do not have permission to perform this action',
          403
        )
      );
    }
    next();
  };
};
