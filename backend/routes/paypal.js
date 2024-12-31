const paypal = require('paypal-rest-sdk');

paypal.configure({
    mode: 'sandbox', // or 'live' for production
    client_id: "AduVFTkqygTAmsmOF5rSfDmo6VnOT0jbFGr1rRQPSP232wUGsxUbOeRMwua0hwN57pFDfU9ljJKxWunA",
    client_secret: "EB7ral-x7I9ulqQazI9Jg04JlDHeDkY0trpytwUEldEjR7FjJuJ43Dakz_1vFlM6qZ21_qP6R1Xqx1c8",
});

module.exports = paypal;
