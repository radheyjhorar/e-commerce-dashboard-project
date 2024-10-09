const express = require("express");
const cors = require('cors');
require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product');
const Jwt = require("jsonwebtoken");
const JwtKey = "e-comm";
const app = express();

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, JwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({ result: 'Something went wrong, Please try after some time' });
    }
    res.send({ result, auth: token });
  })
})

app.post('/login', async (req, res) => {
  console.log(req.body)
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, JwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({ result: 'Something went wrong, Please try after some time' });
        }
        res.send({ user, auth: token });
      })
    } else {
      res.send({ result: 'No user found' });
    }
  } else {
    res.send({ result: 'No user found' });
  }
})

app.post('/add-product', varifyToken, async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
})

app.get("/products", varifyToken, async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products)
  } else {
    res.send({ Result: "No products found..." })
  }
})

app.delete('/product/:id', varifyToken, async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
})

app.get("/product/:id", varifyToken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No record found..." })
  }
})

app.put("/product/:id", varifyToken, async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
})

app.get("/search/:key", varifyToken, async (req, res) => {
  let result = await Product.find({
    "$or": [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ]
  });
  res.send(result);
})

function varifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(' ')[1];
    Jwt.verify(token, JwtKey, (err, valid) => {
      if(err) {
        res.status(401).send({result: "Please provide valid token"})
      } else {
        next();
      }
    })
  } else {
    res.status(403).send({result: "Please add token with header"})
  }
}

app.listen(5000);