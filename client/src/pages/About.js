const About = () => {
// About US 
  return (
    <div class="py-16 bg-white">  
  <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
      <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
        <div class="md:5/12 lg:w-5/12">
          <img src="https://thumbs.dreamstime.com/b/coupons-xxxl-29599507.jpg" alt="image" loading="lazy" width="" height=""></img>
        </div>
        <div class="md:7/12 lg:w-6/12">
          
          {/* Header */}
          <h2 class="text-2xl text-gray-900 font-bold md:text-4xl">RewardReady development is carried out by a team of passionate developers</h2>

          {/* Paragraphs */}
          <p class="mt-6 text-gray-600 ">With companies fiercely competing against each other to attract consumers and increase their market share, the end user stands to gain in the form of lower prices/discounts, cashback, and other deals and rewards. The deals are offered not only on the product but also on the purchase option used to make payment. However, with such a huge number of players in the market, it is not an easy task for a consumer to get the best deal for his purchase!</p>
          <p class="mt-4 text-gray-600 "> We at RewardReady aim to create a web application that can register users, store card types, and recommend a card based on their current shopping location. Application capable of providing coupons for the customers current purchase, display current sales or deals for the item or type of item, and in the future recommend new loyalty cards that the user might like based on user activity.</p>
          
          
        </div>
      </div>
  </div>
</div>
  );
};

export default About;