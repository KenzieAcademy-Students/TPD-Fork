const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { JWT_EXPIRES_IN, JWT_SECRET } = require("../config/constants");

//http://localhost:3001/api/v1/users /* Postman request URL for testing */ //protected with bearer
exports.getAllUsers = async (req, res, next) => {
  // Extract the _end, _order, _sort, and _start parameters from the query string
  const { _end, _order, _sort, _start } = req.query;

  // Convert _end and _start to numbers
  const endIndex = parseInt(_end, 10) || 10;
  const startIndex = parseInt(_start, 10) || 0;

  // Create a sort object based on the _sort and _order parameters
  const sort = {};
  if (_sort) {
    sort[_sort] = _order === "ASC" ? 1 : -1;
  }

  // Fetch the users using the startIndex, endIndex, and sort parameters
  const users = await User.find()
    .sort(sort)
    .skip(startIndex)
    .limit(endIndex - startIndex);

  // Get the total count of users for the X-Total-Count header
  const count = await User.countDocuments();

  // Set the X-Total-Count header and return the paginated list of users
  res.status(200).set("X-Total-Count", count).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
};

exports.getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new Error("No user found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
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
      return next(new Error("No user found with that ID", 404));
    }
  } catch (error) {
    res.status(404).json({
      status: "failed",
    });
  }
});

exports.createUser = async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
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
    return next(new Error("No user found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new Error("No user found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
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
    return next(new Error("Please enter all the fields.", 400));
  }

  const user = await User.findOne({
    email,
  });

  if (user) {
    return res.status(422).json({ error: "User already exists" });
  }
  if (password !== confirmPassword) {
    return next(new Error("Passwords do not match", 422));
  }
  const hashedPassword = await bcrypt.hash(password, 12);

  //the order of these must match the order they come from in the front
  const newUser = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    passwordHash: hashedPassword,
    userName: userName,
    role,
  });

  const payload = {
    id: newUser._id,
    userName: newUser.userName,
    role: newUser.role,
  };

  const options = {
    expiresIn: JWT_EXPIRES_IN,
  };

  const token = jwt.sign(payload, JWT_SECRET, options);

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.getMe = asyncHandler(async (req, res) => {
  const { email, firstName, lastName } = req.body;

  //only getting email, firstname and last name for now.
  const user = await User.findById(req.id).select(
    "email firstName lastName"
  );

  if (user.id !== req.id) {
    return res.status(403).json({ error: "Forbidden" });
  }

  res.status(200).json(user);
});

//update user details
exports.updateMe = asyncHandler(async (req, res) => {
  const { email, firstName, lastName } = req.body;

  const user = await User.findById(req.id);

  if (user.id !== req.id) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const updatedUser = await User.findByIdAndUpdate(req.id, req.body, {
    new: true,
  }).select("-passwordHash");
  console.log(updatedUser);
  res.status(200).json(updatedUser);
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new Error(
          "You do not have permission to perform this action",
          403
        )
      );
    }
    next();
  };
};
