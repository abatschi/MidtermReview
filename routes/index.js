var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Product = mongoose.model('Product');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/product', function(req, res, next) {
  Product.find(function(err, products){
    if(err){ return next(err); }
    res.json(products);
  });
});

router.post('/product', function(req, res, next) {
	console.log(req.body);
  var product = new Product(req.body);
  product.save(function(err, product){
    if(err){ return next(err); }
    res.json(product);
  });
});

router.param('product', function(req, res, next, id) {
  var query = Product.findById(id);
  query.exec(function (err, product){
    if (err) { return next(err); }
    if (!product) { return next(new Error("can't find product")); }
    req.product = product;
    return next();
  });
});

router.get('/products/:product', function(req, res) {
  res.json(req.product);
});

router.put('/product/:product/upNumOrdered', function(req, res, next) {
  req.product.upNumOrdered(function(err, product){
    if (err) { return next(err); }
    res.json(product);
  });
});

router.delete('/products/:product', function(req, res) {
  console.log("in Delete");
  req.product.remove();
  res.sendStatus(200);
});


module.exports = router;
