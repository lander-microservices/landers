import React, { useEffect } from "react";
import HEADER_IMAGE from "./header-image-2.jpg"
import ADVANTAGE_IMAGE from "./advantage.jpg";

export default function Landing2({ number, init, callClickCb, voluumUrl }) {
    const handleCallEventClick = () => callClickCb
    useEffect(() => {
        init();
    }, [])
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
                                    Huge <span>Up To $5,100 OTC</span> Spending Allowance Could Be Yours
                                </h1>
                            </div>
                            <div className="section2content">
                                <figure>
                                    <img src={HEADER_IMAGE} alt="" />
                                </figure>
                                <p><strong>People on Medicare are rushing to get their hands on the "OTC Spending Allowance", a new, popular benefit for those on Part C plans!</strong></p>
                                <p><strong>Listen up:</strong> Just recently approved, the "OTC Spending Allowance" offers fantastic allowances for <strong>Pharmacy purchases and healthy groceries.</strong></p>
                                <p>Grab this benefit if you want to save money when buying: <strong>Bread, Milk products, Fruits & Vegetables, Meat, Vitamins, Medication, and More.</strong></p>
                                <div className="yellowbox">
                                    <p>Checking availability is simple with the hotline:{" "}
                                        <a
                                            href={`tel:${number}`}
                                            id="prelander_call"
                                            className="callnow"
                                            onClick={handleCallEventClick}
                                        >
                                            <span className="display-number">{number}</span>
                                        </a>{" "}.</p>
                                </div>
                                <p>But it doesn't stop there! Some other benefits include allowance and assistance for things like:</p>
                                <ul>
                                    <li><strong>Utility Bills Assistance:</strong> Aid for paying off household utility fees (Energy, Water, Internet)</li>
                                    <li><strong>Dental & Hearing Allowances:</strong> Aid paying for dental & hearing care</li>
                                    <li><strong>Rent Assistance:</strong> Aid for paying your rent or mortgage</li>
                                </ul>
                                <p>With the cost of living rising across the board, can you afford to miss out on these allowances and opportunities?</p>
                                <p> Check the hotline number {" "}
                                    <a
                                        href={`tel:${number}`}
                                        id="prelander_call"
                                        className="callnow"
                                        onClick={handleCallEventClick}
                                    >
                                        <span className="display-number">{number}</span>
                                    </a>{" "}
                                    and find out what you qualify for. It's risk-free, and totally private and confidential.</p>
                                <p>The average wait time to talk with one of our agents is about <strong>2-3 minutes</strong>, so the Grocery Allowance benefit is getting a lot of people to call.</p>
                                <h2 className="title-h1">Check your Eligibility with these 3 Quick Steps:</h2>
                                <figure>
                                    <img src={ADVANTAGE_IMAGE} alt="" />
                                </figure>
                                <ul className="adv-list">
                                    <li>
                                        <strong>Step 1: </strong>Click "Maximize my Medicare Benefits" OR tap to immediately call.
                                    </li>
                                    <li>
                                        <strong>Step 2: </strong>Fill out a few simple questions and see your options.
                                    </li>
                                    <li>
                                        <strong>Step 3: </strong>Make the most of your new, free benefits!
                                    </li>
                                </ul>
                            </div>
                            <div className="section2bottom">
                                <div className="linkbox">
                                    <ul className="agegroup">
                                        <li><a href={voluumUrl} id="landerclick">Below 64</a></li>
                                        <li><a href={voluumUrl} id="landerclick">65 - 70</a></li>
                                        <li><a href={voluumUrl} id="landerclick">71 - 75</a></li>
                                        <li><a href={voluumUrl} id="landerclick">76 - 80</a></li>
                                        <li><a href={voluumUrl} id="landerclick">81 - 85</a></li>
                                        <li><a href={voluumUrl} id="landerclick">86+</a></li>
                                    </ul>
                                    <div className="link-href">
                                        <a href={voluumUrl} id="landerclick">Maximize my Medicare Benefits</a>
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
