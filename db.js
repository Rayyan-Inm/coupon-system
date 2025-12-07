// This file acts as our "Database"

// 1. The list of all coupons
// We will add to this list when we use the "Create Coupon" API.
const coupons = [];

// 2. The list of users
// The PDF requires this specific user to exist for the reviewer.
const users = [
    {
        userId: "u1", // specific ID for the reviewer
        email: "hire-me@anshumat.org",
        password: "HireMe@2025!"
    }
];

// We export these lists so our main file (index.js) can use them.
module.exports = {
    coupons,
    users
};