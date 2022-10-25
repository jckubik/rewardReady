import Hero from "../components/Hero";
import Showcase from "../components/Showcase";

const Home = () => {
  let items = [
    {
      title: "50% Off REI Shoes",
      subtitle: "REI",
      imgSrc: "../assets/shoes.jpg",
    },
    {
      title: "50% Off REI Shoes",
      subtitle: "REI",
      imgSrc: "../assets/shoes.jpg",
    },
    {
      title: "50% Off REI Shoes",
      subtitle: "REI",
      imgSrc: "../assets/shoes.jpg",
    },
    {
      title: "50% Off REI Shoes",
      subtitle: "REI",
      imgSrc: "../assets/shoes.jpg",
    },
  ];
  return (
    <div className="w-full">
      <Hero />
      <Showcase
        title="Popular Deals"
        items={items}
        backgroundColor="honeydew"
      />
      <Showcase title="Popular Coupons" items={items} backgroundColor="white" />
    </div>
  );
};

export default Home;
