// double check file path
const products = require('./products.js');
// import reviews from './reviews.json';
const { port } = require('./server/server.js')

/** import YOUR port number here */

const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:${port}/products`, {useNewUrlParser: true})
//connect that shit

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`we're connected!`)

})
const imagesSchema = new mongoose.Schema({
  listing_image_id: Number,
  listing_id: Number,
  url_75x75: String,
  url_170x135: String,
  url_570xN: String,
  url_fullxfull: String,
  full_height: Number,
  full_width: Number,
})

const productSchema = new mongoose.Schema({
  listing_id: { // <-- product id
    type: Number,
    unique: true,
  },
  title: String,
  description: String,
  price: Number,
  category_path: [String],
  Images: [imagesSchema],
  Shop: {
    shop_id: Number,
    shop_name: String,
    title: String,
    icon_url_fullxfull: String,
  },
  
  product_options: {
    option_1: {
      title: String,
      description_1: String,
      description_2: String,
      description_3: String,
      description_4: String,
    },
    option_2: {
      title: String,
      description_1: String,
      description_2: String,
      description_3: String,
      description_4: String,
    },
    option_3: {
      title: String,
      description_1: String,
      description_2: String,
      description_3: String,
      description_4: String,
    },
  },
});

const reviewSchema = new mongoose.Schema({
  review_id:{
    type: Number,
    unique: true,
  },
  // double check date format/keyword
  date: Date,
  description: String,
  rating: Number,
  user_name: String,
  user_photo_url: String,
  product_id: Number,
  product_user_image_url: String,

})

const Products = mongoose.model('Products', productSchema);
const Reviews = mongoose.model('Reviews', reviewSchema);

const productsSave = products => {
  Products.insertMany(products)
    .then((data) => {
      console.log('...Saved products to database...')
      return data
    })
    .then((data) => {
      // retrieve all the database thingies
      // or whatever you need specifically
      return data;
    })
    .then((data) => {
      // populate component with data
    })
    .catch((err) => {
      console.log('...product saving err... :(');
    })
}
productsSave(products.results);

const reviewsSave = reviews => {
  Reviews.insertMany(reviews)
    .tap(() => {
      console.log('...Saved reviews to database...')
    })
    .then(() => {
      // retrieve all the database thingies
      // or whatever you need specifically
    })
    .then((data) => {
      // populate component with data
    })
    .catch((err) => {
      console.log('...review saving err... :(');
    })
}