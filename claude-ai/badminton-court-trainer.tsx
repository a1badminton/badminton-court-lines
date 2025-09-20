import React, { useState, useCallback } from 'react';
import { Check, X, RotateCcw, BookOpen, Brain, Home } from 'lucide-react';

const BadmintonCourtTrainer = () => {
  const [mode, setMode] = useState('menu'); // 'menu', 'learn', 'quiz'
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);

  // Court areas and their properties
  const courtAreas = {
    singles_sideline: { 
      name: "Singles Sideline", 
      color: "rgba(59, 130, 246, 0.3)",
      description: "The side boundary for singles play"
    },
    doubles_sideline: { 
      name: "Doubles Sideline", 
      color: "rgba(16, 185, 129, 0.3)",
      description: "The side boundary for doubles play (wider than singles)"
    },
    short_service_line: { 
      name: "Short Service Line", 
      color: "rgba(245, 101, 101, 0.3)",
      description: "The front boundary of the service court"
    },
    long_service_line_singles: { 
      name: "Long Service Line (Singles)", 
      color: "rgba(168, 85, 247, 0.3)",
      description: "The back service boundary for singles (same as back boundary)"
    },
    long_service_line_doubles: { 
      name: "Long Service Line (Doubles)", 
      color: "rgba(245, 158, 11, 0.3)",
      description: "The back service boundary for doubles (shorter than back boundary)"
    },
    center_line: { 
      name: "Center Line", 
      color: "rgba(236, 72, 153, 0.3)",
      description: "Divides the service court into left and right service courts"
    },
    back_boundary: { 
      name: "Back Boundary Line", 
      color: "rgba(6, 182, 212, 0.3)",
      description: "The back boundary of the court for all play"
    },
    right_service_court: { 
      name: "Right Service Court", 
      color: "rgba(34, 197, 94, 0.2)",
      description: "Service area on the right side of the court"
    },
    left_service_court: { 
      name: "Left Service Court", 
      color: "rgba(239, 68, 68, 0.2)",
      description: "Service area on the left side of the court"
    }
  };

  const quizQuestions = [
    { id: 'singles_sideline', question: "Click on the Singles Sideline", type: 'line' },
    { id: 'doubles_sideline', question: "Click on the Doubles Sideline", type: 'line' },
    { id: 'short_service_line', question: "Click on the Short Service Line", type: 'line' },
    { id: 'long_service_line_doubles', question: "Click on the Long Service Line for Doubles", type: 'line' },
    { id: 'center_line', question: "Click on the Center Line", type: 'line' },
    { id: 'back_boundary', question: "Click on the Back Boundary Line", type: 'line' },
    { id: 'right_service_court', question: "Click on the Right Service Court", type: 'area' },
    { id: 'left_service_court', question: "Click on the Left Service Court", type: 'area' }
  ];

  const handleAreaClick = (areaId) => {
    if (mode === 'learn') {
      setSelectedArea(areaId);
    } else if (mode === 'quiz') {
      const correct = areaId === quizQuestions[currentQuestion].id;
      if (correct) {
        setQuizScore(prev => prev + 1);
      }
      setShowResult(true);
      setTimeout(() => {
        if (currentQuestion < quizQuestions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
          setShowResult(false);
        } else {
          // Quiz completed
          setMode('results');
        }
      }, 1500);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setQuizScore(0);
    setShowResult(false);
    setMode('quiz');
  };

  const CourtSVG = ({ interactive = false, highlightArea = null }) => (
    <svg viewBox="0 0 200 400" className="w-full max-w-md border border-gray-300 bg-green-50">
      {/* Court background */}
      <rect x="25" y="50" width="150" height="300" fill="rgba(34, 197, 94, 0.1)" stroke="black" strokeWidth="2"/>
      
      {/* Doubles sidelines (top and bottom) */}
      <line x1="25" y1="50" x2="175" y2="50" stroke="black" strokeWidth="2"/>
      <line x1="25" y1="350" x2="175" y2="350" stroke="black" strokeWidth="2"/>
      
      {/* Singles sidelines */}
      <line x1="25" y1="70" x2="175" y2="70" stroke="black" strokeWidth="2"/>
      <line x1="25" y1="330" x2="175" y2="330" stroke="black" strokeWidth="2"/>
      
      {/* Net */}
      <line x1="100" y1="50" x2="100" y2="350" stroke="black" strokeWidth="3"/>
      
      {/* Short service lines */}
      <line x1="65" y1="70" x2="65" y2="330" stroke="black" strokeWidth="2"/>
      <line x1="135" y1="70" x2="135" y2="330" stroke="black" strokeWidth="2"/>
      
      {/* Long service lines for doubles */}
      <line x1="45" y1="50" x2="45" y2="350" stroke="black" strokeWidth="2"/>
      <line x1="155" y1="50" x2="155" y2="350" stroke="black" strokeWidth="2"/>
      
      {/* Center lines */}
      <line x1="65" y1="200" x2="45" y2="200" stroke="black" strokeWidth="2"/>
      <line x1="135" y1="200" x2="155" y2="200" stroke="black" strokeWidth="2"/>

      {/* Interactive overlays */}
      {interactive && (
        <>
          {/* Singles sidelines */}
          <rect x="20" y="65" width="160" height="10" fill={highlightArea === 'singles_sideline' ? courtAreas.singles_sideline.color : 'transparent'} 
                onClick={() => handleAreaClick('singles_sideline')} className="cursor-pointer hover:fill-blue-200 transition-colors" />
          <rect x="20" y="325" width="160" height="10" fill={highlightArea === 'singles_sideline' ? courtAreas.singles_sideline.color : 'transparent'} 
                onClick={() => handleAreaClick('singles_sideline')} className="cursor-pointer hover:fill-blue-200 transition-colors" />
          
          {/* Doubles sidelines */}
          <rect x="20" y="45" width="160" height="10" fill={highlightArea === 'doubles_sideline' ? courtAreas.doubles_sideline.color : 'transparent'} 
                onClick={() => handleAreaClick('doubles_sideline')} className="cursor-pointer hover:fill-green-200 transition-colors" />
          <rect x="20" y="345" width="160" height="10" fill={highlightArea === 'doubles_sideline' ? courtAreas.doubles_sideline.color : 'transparent'} 
                onClick={() => handleAreaClick('doubles_sideline')} className="cursor-pointer hover:fill-green-200 transition-colors" />
          
          {/* Short service lines */}
          <rect x="60" y="65" width="10" height="270" fill={highlightArea === 'short_service_line' ? courtAreas.short_service_line.color : 'transparent'} 
                onClick={() => handleAreaClick('short_service_line')} className="cursor-pointer hover:fill-red-200 transition-colors" />
          <rect x="130" y="65" width="10" height="270" fill={highlightArea === 'short_service_line' ? courtAreas.short_service_line.color : 'transparent'} 
                onClick={() => handleAreaClick('short_service_line')} className="cursor-pointer hover:fill-red-200 transition-colors" />
          
          {/* Long service lines doubles */}
          <rect x="40" y="45" width="10" height="310" fill={highlightArea === 'long_service_line_doubles' ? courtAreas.long_service_line_doubles.color : 'transparent'} 
                onClick={() => handleAreaClick('long_service_line_doubles')} className="cursor-pointer hover:fill-amber-200 transition-colors" />
          <rect x="150" y="45" width="10" height="310" fill={highlightArea === 'long_service_line_doubles' ? courtAreas.long_service_line_doubles.color : 'transparent'} 
                onClick={() => handleAreaClick('long_service_line_doubles')} className="cursor-pointer hover:fill-amber-200 transition-colors" />
          
          {/* Back boundary */}
          <rect x="20" y="45" width="160" height="10" fill={highlightArea === 'back_boundary' ? courtAreas.back_boundary.color : 'transparent'} 
                onClick={() => handleAreaClick('back_boundary')} className="cursor-pointer hover:fill-cyan-200 transition-colors" />
          <rect x="20" y="345" width="160" height="10" fill={highlightArea === 'back_boundary' ? courtAreas.back_boundary.color : 'transparent'} 
                onClick={() => handleAreaClick('back_boundary')} className="cursor-pointer hover:fill-cyan-200 transition-colors" />
          
          {/* Center lines */}
          <rect x="40" y="195" width="30" height="10" fill={highlightArea === 'center_line' ? courtAreas.center_line.color : 'transparent'} 
                onClick={() => handleAreaClick('center_line')} className="cursor-pointer hover:fill-pink-200 transition-colors" />
          <rect x="130" y="195" width="30" height="10" fill={highlightArea === 'center_line' ? courtAreas.center_line.color : 'transparent'} 
                onClick={() => handleAreaClick('center_line')} className="cursor-pointer hover:fill-pink-200 transition-colors" />
          
          {/* Service courts */}
          <rect x="45" y="70" width="20" height="130" fill={highlightArea === 'right_service_court' ? courtAreas.right_service_court.color : 'transparent'} 
                onClick={() => handleAreaClick('right_service_court')} className="cursor-pointer hover:fill-green-100 transition-colors" />
          <rect x="45" y="200" width="20" height="130" fill={highlightArea === 'left_service_court' ? courtAreas.left_service_court.color : 'transparent'} 
                onClick={() => handleAreaClick('left_service_court')} className="cursor-pointer hover:fill-red-100 transition-colors" />
          <rect x="135" y="70" width="20" height="130" fill={highlightArea === 'left_service_court' ? courtAreas.left_service_court.color : 'transparent'} 
                onClick={() => handleAreaClick('left_service_court')} className="cursor-pointer hover:fill-red-100 transition-colors" />
          <rect x="135" y="200" width="20" height="130" fill={highlightArea === 'right_service_court' ? courtAreas.right_service_court.color : 'transparent'} 
                onClick={() => handleAreaClick('right_service_court')} className="cursor-pointer hover:fill-green-100 transition-colors" />
        </>
      )}
    </svg>
  );

  if (mode === 'menu') {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Badminton Court Trainer</h1>
          <p className="text-gray-600">Learn the court lines and test your knowledge</p>
        </div>
        
        <div className="flex justify-center mb-8">
          <CourtSVG />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setMode('learn')}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <BookOpen size={20} />
            Learning Mode
          </button>
          <button
            onClick={() => setMode('quiz')}
            className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Brain size={20} />
            Quiz Mode
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'learn') {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setMode('menu')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Home size={16} />
            Menu
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Learning Mode</h2>
        </div>
        
        <p className="text-gray-600 mb-6">Click on different parts of the court to learn about the lines and areas.</p>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 flex justify-center">
            <CourtSVG interactive={true} highlightArea={selectedArea} />
          </div>
          
          <div className="lg:w-80">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Court Areas</h3>
              <div className="space-y-2">
                {Object.entries(courtAreas).map(([key, area]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedArea(key)}
                    className={`w-full text-left p-2 rounded transition-colors ${
                      selectedArea === key ? 'bg-blue-100 border border-blue-300' : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded" 
                        style={{ backgroundColor: area.color.replace('0.3', '0.8').replace('0.2', '0.8') }}
                      ></div>
                      <span className="font-medium text-sm">{area.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {selectedArea && (
              <div className="mt-4 bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">
                  {courtAreas[selectedArea].name}
                </h4>
                <p className="text-blue-700 text-sm">
                  {courtAreas[selectedArea].description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'quiz') {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMode('menu')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <Home size={16} />
              Menu
            </button>
            <h2 className="text-2xl font-bold text-gray-800">Quiz Mode</h2>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Question {currentQuestion + 1} of {quizQuestions.length}</div>
            <div className="text-lg font-semibold">Score: {quizScore}/{quizQuestions.length}</div>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-800">
            {quizQuestions[currentQuestion].question}
          </h3>
        </div>
        
        <div className="flex justify-center mb-6">
          <CourtSVG interactive={true} />
        </div>
        
        {showResult && (
          <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}>
            <div className={`bg-white rounded-lg p-6 text-center ${
              quizQuestions[currentQuestion].id === selectedArea ? 'border-4 border-green-500' : 'border-4 border-red-500'
            }`}>
              <div className={`text-4xl mb-2 ${
                quizQuestions[currentQuestion].id === selectedArea ? 'text-green-500' : 'text-red-500'
              }`}>
                {quizQuestions[currentQuestion].id === selectedArea ? <Check size={48} /> : <X size={48} />}
              </div>
              <h3 className="text-xl font-bold mb-2">
                {quizQuestions[currentQuestion].id === selectedArea ? 'Correct!' : 'Incorrect'}
              </h3>
              <p className="text-gray-600">
                {courtAreas[quizQuestions[currentQuestion].id].name}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (mode === 'results') {
    const percentage = Math.round((quizScore / quizQuestions.length) * 100);
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
          <div className="text-6xl font-bold mb-4 text-blue-600">{percentage}%</div>
          <p className="text-xl text-gray-600 mb-6">
            You got {quizScore} out of {quizQuestions.length} questions correct
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetQuiz}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <RotateCcw size={20} />
              Try Again
            </button>
            <button
              onClick={() => setMode('menu')}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Home size={20} />
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default BadmintonCourtTrainer;