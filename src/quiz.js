import React, { useState, useEffect } from 'react';
import './App.css';
import quizData from './quizdata'

const Quiz=()=> {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (quizStarted && currentQuestionIndex < quizData.length && !showResult) {
      const timer = setTimeout(() => {
        if (timeLeft === 0) {
          checkAnswer('');
        } else {
          setTimeLeft(timeLeft - 1);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentQuestionIndex, timeLeft, showResult, quizStarted]);

  const checkAnswer = (selectedOption) => {
    if (!showResult) {
      const currentQuestion = quizData[currentQuestionIndex];

      if (selectedOption === currentQuestion.answer) {
        setScore(score + 5);
      }

      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimeLeft(10);
      } else {
        setShowResult(true);
      }
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(10);
    setShowResult(false);
    setQuizStarted(false);
  };

  return (
    <div className="containe">
      {showResult ? (
        <div className='p-4'>
          <h1 className='font-bold'>Quiz Complete</h1>
          <p>Your Score: {score} out of {quizData.length*5}</p>
          <button onClick={restartQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <div>
          {!quizStarted ? (
            <div>
              <h1 className='font-bold'>Welcome to the Quiz!</h1>
              <button onClick={startQuiz} className='font-semibold'>Start Quiz</button>
            </div>
          ) : (
            <div className='p-4'>
              <h1 className='font-bold'>Quiz Application</h1>
              <p className='font-semibold'>{quizData[currentQuestionIndex].question}</p>
              <div id="options" className="font-semibold">
                {quizData[currentQuestionIndex].options.map((option, index) => (
                  <button key={index} onClick={() => checkAnswer(option)}>
                    {option}
                  </button>
                ))}
              </div>
              <p>
                Question <span id="current-question">{currentQuestionIndex + 1}</span> of <span id="total-questions">{quizData.length}</span>
              </p>
              <div id="timer">Time left: <span id="time-left">{timeLeft}</span> seconds</div>
            </div>
          )}
        </div>
      )}
    </div>
  );

}

export default Quiz;
