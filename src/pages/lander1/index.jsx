import React from "react";
import Quiz from "./Quiz";
import "./index.scss";

function LanderParagraphSection({ content_block, getRichText }) {
  return (
    <div
      className={`lander-paragraph ${content_block.lander_paragraph_text_color} ${content_block.lander_paragraph_bg_color}`}
      style={{ padding: content_block.lander_paragraph_text_padding + "rem" }}
      dangerouslySetInnerHTML={{
        __html: getRichText(content_block.lander_paragraph_text),
      }}
    ></div>
  );
}

function LanderCtaSection({ content_block, getRichText }) {
  return (
    <div className="cta-button-list col">
      {(content_block.lander_cta_blocks || []).map((i) => (
        <a
          href={i.lander_cta_link.url}
          style={{ width: i.lander_cta_size }}
          className={`btn ${
            i.lander_cta_color ? i.lander_cta_color : "white"
          } ${i.lander_cta_bg_color ? i.lander_cta_bg_color : "bg-blue"}`}
        >
          {i.lander_cta_text}
        </a>
      ))}
    </div>
  );
}

export default function Lander1({
  lander_paragraph,
  lander_hero_section,
  init,
  callClickCb,
  voluumUrl,
  getRichText,
}) {
  const addColorToRichText = (html) => {
    const newStr = html.replaceAll(
      "<b>",
      `<b class="${lander_hero_section.lander_hero_section_headline_highlight_color} ${lander_hero_section.lander_hero_section_headline_highlight_bg_color}">`
    );
    return newStr;
  };

  const getParagraphComponent = (content) => {
    switch (content.component) {
      case "lander_paragraph_section":
        return (
          <LanderParagraphSection
            getRichText={getRichText}
            content_block={content}
          />
        );
      case "lander_cta_section":
        return (
          <LanderCtaSection content_block={content} getRichText={getRichText} />
        );
    }
  };

  const { lander_paragraph_holder } = lander_paragraph;
  return (
    <>
      <div className="lander-hero-section bg-skyblue">
        <div className="container">
          <div className="row">
            <div className="lander-hero-content col">
              <div
                className={`heading text-align-center ${lander_hero_section.lander_hero_section_headline_color}`}
                dangerouslySetInnerHTML={{
                  __html: addColorToRichText(
                    getRichText(
                      lander_hero_section.lander_hero_section_headline
                    )
                  ),
                }}
              ></div>
              {lander_hero_section.lander_hero_section_image &&
              lander_hero_section.lander_hero_section_image.filename ? (
                <div className="headerimg">
                  <img
                    src={lander_hero_section.lander_hero_section_image.filename}
                    alt="HEADER_IMAGE"
                  />
                </div>
              ) : undefined}
            </div>
          </div>
        </div>
      </div>

      {/* {(lander_paragraph_holder || []).map((i) => getParagraphComponent(i))} */}

      <div className="lander-content-section bg-skyblue">
        <div className="container">
          <div className="row">
            <div className="lander-content col">
              {lander_paragraph_holder
                .filter(
                  (i) =>
                    i.component !== "lander_cta_section" &&
                    i.component !== "quiz_holder_section"
                )
                .map((i) => getParagraphComponent(i))}
            </div>
          </div>
        </div>
      </div>
      <div className="lander-cta-section bg-skyblue">
        <div className="container">
          <div className="row">
            {lander_paragraph_holder
              .filter((i) => i.component == "lander_cta_section")
              .map((i) => getParagraphComponent(i))}
          </div>
        </div>
      </div>

      {/* Quiz */}
      <div className="lander-cta-section bg-skyblue">
        <div className="container">
          <div className="row">
            {lander_paragraph_holder
              .filter((i) => i.component == "quiz_holder_section")
              .map((i) => (
                <Quiz content_block={i} />
              ))}
          </div>
        </div>
      </div>
      {/* Quiz */}
    </>
  );
}
