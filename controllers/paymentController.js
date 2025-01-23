const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
    const { cartItems, total, token } = req.body;
    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });
        const payment = await stripe.charges.create({
            amount: total * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email
        }, {
            idempotencyKey: Math.random().toString(36).substr(2, 9)
        });
        res.json(payment);
    } catch (error) {
        return res.status(400).json({ message: "Payment failed" });
    }
    
};