var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

//get all hotel reviews
module.exports.reviewsGetAll = function(req,res){
  var hotelId = req.params.hotelId;
    console.log("get hotelId", hotelId);

    Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err,doc){
      if(err){
        console.log("Error finding hotels");
        res
        .status(500)
        .json(err);
      }else if(!doc){
        console.log("Hotel id not found in database", hotelId);
        res
        .status(404)
        .json({
          "message" : "Hotel ID not found " + hotelId
        });
      }else{
        console.log("returned doc",doc)
        res
        .status(200)
        .json(doc.reviews);
      }
    });
};


//get single review
module.exports.reviewsGetOne = function(req,res){
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log("get reviewId " +reviewId+ " for hotelId "+hotelId);

  Hotel
  .findById(hotelId)
  .select('reviews')
  .exec(function(err,hotel){
    if(err){
      console.log("Error finding hotels");
      res
      .status(500)
      .json(err);
    }else if(!hotel){
      console.log("Hotel id not found in database", hotelId);
      res
      .status(404)
      .json({
        "message" : "Hotel ID not found " + hotelId
      });
    }
    else{
      console.log("returned hotel",hotel)
      var review =hotel.reviews.id(reviewId)
      res
      .status(200)
      .json(review);
    }
  });
};

var _addReview = function (req,res,hotel){

  hotel.reviews.push({
    name:req.body.name,
    rating: parseInt(req.body.rating, 10),
    review: req.body.review
  });

  hotel.save(function(err,hotelUpdated){
    if(err){
      console.log("Error finding hotels");
      res
      .status(500)
      .json(err);
    }else{
      res
      .status(201)
      .json(hotelUpdated.reviews[hotelUpdated.reviews.length -1]);
    }
  });

};

module.exports.reviewsAddOne =function(req,res){
  var hotelId = req.params.hotelId;
    console.log("get hotelId", hotelId);

    Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err,doc){
      if(err){
        console.log("Error finding hotels");
        res
        .status(500)
        .json(err);
      }else if(!doc){
        console.log("Hotel id not found in database", hotelId);
        res
        .status(404)
        .json({
          "message" : "Hotel ID not found " + hotelId
        });
      }
      if(doc){
        _addReview(req,res,doc)
      }else{
        console.log("returned doc",doc)
        res
        .status(200)
        .json(doc.reviews);
      }
    });


};


module.exports.reviewsUpdateOne = function(req,res){
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log('PUT reviewId ' + reviewId + ' for hotelId ' + hotelId);

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel) {
      var thisReview;
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if(!hotel) {
        console.log("Hotel id not found in database", hotelId);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + hotelId
        };
      } else {
        // Get the review
        thisReview = hotel.reviews.id(reviewId);
        // If the review doesn't exist Mongoose returns null
        if (!thisReview) {
          response.status = 404;
          response.message = {
            "message" : "Review ID not found " + reviewId
          };
        }
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        thisReview.name = req.body.name;
        thisReview.rating = parseInt(req.body.rating, 10);
        thisReview.review = req.body.review;
        hotel.save(function(err, hotelUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });
};



module.exports.reviewsDeleteOne = function(req,res){
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log('PUT reviewId ' + reviewId + ' for hotelId ' + hotelId);

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel) {
      var thisReview;
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if(!hotel) {
        console.log("Hotel id not found in database", hotelId);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + hotelId
        };
      } else {
        // Get the review
        thisReview = hotel.reviews.id(reviewId);
        // If the review doesn't exist Mongoose returns null
        if (!thisReview) {
          response.status = 404;
          response.message = {
            "message" : "Review ID not found " + reviewId
          };
        }
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        hotel.reviews.id(reviewId).remove();
        hotel.save(function(err, hotelUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });


};
