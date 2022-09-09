const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const AppError = require('../utils/appError');
const Product = require('./../models/productModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  //1) Get the current product added to user's cart
  const product = await Product.findById(req.params.productId);

  //2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/product/${product.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.productId,
    line_items: [
      {
        name: `${product.name} Product`,
        description: product.summary,
        images: [`YOUR OWN IMAGE FOR THE PRODUCT GOES HERE`],
        amount: product.price * 100,
        currency: 'usd',
        quantity: 1,
      },
    ],
  });

  //3) Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});
