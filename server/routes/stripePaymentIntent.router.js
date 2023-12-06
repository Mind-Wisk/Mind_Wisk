const express = require('express');
const Stripe = require('stripe');
const router = express.Router();

const stripe = new Stripe('sk_test_fill in test security key');



/**
 * GET route template
 */
router.get('/create-payment-intent', (req, res) => {
    // GET route code here
    res.send('Hello World!');
});

/**
 * POST route template
 */
router.post('/', async (req, res) => {
    const { amount } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, //check that it is a number and not a string 
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
        });
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.log("Error creating payment intent:", error);
        res.status(500).send({ error: error.message });
    }
});



module.exports = router;
