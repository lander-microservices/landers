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
      <div className="main">
        <div className="container">
          <div className="row">
            <section className="section1">
              <div className="headingimg">
                <div className="heading1">
                  <h1 className="heading">
                    Up To <span className="span-1">$5,100/Year</span> Grocery +
                    Rent Allowance Could be Yours with Incredible New Medicare
                    Plan
                  </h1>
                </div>
                <div className="headerimg">
                  <img src={HEADER_IMAGE} alt="HEADER_IMAGE" />
                </div>
              </div>
            </section>
            <section className="section2">
              <div className="parent-para">
                <p className="child-para">
                  <span className="span-2">
                    This Medicare benefit could give you up to $5,100 to spend
                    on groceries each year!
                  </span>
                </p>

                <p className="child-para">
                  Is inflation making checkout at the grocery store a struggle?
                </p>
                <p className="child-para">
                  The <span className="span-2">Healthy Grocery Allowance,</span>{" "}
                  recently approved for people with Medicare Advantage plans,
                  could give you up to $5,100/year to spend on the foods you
                  need.
                </p>
                <p className="child-para">
                  With costs at the store rapidly increasing, you can't afford
                  to miss out on this opportunity.
                </p>
                <p className="child-para">
                  You may also qualify for over-the-counter medicine allowances,
                  free meal deliveries, free rides to doctors appointments, and
                  more!
                </p>
                <p className="child-para">
                  Checking your eligibility is free, easy, and completely
                  confidential. Our agents are standing by, ready to help you
                  get the benefits you deserve!
                </p>
                <p className="child-para-span-3">
                  A Hotline opened to help Americans check if they qualify. The
                  phone number is:{" "}
                  <span className="span-3">(888) 305-2015.</span>
                </p>
                <p className="child-para">
                  The average wait time to talk with one of our agents is about
                  <span className="span-2"> 2-3 minutes,</span> so the Grocery
                  Allowance benefit is getting a lot of people to call.
                </p>
                <p className="child-para">
                  When up to $5,100 per year is available, it makes sense that
                  it's so popular. You could also qualify for free rides to
                  doctor's appointments, drugstore allowances, free meal
                  deliveries, and even more! Our free, private, and confidential
                  hotline number is{" "}
                  <span className="span-4">(888) 305-2015 </span>"Give us a call
                  to see if you qualify!"
                </p>
              </div>
            </section>

            <section className="secion3">
              <div></div>
              <div className="btn-blues">
                <ul className="btn-blue-parent">
                  <li className="btn-blue-child">Below 64</li>
                  <li className="btn-blue-child">65 - 70</li>
                  <li className="btn-blue-child">71 - 75</li>
                  <li className="btn-blue-child">76 - 80</li>
                  <li className="btn-blue-child">81 - 85</li>
                  <li className="btn-blue-child">86+</li>
                </ul>
              </div>
              <div className="btn-red-parent">
                <div className="btn-red-child">
                  Get priority access to the medicare plans
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
