import { useEffect, useState } from 'react';

const FindDeal = (props) => {
    const [boolDeals, setBoolDeals] = useState(true);
    const [deals, setDeals] = useState({
        dealId: 0,
        title: '',
        merchantName: '',
        imageUrl: '',
        price: 0.0,
        value: 0.0,
        description: ""
    });
    const [dealToVisit, setDealToVisit] = useState("");


    async function fetchDeals() {
        const options = {
            method: 'GET',
        };
  
        try {
            let deal = await fetch(`http://localhost:9000/api/deal/random`, options)
            const dealJson = deal.json();
            dealJson.then((obj) => setDeals({
                dealId: obj["couponId"],
                title: obj["title"],
                merchantName: obj["merchantName"],
                clickUrl: obj["clickUrl"],
                couponCode: obj["couponCode"]
            }))
            dealJson.then((obj) => props.changeDeal({
                title: obj["title"],
                subtitle: obj["merchantName"],
                imageSrc: obj["imageUrl"]
            }));
            setBoolDeals(false);
            return deals;
        } catch (err) {
            console.log(err);
        }
    }

    async function boolFetch() {
        if (boolDeals) {
            fetchDeals();
        }
    }

    useEffect(() => {
        boolFetch();
    })

    return (
        <div hidden>
            <div className="pt-4">
                <p className="text-inter font-extrabold text-xl text-oxford-blue uppercase">
                    {deals.title}
                </p>
                <p className="text-inter font-bold text-base text-brunswick-green">
                    {deals.merchantName}
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

export default FindDeal;