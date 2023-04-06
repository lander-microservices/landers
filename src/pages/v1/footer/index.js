import React, { useEffect } from "react";
import "./index.scss";

const FooterMenuLink = ({
  url,
  footer_nav_name,
  lander_footer_menu_color,
  index,
}) => {
  return (
    <li className="font-13">
      <a
        className={`${
          lander_footer_menu_color && lander_footer_menu_color.length
            ? lander_footer_menu_color
            : "lightgray"
        }`}
        target="_blank"
        href={url}
      >
        {footer_nav_name}
      </a>
    </li>
  );
};

export default function Footer({
  dis,
  Disclaimer,
  eventID,
  content_block,
  lander_logo_text_color,
  tikTokEvent,
  fbcFunc,
  lander_logo_text,
}) {
  const {
    lander_footer_copyright_url,
    lander_footer_bg_color,
    lander_footer_menu,
    lander_footer_disclaimer_color,
    lander_footer_menu_color,
  } = content_block;

  const getFooterMenu = (component, obj, index) => {
    if (component === "footer_menu_link") {
      return (
        <FooterMenuLink
          key={obj.footer_nav_name + index}
          url={obj.footer_nav.url}
          lander_footer_menu_color={lander_footer_menu_color}
          footer_nav_name={obj.footer_nav_name}
        />
      );
    }
  };
  return (
    <>
      <footer
        className={`footer lightgray ${
          lander_footer_bg_color && lander_footer_bg_color.length
            ? lander_footer_bg_color
            : "bg-white"
        }`}
      >
        <div className="container">
          <div className="row">
            <div className="logoholder col">
              <div className="logo blue">
                <img
                  src="data:image/png;base64,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"
                  alt="logo"
                />
                <div className="sitename">
                  <h1
                    className={`${
                      lander_logo_text_color && lander_logo_text_color.length
                        ? lander_logo_text_color
                        : "blue"
                    }`}
                  >
                    {lander_logo_text}
                  </h1>
                  <h2 className="blue">a non-government aca site</h2>
                </div>
              </div>
              <hr className="horizontal" />
            </div>
            <div className={`discalimer col ${lander_footer_disclaimer_color}`}>
              <small>
                <div dangerouslySetInnerHTML={{ __html: dis }}></div>
              </small>
            </div>
            <div className="footer-links color-dark-grey col">
              <div className="copyright">
                <div className="font-13 lightgray">
                  Copyright {lander_footer_copyright_url}
                </div>
              </div>
              <div className="policylink">
                <ul>
                  {(lander_footer_menu || []).map((i, index) =>
                    getFooterMenu(i.component, i, index)
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <AddEventId
        tikTokEvent={tikTokEvent}
        fbcFunc={fbcFunc}
        eventID={eventID}
      />
    </>
  );
}

function AddEventId({ eventID, fbcFunc, tikTokEvent}) {
  const viewContentKey = "PageView";
  const viewContentKey2= "PageView2";

  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);


  useEffect(() => {
    const interval = setInterval(() => {
      if (window.fbcFunc && !sessionStorage.getItem(viewContentKey)) {
        window.fbcFunc("track", "PageView", { eventID: eventID });
        sessionStorage.setItem(viewContentKey, "true");
      }

      if ( window.tikTokEvent &&
        params.get("utm_source") === "tiktok" &&
        !sessionStorage.getItem(viewContentKey2)
      ) {
        window.tikTokEvent.track("ViewContent", {}, { eventID: eventID });
        sessionStorage.setItem(viewContentKey2, "true");
      }
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
    }, 20000);

    return () => clearInterval(interval);
  }, []);
  return <></>;
}
