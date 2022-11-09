import { useEffect, useState } from 'react';

const FindDeal = () => {
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
    const [dealReturn, setDealReturn] = useState({
        title: "",
        subtitle: "",
        imgSrc: ""
    })

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
            dealJson.then((obj) => setDealReturn({
                title: obj["title"],
                subtitle: obj["merchantName"],
                imgSrc: obj["imageUrl"]
            }));
            dealJson.then((obj) => console.log(obj["imageUrl"]))
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

    return dealReturn;
}

export default FindDeal;