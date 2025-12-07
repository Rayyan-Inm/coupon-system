const express = require('express');
const db = require('./db'); // Connect to our data file
const app = express();
const PORT = 3000;

app.use(express.json());

// --- HELPER: Logic Engine (Checks if a coupon works) ---
function isCouponEligible(coupon, user, cart, cartValue) {
    const now = new Date();

    // 1. Date Check
    if (coupon.startDate && new Date(coupon.startDate) > now) return false;
    if (coupon.endDate && new Date(coupon.endDate) < now) return false;

    // 2. Eligibility Checks
    if (coupon.eligibility) {
        const rules = coupon.eligibility;

        // Cart-based Checks
        if (rules.minCartValue && cartValue < rules.minCartValue) return false;

        const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        if (rules.minItemsCount && totalItems < rules.minItemsCount) return false;

        // User-based Checks
        if (rules.allowedUserTiers && !rules.allowedUserTiers.includes(user.userTier)) return false;
        if (rules.minLifetimeSpend && user.lifetimeSpend < rules.minLifetimeSpend) return false;
        if (rules.minOrdersPlaced && user.ordersPlaced < rules.minOrdersPlaced) return false;
    }

    return true; // Passed all checks
}

// --- HELPER: Calculate Discount Amount ---
function calculateDiscount(coupon, cartValue) {
    let discount = 0;
    if (coupon.discountType === 'FLAT') {
        discount = coupon.discountValue;
    } else if (coupon.discountType === 'PERCENT') {
        discount = (coupon.discountValue / 100) * cartValue;
        // Cap the discount if maxDiscountAmount is set
        if (coupon.maxDiscountAmount && discount > coupon.maxDiscountAmount) {
            discount = coupon.maxDiscountAmount;
        }
    }
    // Discount cannot be more than the total cart value
    return Math.min(discount, cartValue);
}

// --- API 1: Create Coupon (POST /coupons) ---
app.post('/coupons', (req, res) => {
    const newCoupon = req.body;

    // Basic Validation
    if (!newCoupon.code || !newCoupon.discountType || !newCoupon.discountValue) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // Check for duplicates
    const exists = db.coupons.find(c => c.code === newCoupon.code);
    if (exists) {
        return res.status(400).json({ error: "Coupon code already exists" });
    }

    db.coupons.push(newCoupon);
    res.status(201).json({ message: "Coupon created successfully", coupon: newCoupon });
});

// --- API 2: Get Best Coupon (POST /applicable-coupons) ---
app.post('/applicable-coupons', (req, res) => {
    const { cart, user } = req.body; // We expect User and Cart in the input

    // Calculate total cart value from items (Price * Quantity)
    const cartValue = cart.items.reduce((total, item) => {
        return total + (item.unitPrice * item.quantity);
    }, 0);

    const applicableCoupons = [];

    // 1. Filter: Find all eligible coupons
    for (const coupon of db.coupons) {
        if (isCouponEligible(coupon, user, cart, cartValue)) {
            const amount = calculateDiscount(coupon, cartValue);
            applicableCoupons.push({
                coupon: coupon,
                discountAmount: amount
            });
        }
    }

    // 2. Sort: Find the "Best" one (Highest discount)
    if (applicableCoupons.length === 0) {
        return res.json({ message: "No applicable coupons found" });
    }

    // Sort by discount amount (highest first)
    applicableCoupons.sort((a, b) => b.discountAmount - a.discountAmount);

    // Return the best one
    const bestOption = applicableCoupons[0];
    res.json({
        couponCode: bestOption.coupon.code,
        discountAmount: bestOption.discountAmount
    });
});

// --- Debug: List all coupons ---
app.get('/coupons', (req, res) => {
    res.json(db.coupons);
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});