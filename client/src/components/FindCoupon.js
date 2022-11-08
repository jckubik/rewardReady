import { useEffect, useState } from 'react';
import { getRandomCoupon } from '../utils/api';
import { discountSecret } from '../utils/api';

const FindCoupon = () => {
    const [boolCoupons, setBoolCoupons] = useState();
    const [coupons, setCoupons] = useState({
        couponId: 0,
        title: '',
        merchantName: '',
        clickUrl: '',
        couponCode: ''
    });
    const [couponToVisit, setCouponToVisit] = useState("");


    async function fetchCoupons() {
        const options = {
            method: 'GET',
            // url: "http:/localhost:9000/api/coupon/random",
            // headers: {
            //     'Access-Control-Allow-Origin': "https://api.discountapi.com/v2/deals",
            //     key: discountSecret 
            // }
        };
  
        try {
            let coupon = await fetch(`http://localhost:9000/api/coupon/random`, options)
            // .then((response) => response)
            // .then((response) => response.json())
            // .then((response) => console.log(response.value))
            // .then((response) => setCoupons(response.data.title))
            // .catch((err) => console.error(err));
        // return getRandomCoupon();
            const couponJson = coupon.json();
            couponJson.then((obj) => setCoupons({
                couponId: obj["couponId"],
                title: obj["title"],
                merchantName: obj["merchantName"],
                clickUrl: obj["clickUrl"],
                couponCode: obj["couponCode"]
            }));
            setBoolCoupons(false);
            return coupons;
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (boolCoupons) {
            fetchCoupons();
        }
    })

    return (
        <div className='container flex-1'>
            <div className='flex-1'>
                <label htmlFor='boolCoupon'>Do you want coupons?</label>

                <select name='boolCoupon' id='boolCoupon' onChange={(e) => setBoolCoupons([e.target.value])}>
                    <option key={0} value='empty'>Select</option>
                    <option key={1} value='true'>Yes</option>
                </select>
            </div>
            {
            coupons.length === 0 ? 
                ""
                :

            <div className='flex-1'>
                <div className='flex-1'>
                    <label htmlFor='coupons'>These coupons are available</label>
                    <div className='flex-1'>
                        <h1><a href={coupons.clickUrl}>{coupons.title} is available from {coupons.merchantName}</a></h1>    
                    </div>
                </div>
            </div>
            }
        </div>
    );
}

export default FindCoupon;