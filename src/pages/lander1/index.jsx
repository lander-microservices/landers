import React, { useEffect } from "react";
import HEADER_IMAGE from "./header-image-2.jpg";
import "./index.scss";

export default function Lander1({ number, init, callClickCb, voluumUrl }) {
  //   const init = () => {
  //     REDIRECT_AND_STORAGE_KEYS.forEach((obj) => {
  //       storeRgbaData(obj.ringbaKey, search.get(obj.redirectString));
  //     });
  //   };

  const handleCallEventClick = callClickCb;
  //   () =>
  //     window.fbcFunc("track", "Contact", {
  //       eventID: eventID,
  //     });

  useEffect(() => {
    init();
  }, []);
  return (
    <>
    <div className="lander-hero-section bg-skyblue">
      <div className="container">
        <div className="row">
          <div className="lander-hero-content col">
              <h1 className="heading text-align-center">
                Up To <strong className="bg-red white">$5,100/Year</strong> Grocery + Rent Allowance Could be Yours with Incredible New Medicare Plan
              </h1>
              <div className="headerimg">
                <img src={HEADER_IMAGE} alt="HEADER_IMAGE" />
              </div>
          </div>
        </div>
      </div>
    </div>
    <div className="lander-content-section bg-skyblue">
      <div className="container">
        <div className="row">
          <div className="lander-content col">
            <p><strong>This Medicare benefit could give you up to $5,100 to spend on groceries each year!</strong></p>
            <p>Is inflation making checkout at the grocery store a struggle?</p>
            <p>The <strong>Healthy Grocery Allowance,</strong>{" "} recently approved for people with Medicare Advantage plans, could give you up to $5,100/year to spend on the foods you need.</p>
            <p>With costs at the store rapidly increasing, you can't afford to miss out on this opportunity.</p>
            <p>You may also qualify for over-the-counter medicine allowances, free meal deliveries, free rides to doctors appointments, and more!</p>
            <p>Checking your eligibility is free, easy, and completely confidential. Our agents are standing by, ready to help you get the benefits you deserve!</p>
            <p className="highlight-box bg-yellow black"> A Hotline opened to help Americans check if they qualify. The phone number is:{" "} <a href="#" className="strong red">(888) 305-2015.</a></p>
            <p>The average wait time to talk with one of our agents is about <span className="strong"> 2-3 minutes,</span> so the Grocery Allowance benefit is getting a lot of people to call.</p>
            <p>When up to $5,100 per year is available, it makes sense that it's so popular. You could also qualify for free rides to doctor's appointments, drugstore allowances, free meal deliveries, and even more! Our free, private, and confidential hotline number is{" "} <a href="#" className="strong">(888) 305-2015 </a>"Give us a call to see if you qualify!"</p>
          </div>
        </div>
      </div>
    </div>
    <div className="lander-cta-section bg-skyblue">
      <div className="container">
        <div className="row">
          <div className="lander-cta-content col">
            <h2>Check your Eligibility with these 3 Quick Steps:</h2>
            <div className="lander-steps">
              <p><strong>Step 1: </strong> Click the corresponding box below to mark your age, or click "Maximize My Medicare Benefits"</p>
              <p><strong>Step 2:</strong> Fill out a short question form to see your available options (or call our number to immediately speak with one of our Professional Agents).</p>
              <p><strong>Step 3:</strong> Your new Medicare benefits are all yours!</p>
            </div>
          </div>
          <div className="cta-button-list col">
              <a className="btn white bg-blue">Below 64</a>
              <a className="btn white bg-blue">65 - 70</a>
              <a className="btn white bg-blue">71 - 75</a>
              <a className="btn white bg-blue">76 - 80</a>
              <a className="btn white bg-blue">81 - 85</a>
              <a className="btn white bg-blue">86+</a>
          </div>
          <div className="cta-main-button col">
            <a href="#" className="btn white bg-red">Maximize my Medicare Benefits</a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
