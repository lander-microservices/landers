import React, { useEffect } from "react";
import HEADER_IMAGE from "./header-image-2.jpg"
import './index.scss'

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
        <div className="section2">
          <div className="container">
            <div className="row">
              <div className="section2head">
                <input
                  type="hidden"
                  name="click_id_store"
                  id="click_id_store"
                />
                <h1 className="title-h1">
                  Up To <span>$5,100/Year</span> Grocery + Rent Allowance Could
                  be Yours with Incredible New Medicare Plan
                </h1>
              </div>
              <div className="section2content">
                <figure>
                  <img src={HEADER_IMAGE} alt="" />
                </figure>
                <p>
                  <strong>
                    This Medicare benefit could give you up to $5,100 to spend
                    on groceries each year!
                  </strong>
                </p>
                <p>
                  Is inflation making checkout at the grocery store a struggle?
                </p>
                <p>
                  The <strong>Healthy Grocery Allowance</strong>, recently
                  approved for people with Medicare Advantage plans, could give
                  you up to $5,100/year to spend on the foods you need.
                </p>
                <p>
                  With costs at the store rapidly increasing, you can't afford
                  to miss out on this opportunity.
                </p>
                <p>
                  You may also qualify for over-the-counter medicine allowances,
                  free meal deliveries, free rides to doctors appointments, and
                  more!
                </p>
                <p>
                  Checking your eligibility is free, easy, and completely
                  confidential. Our agents are standing by, ready to help you
                  get the benefits you deserve!
                </p>
                <div className="yellowbox">
                  <p>
                    A Hotline opened to help Americans check if they qualify.
                    The phone number is:{" "}
                    <a
                      href={`tel:${number}`}
                      id="prelander_call"
                      onClick={handleCallEventClick}
                      className="callnow"
                    >
                      <span className="display-number">{number}</span>
                    </a>
                    .
                  </p>
                </div>
                <p>
                  The average wait time to talk with one of our agents is about{" "}
                  <strong>2-3 minutes</strong>, so the Grocery Allowance benefit
                  is getting a lot of people to call.
                </p>
                <p>
                  When up to $5,100 per year is available, it makes sense that
                  it's so popular. You could also qualify for free rides to
                  doctor's appointments, drugstore allowances, free meal
                  deliveries, and even more! Our free, private, and confidential
                  hotline number is{" "}
                  <a
                    href={`tel:${number}`}
                    id="prelander_call"
                    className="callnow"
                    onClick={handleCallEventClick}
                  >
                    <span className="display-number">{number}</span>
                  </a>{" "}
                  "Give us a call to see if you qualify!"
                </p>
                <h2 className="title-h1">
                  Check your Eligibility with these 3 Quick Steps:
                </h2>
                <ul className="adv-list">
                  <li>
                    <strong>Step 1: </strong> Click the corresponding box below
                    to mark your age, or click "Maximize My Medicare Benefits"
                  </li>
                  <li>
                    <strong>Step 2:</strong> Fill out a short question form to
                    see your available options (or call our number to
                    immediately speak with one of our Professional Agents).
                  </li>
                  <li>
                    <strong>Step 3:</strong> Your new Medicare benefits are all
                    yours!
                  </li>
                </ul>
              </div>
              <div className="section2bottom">
                <div className="linkbox">
                  <ul className="agegroup">
                    <li>
                      <a
                        href={voluumUrl}
                        id="landerclick"
                      >
                        Below 64
                      </a>
                    </li>
                    <li>
                      <a
                        href={voluumUrl}
                        id="landerclick"
                      >
                        65 - 70
                      </a>
                    </li>
                    <li>
                      <a
                        href={voluumUrl}
                        id="landerclick"
                      >
                        71 - 75
                      </a>
                    </li>
                    <li>
                      <a
                        href={voluumUrl}
                        id="landerclick"
                      >
                        76 - 80
                      </a>
                    </li>
                    <li>
                      <a
                        href={voluumUrl}
                        id="landerclick"
                      >
                        81 - 85
                      </a>
                    </li>
                    <li>
                      <a
                        href={voluumUrl}
                        id="landerclick"
                      >
                        86+
                      </a>
                    </li>
                  </ul>
                  <div className="link-href">
                    <a
                      href={voluumUrl}
                      id="landerclick"
                    >
                      Maximize my Medicare Benefits
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
