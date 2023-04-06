import React, { useEffect, useState, useRef } from "react";
import ZipCodeForm from "./ZipCodeForm";
import "./quiz.scss";

//  option question
function QuestionTypeOptionRender({ content_block, addAnswer, fieldName }) {
  return (
    <div className="question_container">
      {content_block.map((question_block, index) => (
        <div className="questions" key={index}>
          <div className="question_headline">
            <h2>{question_block.question_option_headline}</h2>
          </div>
          <div className="question_holder">
            <div className="question_options">
              {question_block.question_options_holder.map((options, index) => (
                <button
                  key={index}
                  onClick={() => addAnswer(options.question_option_value)}
                  className="white bg-red"
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
        <p class="greatnews">
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

function Qualifyed({ number }) {
  return (
    <div className="qualifyed">
      <div className="greatnews">
        <h5>Congratulations!</h5>
        <p>
          You Pre-Qualify for Advanced Premium Credits{" "}
          <span className="red"> Advanced Premium Credits </span>
          in your area up to $1400 a month
        </p>
        <p>
          Your spot is being held. To get started click the button below to
          speak to a expert.
        </p>
        <a href={`tel:${number}`}>{number}</a>
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

export default function Quiz({ content_block, number, PropagateLoader }) {
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

  useEffect(() => {}, []);

  const questionObj = findQuestion(questionId);

  const submitBooleans = !showQualifyDisqualify && !isSubmitLoaderVisible;
  return (
    <div className="quiz col">
      {submitBooleans &&
      questionObj &&
      content_block.quiz_holder_section_zipcode_question_number !==
        questionId ? (
        <QuestionTypeOptionRender
          key={Math.random()}
          addAnswer={addAnswer}
          content_block={questionObj.question_option}
        />
      ) : undefined}

      {submitBooleans &&
      content_block.quiz_holder_section_zipcode === "yes" &&
      content_block.quiz_holder_section_zipcode_question_number ===
        questionId ? (
        <ZipCodeForm addAnswer={addAnswer} PropagateLoader={PropagateLoader} />
      ) : undefined}

      {isSubmitLoaderVisible ? (
        <QuestionSubmitLoader changeSubmitLoader={changeSubmitLoader} />
      ) : undefined}

      {showQualifyDisqualify && checkEligibility() === true ? (
        <Qualifyed number={number} />
      ) : undefined}

      {showQualifyDisqualify && checkEligibility() === false ? (
        <DisQualified number={number} />
      ) : undefined}
    </div>
  );
}
