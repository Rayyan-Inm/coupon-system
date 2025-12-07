async function testSystem() {
    console.log("--- 1. Creating a Coupon (SAVE10) ---");
    await fetch('http://localhost:3000/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            code: "SAVE10",
            discountType: "PERCENT",
            discountValue: 10, // 10% off
            eligibility: { minCartValue: 100 }
        })
    });

    console.log("--- 2. Asking for Best Coupon ---");
    const response = await fetch('http://localhost:3000/applicable-coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user: { userTier: "GOLD", lifetimeSpend: 5000 },
            cart: {
                items: [
                    { productId: "p1", unitPrice: 200, quantity: 1 } // Total: 200
                ]
            }
        })
    });

    const result = await response.json();
    console.log("RESULT:", result);
}

testSystem();