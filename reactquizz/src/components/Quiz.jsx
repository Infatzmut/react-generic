import { useState, useCallback } from "react";
import questions from "../questions";
import Summary from "./Summary";
import Question from "./Question";
export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === questions.length;

  const handleSelectedAnswer = useCallback(function (selectedAnswer) {
    setUserAnswers((prevUserAnswer) => {
      return [...prevUserAnswer, selectedAnswer];
    });
  }, []);

  const handleSkipAnswer = useCallback(
    () => handleSelectedAnswer(null),
    [handleSelectedAnswer],
  );

  if (quizIsComplete) {
    return (
      <Summary userAnswers={userAnswers}/>
    );
  }

  return (
    <div id="quiz">
      <Question 
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        answerState={answerState}
        selectedAnswer={userAnswers[userAnswers.length - 1]} 
        onSelectAnswer={handleSelectedAnswer}
        onSkipAnswer={handleSkipAnswer}/> 
    </div>
    
  );
}
