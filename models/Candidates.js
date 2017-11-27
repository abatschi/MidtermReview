var mongoose = require('mongoose');
var CandidateSchema = new mongoose.Schema({
  name: String,
  votes: {type: Number, default: 0},
});

CandidateSchema.methods.upvote = function(cb) {
  this.votes += 1;
  this.save(cb);
};

mongoose.model('Candidate', CandidateSchema);