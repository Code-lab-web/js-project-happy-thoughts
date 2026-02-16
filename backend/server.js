import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from 'bcrypt-nodejs';
import bodyParser from 'body-parser';
import crypto from "crypto";
import rateLimit from "express-rate-limit";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/auth";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const User = mongoose.model('User', {
  name: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
});

const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({
    accessToken: req.header('Authorization')
  });
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({
      loggedOut: true
    });
  }
};

const port = process.env.PORT || 8080;
const app = express();

// Rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 authenticated requests per windowMs
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 login/registration requests per windowMs
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


// Routes
app.get("/", (req, res) => {
  res.send("Hello Member!");
});

app.post('/users', loginLimiter, async (req, res) => {
  try {
    const {
      name,
      email,
      password
    } = req.body;
    const user = new User({
      name,
      email,
      password: bcrypt.hashSync(password)
    });
    await user.save();
    res.status(201).json({
      id: user._id,
      accessToken: user.accessToken
    });
  } catch (err) {
    res.status(400).json({
      message: 'Could not create user',
      errors: err.errors
    });
  }
});

app.post('/sessions', loginLimiter, async (req, res) => {
  const user = await User.findOne({
    email: req.body.email
  });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({
      userId: user._id,
      accessToken: user.accessToken
    });
  } else {
    res.status(404).json({
      notFound: true
    });
  }
});

app.get('/secrets', authLimiter, authenticateUser, (req, res) => {
  res.json({
    secret: 'This is a super secret message'
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
