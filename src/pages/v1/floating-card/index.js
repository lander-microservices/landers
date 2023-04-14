import React from "react";
import { useEffect } from "react";
import $ from "jquery";
import "./index.scss"
import ChristieImage from "./christie.png";
import Kathryn from "./kathryn.png";
import Nancy from './nancy.png'
import Nikki from './nikki.png'
import Richard from "./richard.png"

export default function FloatingCard() {
  useEffect(() => {
    $(document).ready(function () {
      $(function () {
        var locations = [
          "Kane, PA",
          "Detroit,	MI",
          "Norfolk, VA",
          "Sturgis, MI",
          "Kissimmee, FL",
          "Dallas, TX",
          "Dover, DE",
          "Hilliard, OH",
          "Tyler, TX",
          "Largo, FL",
          "Clinton, TN",
          "El Paso, TX",
          "Crockett, TX",
          "Hutchinson, KS",
          "Mankato, MN",
          "Sparks, NV",
          "Nashua, NH",
          "Milbank, SD",
          "Wichita, KS",
          "Cape Coral, FL",
          "Lorain, OH",
          "Eagle Pass, TX",
          "Minneapolis, MN",
          "Biddeford, ME",
          "Merced, CA",
          "New Orleans, LA",
          "Oakland, CA",
          "Bay City, TX",
          "Longview, TX",
          "Arkansas City, KS",
          "Neosho, MO",
          "Bells, TN",
          "Polson, MT",
          "Wasilla, AK",
          "Dale, TX",
          "Deltona, FL",
          "Gainesville, FL",
          "Oroville, CA",
          "Reserve, LA",
          "Waipahu, HI",
          "Norfolk, VA",
          "Moss Point, MS",
          "Washington, DC",
          "Staunton, VA",
          "Front Royal, VA",
          "Tampa, FL",
          "San Pedro, CA",
          "Pasadena, CA",
          "Hillsville, VA",
          "Quantico, VA",
          "El Campo, TX",
          "Harvey, LA",
          "West Plains, MO",
          "Sonora, CA",
          "Denver, CO",
          "Hamilton, MS",
          "New Town, ND",
          "Ariton, AL",
          "Wolford, VA",
          "Ballinger, TX",
          "Elmendorf, TX",
          "Topeka, KS",
          "Salem, OR",
          "Portsmouth, VA",
          "Saint Paul, MN",
          "Stockdale, TX",
          "Petersburg, VA",
          "Wylie, TX",
          "Houston, TX",
          "Eau Claire, WI",
          "Knoxville, TN",
          "Auburn, IL",
          "Houma, LA",
          "Topeka, KS",
          "Mitchell, SD",
          "Silsbee, TX",
          "Fort Worth, TX",
          "Niota, TN",
          "Ravenna, OH",
          "Porter, TX",
          "Katy, TX",
          "Chicago, IL",
          "Berne, IN",
          "Wichita, KS",
          "Los Angeles, CA",
          "Hondo, NM",
          "Chefornak, AK",
          "Akron, OH",
          "Victorville, CA",
          "Arabi, LA",
          "Suring, WI",
        ];
        const medicare = [];
        const aca = [
          {
            name: "Velia E. Dunn",
            amount: "500",
            image: ChristieImage
          },
          {
            name: "Mary T. Pritts",
            amount: "500",
            image: Kathryn
          },
          {
            name: "Wanda D. Petersen",
            amount: "500",
            image: Nancy,
          },
          {
            name: "Paul N. Parsons",
            amount: "500",
            image: Nikki,
          },
          {
            name: "Peter M. Galles",
            amount: "500",
            image: Richard,
          },
        ];

        const getData = () =>{
          const vertical = window.domain_settings.vertical;
          return aca
        }

        var products = getData();
        getProduct();
        getLocation();
        getTime();
        function getProduct() {
          var num = Math.floor(Math.random() * products.length);
          $(".user_name").text(products[num].name);
          $(".product_image").attr("src", products[num].image);
          $(".amount").text(products[num].amount);
        }
        function getLocation() {
          var num = Math.floor(Math.random() * locations.length);
          $(".location").text(locations[num]);
        }
        function getTime() {
          var type = ["seconds", "minutes"];
          var typeNo = Math.floor(Math.random() * type.length);
          var time = Math.round(Math.random() * 60) + 1;
          $(".number").text(time);
          $(".type").text(type[typeNo]);
        }
        (function loop() {
          var rand = Math.round(Math.random() * 5000) + 8000;
          setTimeout(function () {
            changeNotification();
            loop();
          }, rand);
        })();
        function changeNotification() {
          showNotification();
          setTimeout(function () {
            hideNotification();
          }, 6000);
        }
        function showNotification() {
          $("#fomo").addClass("is-visible");
        }
        function hideNotification() {
          $("#fomo").removeClass("is-visible");
          setTimeout(function () {
            getProduct();
            getLocation();
            getTime();
          }, 500);
        }
      });
    });
  }, []);
  return (
    <>
      <div id="fomo">
        <img src="" className="product_image" />
        <div className="wrapper">
          <div className="buyer">
            <span className="user_name"></span> from{" "}
            <span className="location"></span> Qualified For $
            <span className="amount"></span> Allowance Card.
          </div>
          <div className="time">
            <span className="number"></span>
            <span className="type"></span> ago
          </div>
        </div>
      </div>
    </>
  );
}
