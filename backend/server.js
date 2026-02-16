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

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login requests per windowMs
  message: {
    message: "Too many login attempts from this IP, please try again later."
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false   // Disable the `X-RateLimit-*` headers
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


// Routes
app.get("/", (req, res) => {
  res.send("Hello Member!");
});

app.post('/users', async (req, res) => {
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

app.get('/secrets', authenticateUser, (req, res) => {
  res.json({
    secret: 'This is a super secret message'
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
