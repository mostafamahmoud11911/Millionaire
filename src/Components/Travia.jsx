import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";

export default function Travia({
  data,
  setStop,
  questionNumber,
  setQuestionNumber,
  test
}) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");

  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  function delay(duration, callback) {
    setTimeout(() => {
      callback();
    }, duration);
  }

  function handleAnswer(ans) {
    setSelectedAnswer(ans);
    setClassName("answer active");
    delay(3000, () =>
      setClassName(ans.correct ? "answer correct" : "answer wrong")
    );
    delay(5000, () => {
      if (ans.correct) {
        correctAnswer();
        delay(1000, () => {
          setQuestionNumber((questionNumber) => questionNumber + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          setStop(true);
        });
      }
    });
  }
  


  return (
    <div className="travia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((ques, index) => (
          <div
            key={index}
            className={selectedAnswer === ques ? className : "answer"}
            onClick={() => {handleAnswer(ques)}}
          >
            {ques.text}
          </div>
        ))}
      </div>
    </div>
  );
}
