const ShowcaseItem = (props) => {
    const default_image = require("../assets/defaultCoupon.jpeg");
    return (
        <div>
            {props.showImage ? (
                <img
                    className="object-cover w-full aspect-video"
                    alt={props.item.title}
                    src={props.item?.imgSrc ? props.item.imgSrc : default_image}
                />
            ) : null}
            <div className="pt-4">
                <p className="heading-2 text-oxford-blue uppercase">
                    {props.item.title}
                </p>
                <p className="subheading-1 text-brunswick-green">
                    {props.item.subtitle}
                </p>
            </div>
        </div>
    );
};

export default ShowcaseItem;
