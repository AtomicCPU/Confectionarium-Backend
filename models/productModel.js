const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name.'],
      unique: true,
      trim: true,
      maxLength: [40, 'Product name must be at most 40 characters.'],
      minLength: [4, 'Product name must be at least 4 characters.'],
    },
    purchaseSize: {
      type: Number,
    },
    averageRating: {
      type: Number,
      default: 5.0,
      max: [10, 'A rating must not have a value exceeding 10.0'],
      min: [0, 'A rating must have a value of at least 0.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      require: [true, 'A product must have a price.'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below the regular price',
      },
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'A product must have a description.'],
    },
    productImage: {
      type: String,
      required: [true, 'A product must have a product image.'],
    },
    images: {
      type: [String],
    },
    creationDate: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    purchaseLocations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        inStock: Boolean,
      },
    ],
    confectioner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Indexes used to sort the enties by order of the fields specified (1 for ascending, -1 for descending)
productSchema.index({
  price: 1,
  averageRating: -1,
});
productSchema.index({
  slug: 1,
});
productSchema.index({
  locations: '2dsphere',
});

// Virtual populating of reviews (product in foreignField is how this object is reference in the reviewModel)
productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});

// DOCUMENT MIDDLEWARE  /^find/ counts for all strings starting with find
productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERY MIDDLEWARE
productSchema.pre(/^find/, function (next) {
  this.find({});
  this.start = Date.now();
  next();
});

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'confectioner',
    select: '-__v -passwordChangedAt',
  });
  next();
});

productSchema.post(/^find/, function (docs, next) {
  console.log(`Query took: ${Date.now() - this.start} Miliseconds`);
  next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
