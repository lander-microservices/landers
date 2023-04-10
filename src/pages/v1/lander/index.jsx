import Quiz from "./Quiz";
import React from "react";
import "./index.scss";

function LanderParagraphSection({ number,shortCodeReplacer, content_block, getRichText }) {
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
  init,
  callClickCb,
  voluumUrl,
  getRichText,
  lander_bg_color,
  number,
  PropagateLoader,
  lander_show_cta_section,
  lander_show_quiz_section,
  shortCodeReplacer
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
