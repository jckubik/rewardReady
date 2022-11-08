import { useEffect, useState } from 'react';

const FindCoupon = (props) => {
    const [boolCoupons, setBoolCoupons] = useState(true);
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
            couponJson.then((obj) => props.changeCoupon({
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

    return (
        <div hidden>
            <div className="pt-4">
                <p className="text-inter font-extrabold text-xl text-oxford-blue uppercase">
                    {coupons.title}
                </p>
                <p className="text-inter font-bold text-base text-brunswick-green">
                    {coupons.merchantName}
                </p>
            </div>
        </div>
        // <div className='container flex-1'>
        //     <div className='flex-1'>
        //         <label htmlFor='boolCoupon'>Do you want coupons?</label>

            //     <select name='boolCoupon' id='boolCoupon' onChange={(e) => setBoolCoupons([e.target.value])}>
            //         <option key={0} value='empty'>Select</option>
            //         <option key={1} value='true'>Yes</option>
            //     </select>
            // </div>
        //     {
        //     coupons.length === 0 ? 
        //         ""
        //         :

        //     <div className='flex-1'>
        //         <div className='flex-1'>
        //             <label htmlFor='coupons'>These coupons are available</label>
        //             <div className='flex-1'>
        //                 <h1><a href={coupons.clickUrl}>{coupons.title} is available from {coupons.merchantName}</a></h1>    
        //             </div>
        //         </div>
        //     </div>
        //     }
        // </div>
    );
}

export default FindCoupon;