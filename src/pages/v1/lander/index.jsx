import Quiz from "./Quiz";
import React, { useEffect } from "react";
import "./index.scss";

function LanderParagraphSection({
  number,
  shortCodeReplacer,
  content_block,
  getRichText,
}) {
  return (
    <div
      className={`lander-paragraph ${content_block.lander_paragraph_text_color} ${content_block.lander_paragraph_bg_color}`}
      style={{ padding: content_block.lander_paragraph_text_padding + "rem" }}
      dangerouslySetInnerHTML={{
        __html: shortCodeReplacer(
          getRichText(content_block.lander_paragraph_text),
          { number }
        ),
      }}
    ></div>
  );
}

function LanderCtaSection({ content_block, getRichText }) {
  return (
    <div className="cta-button-list col">
      {(content_block.lander_cta_blocks || []).map((i, index) => (
        <a
          key={index}
          href={i.lander_cta_link.url}
          className={`btn ${i.lander_cta_size}  ${
            i.lander_cta_color ? i.lander_cta_color : "white"
          } ${i.lander_cta_bg_color ? i.lander_cta_bg_color : "bg-blue"}`}
        >
          {i.lander_cta_text}
        </a>
      ))}
    </div>
  );
}

export default function Lander({
  lander_paragraph,
  lander_hero_section,
  stateCityResponse,
  getRichText,
  lander_bg_color,
  number,
  PropagateLoader,
  lander_show_cta_section,
  lander_show_quiz_section,
  shortCodeReplacer,
  storeRgbaData,
  handlePixelEventTrigger,
  RINGBA_STORAGE_KEYS,
}) {
  const addColorToRichText = (html) => {
    const newStr = html.replaceAll(
      "<b>",
      `<b class="${lander_hero_section.lander_hero_section_headline_highlight_color} ${lander_hero_section.lander_hero_section_headline_highlight_bg_color}">`
    );
    return newStr;
  };

  const getParagraphComponent = (content, index) => {
    switch (content.component) {
      case "lander_paragraph_section":
        return (
          <LanderParagraphSection
            number={number}
            shortCodeReplacer={shortCodeReplacer}
            key={index + "" + Math.random()}
            getRichText={getRichText}
            content_block={content}
          />
        );
      case "lander_cta_section":
        return (
          <LanderCtaSection
            key={index}
            number={number}
            content_block={content}
            getRichText={getRichText}
          />
        );
    }
  };

  const { lander_paragraph_holder } = lander_paragraph;

  console.log("lander_hero_section", lander_hero_section);
  return (
    <>
      <div
        className={`lander-hero-section ${
          lander_bg_color && lander_bg_color.length
            ? lander_bg_color
            : "bg-skyblue"
        }`}
      >
        <div className="container">
          <div className="row">
            <div className="lander-hero-content col">
              <div
                style={{
                  marginTop:
                    lander_hero_section.lander_hero_section_headline_margin_top +
                    "rem",
                  marginBottom:
                    lander_hero_section.lander_hero_section_headline_margin_bottom +
                    "rem",
                }}
                className={`heading ${
                  lander_hero_section.lander_hero_section_headline_alignment &&
                  lander_hero_section.lander_hero_section_headline_alignment
                    .length
                    ? lander_hero_section.lander_hero_section_headline_alignment
                    : "text-align-center"
                } ${lander_hero_section.lander_hero_section_headline_color}`}
                dangerouslySetInnerHTML={{
                  __html: shortCodeReplacer(
                    addColorToRichText(
                      getRichText(
                        lander_hero_section.lander_hero_section_headline
                      )
                    ),
                    {
                      number,
                      state: stateCityResponse.state,
                      city: stateCityResponse.city,
                    }
                  ),
                }}
              ></div>

              {lander_hero_section.lander_hero_section_image &&
              lander_hero_section.lander_hero_section_image.filename ? (
                <div
                  className={`headerimg ${
                    lander_hero_section.lander_hero_section_image_alignment &&
                    lander_hero_section.lander_hero_section_image_alignment
                      .length
                      ? lander_hero_section.lander_hero_section_image_alignment
                      : "text-align-center"
                  }`}
                >
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

      <div
        className={`lander-content-section ${
          lander_bg_color && lander_bg_color.length
            ? lander_bg_color
            : "bg-skyblue"
        }`}
      >
        <div className="container">
          <div className="row">
            <div className="lander-content col">
              {lander_paragraph_holder
                .filter(
                  (i) =>
                    i.component !== "lander_cta_section" &&
                    i.component !== "quiz_holder_section"
                )
                .map((i, index) => getParagraphComponent(i, index))}
            </div>
          </div>
        </div>
      </div>

      {lander_show_cta_section.toLowerCase() === "yes" ? (
        <div
          className={`lander-cta-section ${
            lander_bg_color && lander_bg_color.length
              ? lander_bg_color
              : "bg-skyblue"
          }`}
        >
          <div className="container">
            <div className="row">
              {lander_paragraph_holder
                .filter((i) => i.component == "lander_cta_section")
                .map((i, index) => getParagraphComponent(i, index))}
            </div>
          </div>
        </div>
      ) : undefined}

      {/* Quiz */}
      {lander_show_quiz_section.toLowerCase() === "yes" ? (
        <div
          className={`lander-cta-section ${
            lander_bg_color && lander_bg_color.length
              ? lander_bg_color
              : "bg-skyblue"
          }`}
        >
          <div className="container">
            <div className="row">
              {lander_paragraph_holder
                .filter((i) => i.component == "quiz_holder_section")
                .map((i, index) => (
                  <Quiz
                    content_block={i}
                    key={index}
                    handlePixelEventTrigger={handlePixelEventTrigger}
                    getRichText={getRichText}
                    RINGBA_STORAGE_KEYS={RINGBA_STORAGE_KEYS}
                    storeRgbaData={storeRgbaData}
                    PropagateLoader={PropagateLoader}
                    number={number}
                  />
                ))}
            </div>
          </div>
        </div>
      ) : undefined}
      {/* Quiz */}
    </>
  );
}
