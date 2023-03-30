import React, { useEffect, useState } from "react";
import ZipCodeForm from "./ZipCodeForm";
import "./quiz.scss";


//  option question
function QuestionTypeOptionRender({ content_block, addAnswer, fieldName }) {
  return (
    <div>
      {content_block.map((question_block, index) => (
        <div key={index}>
          <div>
            <h1>{question_block.question_option_headline}</h1>
          </div>
          <div>
            {question_block.question_options_holder.map((options, index) => (
              <button key={index} onClick={() => addAnswer(options.question_option_value)}>
                <p>{options.question_option_name}</p>
              </button>
            ))}
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
    <div>
      <p>{texts[currentIndex]}</p>
    </div>
  );
}

function DisQualified() {
  return (
    <div>
      <div>
        <h1>Sorry, we can't help you.</h1>
        <p>
          The questions you answered have helped us determine that we are not
          able to help you at this time.
        </p>
      </div>
    </div>
  );
}

function Qualifyed() {
  return (
    <div>
      <div>
        <h1>Qualified</h1>
      </div>
    </div>
  );
}

export default function Quiz({ content_block }) {
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
    <div className="quiz">
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
        <ZipCodeForm addAnswer={addAnswer} />
      ) : undefined}

      {isSubmitLoaderVisible ? (
        <QuestionSubmitLoader changeSubmitLoader={changeSubmitLoader} />
      ) : undefined}

      {showQualifyDisqualify && checkEligibility() === true ? (
        <Qualifyed />
      ) : undefined}

      {showQualifyDisqualify && checkEligibility() === false ? (
        <DisQualified />
      ) : undefined}
    </div>
  );
}
