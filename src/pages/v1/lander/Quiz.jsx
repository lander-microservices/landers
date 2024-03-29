import React, { useEffect, useState, useRef } from "react";
import ZipCodeForm from "./ZipCodeForm";
import "./quiz.scss";
import { useRingba } from "wecall-config-lib";

//  option question
function QuestionTypeOptionRender({
  content_block,
  addAnswer,
  fieldName,
  question_headline_color,
  question_options_bg_color,
  question_options_color,
}) {
  const { storeRgbaData } = useRingba();
  const saveData = (key, value) => {
    storeRgbaData(key, value);
    localStorage.setItem(key, value);
  };
  return (
    <div className="question_container">
      {content_block.map((question_block, index) => (
        <div className="questions" key={index + "P"}>
          <div className={`question_headline ${question_headline_color}`}>
            <h2>{question_block.question_option_headline}</h2>
          </div>
          <div className="question_holder">
            <div className="question_options">
              {question_block.question_options_holder.map((options, index) => (
                <button
                  key={index + "I"}
                  onClick={() => {
                    addAnswer(options.question_option_value);
                    saveData(
                      question_block.question_key_name,
                      options.question_option_value
                    );
                  }}
                  className={`${
                    question_options_bg_color &&
                    question_options_bg_color.length
                      ? question_options_bg_color
                      : "bg-red"
                  } ${
                    question_options_color && question_options_color.length
                      ? question_options_color
                      : "white"
                  }`}
                >
                  <p>{options.question_option_name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Loader Text
function QuestionSubmitLoader({ changeSubmitLoader }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const texts = [
    "Reviewing your answers",
    "Searching your state coverage",
    "Confirming eligibility",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 1000);
    const timeout = setTimeout(() => {
      changeSubmitLoader();
      clearInterval(interval);
    }, 1000 * texts.length);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="loading">
      <h4>{texts[currentIndex]}</h4>
    </div>
  );
}

function DisQualified() {
  return (
    <div className="disqualified">
      <div>
        <p className="greatnews">
          <strong>Sorry, we can't help you.</strong>
        </p>
        <p>
          The questions you answered have helped us determine that we are not
          able to help you at this time.
        </p>
      </div>
    </div>
  );
}

function Qualifyed({ handlePixelEventTrigger, number, creteria, getRichText }) {
  const { storeRgbaData, callTriggered } = useRingba();
  
  useEffect(()=>{
    callTriggered();
  },[])
  return (
    <div className="qualifyed">
      <div className="greatnews">
        {creteria.map((creteria_block, index) => (
          <div
            key={index}
            dangerouslySetInnerHTML={{
              __html: getRichText(
                creteria_block.questions_qualification_congrats_message
              ),
            }}
          ></div>
        ))}
        <a
          onClick={() => {
            callTriggered();
            handlePixelEventTrigger("Contact");
          }}
          href={`tel:${number}`}
          className="quiz-navbar-btn"
        >
          {number}
        </a>
        <h3>
          Your spot is being held for <Timer />
        </h3>
      </div>
    </div>
  );
}

const Timer = () => {
  const Ref = useRef(null);
  const [timer, setTimer] = useState("00:00");

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    // const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    setTimer("00:10");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 290);
    return deadline;
  };
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);
  const onClickReset = () => {
    clearTimer(getDeadTime());
  };

  return <span>{timer}</span>;
};

export default function Quiz({
  handlePixelEventTrigger,
  getRichText,
  content_block,
  number,
  PropagateLoader,
  RINGBA_STORAGE_KEYS,
}) {
  const { storeRgbaData } = useRingba();
  const [questionId, setQuestionId] = useState("1");
  const [answers, setAnswers] = useState([]);
  const [isSubmitLoaderVisible, setSubmitLoaderVisible] = useState(false);
  const [showQualifyDisqualify, setShowQualifyDisqualify] = useState(false);

  const findQuestion = (question_id) =>
    content_block.quiz_holder_questions.find(
      (i) => i.question_id === question_id
    );

  const findAnswersIndex = (questionId) =>
    answers.findIndex((i) => i.questionId === questionId);

  const findAnswers = (questionId) =>
    answers.find((i) => i.questionId === questionId);

  const addAnswer = (answer) => {
    setAnswers((prev) => {
      const answerIndex = findAnswersIndex(questionId);
      if (answerIndex !== -1) prev.slice(answerIndex, 1);
      return [
        ...prev,
        {
          questionId,
          answer,
        },
      ];
    });
    nextQuestion();
  };

  const showSubmitLoader = () => {
    setSubmitLoaderVisible(true);
  };

  const nextQuestion = () => {
    let highestQuestionId = "1";
    content_block.quiz_holder_questions.forEach((i) => {
      if (Number(highestQuestionId) < Number(i.question_id))
        highestQuestionId = i.question_id;
    });

    if (
      content_block.quiz_holder_section_zipcode === "yes" &&
      Number(content_block.quiz_holder_section_zipcode_question_number) >
        highestQuestionId
    ) {
      highestQuestionId =
        content_block.quiz_holder_section_zipcode_question_number;
    }

    if (Number(questionId) === Number(highestQuestionId)) {
      showSubmitLoader();
    } else {
      setQuestionId((prev) => {
        return String(Number(prev) + 1);
      });
    }
  };

  const changeSubmitLoader = () => {
    setSubmitLoaderVisible(false);
    setShowQualifyDisqualify(true);
  };

  const checkEligibility = () => {
    const criteria = content_block.quiz_holder_eligibility;

    let eligible = true;

    criteria.forEach((item) => {
      item.question_qualification_citeria_section.forEach((conditions) => {
        const answerObj = findAnswers(conditions.question_number);
        if (answerObj && answerObj.answer !== conditions.question_value)
          eligible = false;
      });
    });

    return eligible;
  };

  // const saveInitialData = () =>{
  //   content_block.quiz_holder_questions.forEach((i)=>{
  //     i.question_option.forEach((question)=> {
  //       storeRgbaData(question.question_key_name ,question.question_option_default_value)
  //     })
  //   })
  // }

  // useEffect(() => {
  //   saveInitialData()
  // }, []);

  const questionObj = findQuestion(questionId);

  const submitBooleans = !showQualifyDisqualify && !isSubmitLoaderVisible;
  return (
    <div
      className="quiz col"
      style={{
        paddingBottom: content_block.quiz_holder_margin_bottom + "rem",
        paddingTop: content_block.quiz_holder_margin_top + "rem",
      }}
    >
      {submitBooleans &&
      questionObj &&
      content_block.quiz_holder_section_zipcode_question_number !==
        questionId ? (
        <QuestionTypeOptionRender
          key={Math.random()}
          addAnswer={addAnswer}
          storeRgbaData={storeRgbaData}
          content_block={questionObj.question_option}
          question_options_color={content_block.question_options_text_color}
          question_headline_color={content_block.question_headline_color}
          question_options_bg_color={content_block.question_options_bg_color}
        />
      ) : undefined}

      {submitBooleans &&
      content_block.quiz_holder_section_zipcode === "yes" &&
      content_block.quiz_holder_section_zipcode_question_number ===
        questionId ? (
        <ZipCodeForm
          quiz_loader_color={content_block.quiz_loader_color}
          addAnswer={addAnswer}
          storeRgbaData={storeRgbaData}
          RINGBA_STORAGE_KEYS={RINGBA_STORAGE_KEYS}
          question_options_color={content_block.question_options_text_color}
          question_headline_color={content_block.question_headline_color}
          question_options_bg_color={content_block.question_options_bg_color}
          PropagateLoader={PropagateLoader}
        />
      ) : undefined}

      {isSubmitLoaderVisible ? (
        <QuestionSubmitLoader changeSubmitLoader={changeSubmitLoader} />
      ) : undefined}

      {showQualifyDisqualify && checkEligibility() === true ? (
        <Qualifyed
          handlePixelEventTrigger={handlePixelEventTrigger}
          getRichText={getRichText}
          number={number}
          creteria={content_block.quiz_holder_eligibility}
        />
      ) : undefined}

      {showQualifyDisqualify && checkEligibility() === false ? (
        <DisQualified number={number} />
      ) : undefined}
    </div>
  );
}
