import { useEffect, useState } from 'react';

const FindCoupon = () => {
    const [boolCoupons, setBoolCoupons] = useState(true);
    const [coupons, setCoupons] = useState({
        couponId: 0,
        title: '',
        merchantName: '',
        clickUrl: '',
        couponCode: ''
    });
    const [couponReturn, setCouponReturn] = useState({
        title: "",
        subtitle: ""
    });

    async function fetchCoupons() {
        const options = {
            method: 'GET',
        };
  
        try {
            let coupon = await fetch(`http://localhost:9000/api/coupon/random`, options)
            const couponJson = coupon.json();
            couponJson.then((obj) => setCoupons({
                couponId: obj["couponId"],
                title: obj["title"],
                merchantName: obj["merchantName"],
                clickUrl: obj["clickUrl"],
                couponCode: obj["couponCode"]
            }))
            couponJson.then((obj) => setCouponReturn({
                title: obj["title"],
                subtitle: obj["merchantName"]
            }));
            setBoolCoupons(false);
            return coupons;
        } catch (err) {
            console.log(err);
        }
    }

    async function boolFetch() {
        if (boolCoupons) {
            fetchCoupons();
        }
    }

    useEffect(() => {
        boolFetch();
    })

    return couponReturn;
}

export default FindCoupon;