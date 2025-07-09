import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Send, Trophy, Star } from 'lucide-react';

const MathWorksheet = () => {
  const [userName, setUserName] = useState('');
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [highScores, setHighScores] = useState([
    { name: 'Alex', score: 12 },
    { name: 'Sarah', score: 11 },
    { name: 'Mike', score: 10 }
  ]);

  // Add CSS animation keyframes
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      
      .float-animation {
        animation: float 3s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Math problems with correct answers
  const problems = [
    { id: 1, question: '28', answer: '30' },
    { id: 2, question: '54', answer: '50' },
    { id: 3, question: '73', answer: '70' },
    { id: 4, question: '89', answer: '90' },
    { id: 5, question: '35', answer: '40' },
    { id: 6, question: '62', answer: '60' },
    { id: 7, question: '17', answer: '20' },
    { id: 8, question: '44', answer: '40' },
    { id: 9, question: '96', answer: '100' },
    { id: 10, question: '81', answer: '80' },
    { id: 11, question: '23', answer: '20' },
    { id: 12, question: '57', answer: '60' }
  ];

  const handleAnswerChange = (problemId, value) => {
    setAnswers(prev => ({
      ...prev,
      [problemId]: value
    }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    problems.forEach(problem => {
      if (answers[problem.id] === problem.answer) {
        correctCount++;
      }
    });
    return correctCount;
  };

  const handleSubmit = () => {
    if (!userName.trim()) {
      setShowNameModal(true);
      return;
    }
    
    const finalScore = calculateScore();
    setScore(finalScore);
    setSubmitted(true);
    setShowResults(true);
    
    // Add to high scores if score is good
    if (finalScore >= 8) {
      const newScore = { name: userName, score: finalScore };
      setHighScores(prev => [...prev, newScore].sort((a, b) => b.score - a.score).slice(0, 5));
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setShowResults(false);
    setScore(0);
  };

  const getResultIcon = (problemId) => {
    if (!submitted) return null;
    const isCorrect = answers[problemId] === problems.find(p => p.id === problemId)?.answer;
    return isCorrect ? 
      <CheckCircle className="w-5 h-5 text-green-500 ml-2" /> : 
      <XCircle className="w-5 h-5 text-red-500 ml-2" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-pink-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-40 w-20 h-20 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-green-400 rounded-full animate-bounce"></div>
        <div className="absolute top-60 left-1/2 w-16 h-16 bg-purple-400 rounded-full animate-pulse"></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 bg-white bg-opacity-95 backdrop-blur-md rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-500 border border-white border-opacity-20">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full shadow-lg">
              <div className="text-4xl">🎯</div>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Math Worksheet
          </h1>
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">Rounding to the Nearest 10</h2>
          <p className="text-gray-600 text-lg">Round each number to the nearest 10 and become a math champion!</p>
        </div>

        {/* Name Input */}
        <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-2xl shadow-2xl p-8 mb-8 border border-white border-opacity-20">
          <label className="block text-gray-700 font-bold mb-4 text-lg">
            ✏️ Enter Your Name:
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full max-w-md px-6 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg font-semibold bg-white shadow-inner"
            placeholder="Enter your name here..."
          />
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {problems.map((problem, index) => (
            <div
              key={problem.id}
              className="bg-white bg-opacity-95 backdrop-blur-md rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-white border-opacity-20"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                  #{problem.id}
                </div>
                {getResultIcon(problem.id)}
              </div>
              
              <div className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent mb-6">
                  {problem.question}
                </div>
                <div className="text-gray-600 mb-6 text-lg font-semibold">rounds to</div>
                <input
                  type="number"
                  value={answers[problem.id] || ''}
                  onChange={(e) => handleAnswerChange(problem.id, e.target.value)}
                  disabled={submitted}
                  className={`w-full px-6 py-4 text-3xl font-bold text-center border-3 rounded-xl transition-all duration-300 shadow-inner ${
                    submitted
                      ? answers[problem.id] === problem.answer
                        ? 'border-green-500 bg-green-50 text-green-700 shadow-green-200'
                        : 'border-red-500 bg-red-50 text-red-700 shadow-red-200'
                      : 'border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200 bg-white'
                  }`}
                  placeholder="?"
                />
                {submitted && answers[problem.id] !== problem.answer && (
                  <div className="mt-4 text-sm text-green-600 font-semibold bg-green-100 py-2 px-4 rounded-lg">
                    ✅ Correct answer: {problem.answer}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Control Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
          <button
            onClick={handleSubmit}
            disabled={submitted}
            className="flex items-center justify-center px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110 text-lg"
          >
            <Send className="w-6 h-6 mr-3" />
            ✨ Submit Answers
          </button>
          
          <button
            onClick={handleReset}
            className="flex items-center justify-center px-10 py-4 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 text-lg"
          >
            <RotateCcw className="w-6 h-6 mr-3" />
            🔄 Reset All
          </button>
        </div>

        {/* Results */}
        {showResults && (
          <div className="relative bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-2xl p-8 mb-6 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full animate-pulse"></div>
              <div className="absolute top-8 right-8 w-8 h-8 bg-yellow-300 rounded-full animate-bounce"></div>
              <div className="absolute bottom-4 left-8 w-6 h-6 bg-blue-300 rounded-full animate-pulse"></div>
              <div className="absolute bottom-8 right-4 w-10 h-10 bg-green-300 rounded-full animate-bounce"></div>
            </div>
            
            <div className="text-center relative z-10">
              <div className="text-8xl mb-6 animate-pulse">
                {score >= 10 ? '🌟' : score >= 8 ? '🎉' : score >= 6 ? '👍' : '💪'}
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
                Fantastic work, {userName}!
              </h3>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 mb-6">
                <div className="text-6xl font-bold text-white mb-2 drop-shadow-lg">
                  {score}/12
                </div>
                <div className="text-xl text-white font-semibold">
                  {score >= 10 ? 'Outstanding! You\'re a math star!' : 
                   score >= 8 ? 'Excellent work! Keep it up!' : 
                   score >= 6 ? 'Good job! You\'re improving!' : 'Great effort! Practice makes perfect!'}
                </div>
              </div>
              
              <button
                onClick={handleReset}
                className="bg-white text-purple-600 font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 text-lg"
              >
                🎮 Play Again
              </button>
            </div>
          </div>
        )}

        {/* High Scores */}
        <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-2xl shadow-2xl p-8 mb-8 border border-white border-opacity-20">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-full shadow-lg mr-4">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              🏆 Hall of Fame
            </h3>
          </div>
          <div className="space-y-4">
            {highScores.map((entry, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                  index === 0 ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-2 border-yellow-300 shadow-lg' : 
                  index === 1 ? 'bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-gray-300 shadow-lg' : 
                  index === 2 ? 'bg-gradient-to-r from-orange-100 to-orange-200 border-2 border-orange-300 shadow-lg' : 
                  'bg-gradient-to-r from-blue-100 to-blue-200 border-2 border-blue-300 shadow-lg'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white mr-4 shadow-lg ${
                    index === 0 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                    index === 1 ? 'bg-gradient-to-r from-gray-500 to-gray-600' :
                    index === 2 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                    'bg-gradient-to-r from-blue-500 to-blue-600'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="font-bold text-lg text-gray-800">{entry.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-bold text-xl mr-3 text-gray-800">{entry.score}/12</span>
                  {index < 3 && <Star className="w-6 h-6 text-yellow-500" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-white text-sm bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-20">
          <p className="font-semibold">Created by Foo Ling Zhen</p>
          <p className="mt-2">Test your Math skills!</p>
        </div>

        {/* Name Modal */}
        {showNameModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl transform scale-105 border border-white border-opacity-20">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">✏️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Name Required</h3>
                <p className="text-gray-600">Please enter your name to continue with the quiz!</p>
              </div>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-transparent mb-6 text-lg font-semibold shadow-inner"
                placeholder="Enter your name here..."
              />
              <div className="flex gap-4">
                <button
                  onClick={() => setShowNameModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-600 text-white font-bold rounded-xl hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (userName.trim()) {
                      setShowNameModal(false);
                      handleSubmit();
                    }
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MathWorksheet;