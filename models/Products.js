var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
  name: String,
  price: String,
  pictureUrl: String,
  numOrdered: {type: Number, default: 0},
});

ProductSchema.methods.upNumOrdered = function(cb) {
  this.numOrdered += 1;
  this.save(cb);
};

mongoose.model('Product', ProductSchema);