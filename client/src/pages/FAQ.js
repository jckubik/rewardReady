const Faq = () => {

    return (
    <div>    
      <section class="text-gray-700">
        <div class="container px-5 py-24 mx-auto">
          <div class="text-center mb-20">
            <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
              Frequently Asked Question
            </h1>
            <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
              The most common questions about how our website works and what it can do for you.
            </p>
          </div>

        <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2 text-justify ">
           <div class="w-full lg:w-1/2 px-4 py-2">
              <details class="mb-4">
                <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                  How do I create an account?
                </summary>
                <span>
                  Click on Register on the top right corner and enter your information to create your user profile. 
                  Once you have created your account click on Sign-in, to login to your user profile. 
                </span>
              </details>

              <details class="mb-4">
                <summary class="font-semibold bg-gray-200 rounded-md py-2 px-4">
                  I forgot my password, what should I do?
                </summary>
                <span>
                  To reset your password, you simply click on Sign-In link provided on the top right corner of the page,
                   and select forgot password from the popup.
                </span>
              </details>

              <details class="mb-4">
                <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                How can I share RewardReady coupons with friends and family?
                </summary>
                <span>
                It's easy to share your favorite coupons with your friends and family. Launch the web browser of your choice. 
                Go to RewardReady website. Choose and clip your coupon, by using snipping tool for windows and by pressing Command + Shift + 5 for macOS. 
                </span>
              </details>

              <details class="mb-4">
                <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                Why should I create an account on RewardReady website?
                </summary>
                <span>
                  Creating an account helps us manage your likes and preferences. It also helps you find adn save the deals that 
                  are looking for and likely to use again.
                </span>
              </details>

              <details class="mb-4">
                <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                Why is my browser crashing?
                </summary>
                <span>
                If your web browser often crashes, stops working the way it used to,
                or you experience any problem viewing or navigating a website, 
                the browser may need to be reset to the default settings.
                </span>
              </details>

              <details class="mb-4">
                <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                Where can I purchase the product?
                </summary>
                <span>
                Please purchase the product at the same store where the coupon was added in order for the coupon to work. 
                </span>
              </details>

              
            </div>

            <div class="w-full lg:w-1/2 px-4 py-2">
              <details class="mb-4">
                <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                  Why should I fill the card survey?
                </summary>
                <span>
                 Survey is needed because with user specifying his preferences/needs or sharing his data, we will be able to understand their needs better.
                </span>
              </details>

              <details class="mb-4">
                <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                  How do I delete my account?
                </summary>
                <span>
                  To delete you account, you first need to login to your account. After you Sign-In, you need to click on your user profile,
                   which is represented by your username on the top right corner. You will, see a drop down menu once you click on profile.
                    From the menu select "Personal". This will redirect you to the page where you can delete your account.    
                </span>
              </details>

              <details class="mb-4">
                <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                  How do I search for a specific deal or coupon?
                </summary>
                <span class="px-4 py-2">
                  You can make use of our search engine to finding deals and coupons that you are looking for.
                </span>
              </details>
              
              <details class="mb-4">
                <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                  How do I link my cards to my profile ?
                </summary>
                <span>
                  Once you login to your account, you need to click on your user profile located at the top right corner of the page, and then
                  select "Card info" from the drop down menu. This will take you to the card management page, where you add and remove cards from your profile. 
                </span>
              </details>

              <details class="mb-4">
                <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                  How do I change my account password?
                </summary>
                <span>
                Once you login to your account, you need to click on your user profile located at the top right corner of the page, and then
                  select "Personal" from the drop down menu. This will take you to a page containing your profile information. There you will find 
                  an option to change your password.
                </span>
              </details>

              <details class="mb-4">
                <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                What's the Difference Between a Deal and a Coupon? 
                </summary>
                <span>
                A deal is a discounted price on a product or subset of products, while a coupon is either a code or a printable voucher, which is required to be submitted or surrendered at the time of purchase.
                </span>
              </details>
            </div>
          </div>
        </div>
      </section>
     
    </div>
    );
  };
  
  export default Faq;