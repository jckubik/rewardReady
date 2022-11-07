import { useEffect, useState } from 'react';
import { discountSecret } from '../utils/api';

const FindCoupon = () => {
    const [boolCoupons, setBoolCoupons] = useState();
    const [coupons, setCoupons] = useState([]);
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
  

        await fetch(`http://localhost:9000/api/coupon/random`, options)
            .then((response) => response.json)
            .then((response) => console.log(response))
            .then((response) => setCoupons(response[0].title))
            .catch((err) => console.error(err));
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
                    <select 
                        name="coupons" 
                        id="coupons" 
                        onChange={(event) => setCouponToVisit(coupons[event.target.value])}
                    >
                    <option value="empty">Select</option>
                    {
                        coupons.map((coupon, index) => (
                        <option value={index} key={coupon.id}>{ coupon.title }</option>
                        ))
                    }
                    </select>
                </div>
            </div>
            }
        </div>
    );
}

export default FindCoupon;