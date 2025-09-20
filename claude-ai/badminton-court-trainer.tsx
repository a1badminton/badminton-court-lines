import React, { useState, useCallback } from 'react';
import { Check, X, RotateCcw, BookOpen, Brain, Home } from 'lucide-react';

const BadmintonCourtTrainer = () => {
  const [mode, setMode] = useState('menu'); // 'menu', 'learn', 'quiz'
  const [showUserModal, setShowUserModal] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [userName, setUserName] = useState('');
  const [userDOB, setUserDOB] = useState('');

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
    if (mode === 'userInfo') {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
        {/* Modal Overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Quiz Information</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="userDOB" className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="userDOB"
                  value={userDOB}
                  onChange={(e) => setUserDOB(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setMode('menu')}
                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={startQuiz}
                disabled={!userName.trim() || !userDOB}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>

        {/* User Information Modal */}
        {showUserModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0}}>
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl" style={{backgroundColor: 'white', zIndex: 9999}}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Quiz Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                    autoFocus
                  />
                </div>
                
                <div>
                  <label htmlFor="userDOB" className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="userDOB"
                    value={userDOB}
                    onChange={(e) => setUserDOB(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex gap-4 mt-8">
                <button
                  onClick={closeQuizModal}
                  className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={startQuiz}
                  disabled={!userName.trim() || !userDOB}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (mode === 'learn') {
      setSelectedArea(areaId);
    } else if (mode === 'quiz') {
      setCurrentAnswer(areaId);
      const correct = areaId === quizQuestions[currentQuestion].id;
      if (correct) {
        setQuizScore(prev => prev + 1);
      }
      setShowResult(true);
      setTimeout(() => {
        if (currentQuestion < quizQuestions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
          setShowResult(false);
          setCurrentAnswer(null);
        } else {
          // Quiz completed
          setMode('results');
        }
      }, 1500);
    }
  };

  const openQuizModal = () => {
    console.log('Opening quiz modal'); // Debug log
    setShowUserModal(true);
  };

  const closeQuizModal = () => {
    setShowUserModal(false);
    setUserName('');
    setUserDOB('');
  };

  const startQuiz = () => {
    if (userName.trim() && userDOB) {
      setShowUserModal(false);
      setMode('quiz');
      setCurrentQuestion(0);
      setQuizScore(0);
      setShowResult(false);
      setCurrentAnswer(null);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setQuizScore(0);
    setShowResult(false);
    setCurrentAnswer(null);
    setMode('quiz');
  };

  const CourtSVG = ({ interactive = false, highlightArea = null }) => (
    <svg viewBox="0 0 300 480" className="w-full max-w-lg border border-gray-300 bg-green-50">
      {/* Court background */}
      <rect x="50" y="20" width="200" height="440" fill="rgba(34, 197, 94, 0.1)" stroke="black" strokeWidth="2"/>
      
      {/* Doubles sidelines (left and right - running length of court) */}
      <line x1="50" y1="20" x2="50" y2="460" stroke="black" strokeWidth="2"/>
      <line x1="250" y1="20" x2="250" y2="460" stroke="black" strokeWidth="2"/>
      
      {/* Singles sidelines (inner lines running length of court) */}
      <line x1="65" y1="20" x2="65" y2="460" stroke="black" strokeWidth="2"/>
      <line x1="235" y1="20" x2="235" y2="460" stroke="black" strokeWidth="2"/>
      
      {/* Net (running width of court) - imaginary line */}
      <line x1="50" y1="240" x2="250" y2="240" stroke="rgba(0, 0, 0, 0.3)" strokeWidth="1" strokeDasharray="5,5"/>
      
      {/* Short service lines (running width, 65 units from net) */}
      <line x1="50" y1="175" x2="250" y2="175" stroke="black" strokeWidth="2"/>
      <line x1="50" y1="305" x2="250" y2="305" stroke="black" strokeWidth="2"/>
      
      {/* Long service lines for doubles (running width, 195 units from net) */}
      <line x1="50" y1="45" x2="250" y2="45" stroke="black" strokeWidth="2"/>
      <line x1="50" y1="435" x2="250" y2="435" stroke="black" strokeWidth="2"/>
      
      {/* Back boundary lines (220 units from net) */}
      <line x1="50" y1="20" x2="250" y2="20" stroke="black" strokeWidth="2"/>
      <line x1="50" y1="460" x2="250" y2="460" stroke="black" strokeWidth="2"/>
      
      {/* Center lines (from short service line to baseline) */}
      <line x1="150" y1="20" x2="150" y2="175" stroke="black" strokeWidth="2"/>
      <line x1="150" y1="305" x2="150" y2="460" stroke="black" strokeWidth="2"/>

      {/* Interactive overlays */}
      {interactive && (
        <>
          {/* Singles sidelines (left and right) */}
          <rect x="60" y="15" width="10" height="450" fill={highlightArea === 'singles_sideline' ? courtAreas.singles_sideline.color : 'transparent'} 
                onClick={() => handleAreaClick('singles_sideline')} className="cursor-pointer" 
                style={{transition: 'fill 0.2s'}}
                onMouseEnter={(e) => e.target.style.fill = highlightArea === 'singles_sideline' ? courtAreas.singles_sideline.color : 'rgba(59, 130, 246, 0.4)'}
                onMouseLeave={(e) => e.target.style.fill = highlightArea === 'singles_sideline' ? courtAreas.singles_sideline.color : 'transparent'} />
          <rect x="230" y="15" width="10" height="450" fill={highlightArea === 'singles_sideline' ? courtAreas.singles_sideline.color : 'transparent'} 
                onClick={() => handleAreaClick('singles_sideline')} className="cursor-pointer"
                style={{transition: 'fill 0.2s'}}
                onMouseEnter={(e) => e.target.style.fill = highlightArea === 'singles_sideline' ? courtAreas.singles_sideline.color : 'rgba(59, 130, 246, 0.4)'}
                onMouseLeave={(e) => e.target.style.fill = highlightArea === 'singles_sideline' ? courtAreas.singles_sideline.color : 'transparent'} />
          
          {/* Doubles sidelines (outer left and right) */}
          <rect x="45" y="15" width="10" height="450" fill={highlightArea === 'doubles_sideline' ? courtAreas.doubles_sideline.color : 'transparent'} 
                onClick={() => handleAreaClick('doubles_sideline')} className="cursor-pointer"
                style={{transition: 'fill 0.2s'}}
                onMouseEnter={(e) => e.target.style.fill = highlightArea === 'doubles_sideline' ? courtAreas.doubles_sideline.color : 'rgba(16, 185, 129, 0.4)'}
                onMouseLeave={(e) => e.target.style.fill = highlightArea === 'doubles_sideline' ? courtAreas.doubles_sideline.color : 'transparent'} />
          <rect x="245" y="15" width="10" height="450" fill={highlightArea === 'doubles_sideline' ? courtAreas.doubles_sideline.color : 'transparent'} 
                onClick={() => handleAreaClick('doubles_sideline')} className="cursor-pointer"
                style={{transition: 'fill 0.2s'}}
                onMouseEnter={(e) => e.target.style.fill = highlightArea === 'doubles_sideline' ? courtAreas.doubles_sideline.color : 'rgba(16, 185, 129, 0.4)'}
                onMouseLeave={(e) => e.target.style.fill = highlightArea === 'doubles_sideline' ? courtAreas.doubles_sideline.color : 'transparent'} />
          
          {/* Short service lines (horizontal, 65 units from net) */}
          <rect x="45" y="170" width="210" height="10" fill={highlightArea === 'short_service_line' ? courtAreas.short_service_line.color : 'transparent'} 
                onClick={() => handleAreaClick('short_service_line')} className="cursor-pointer"
                style={{transition: 'fill 0.2s'}}
                onMouseEnter={(e) => e.target.style.fill = highlightArea === 'short_service_line' ? courtAreas.short_service_line.color : 'rgba(245, 101, 101, 0.4)'}
                onMouseLeave={(e) => e.target.style.fill = highlightArea === 'short_service_line' ? courtAreas.short_service_line.color : 'transparent'} />
          <rect x="45" y="300" width="210" height="10" fill={highlightArea === 'short_service_line' ? courtAreas.short_service_line.color : 'transparent'} 
                onClick={() => handleAreaClick('short_service_line')} className="cursor-pointer"
                style={{transition: 'fill 0.2s'}}
                onMouseEnter={(e) => e.target.style.fill = highlightArea === 'short_service_line' ? courtAreas.short_service_line.color : 'rgba(245, 101, 101, 0.4)'}
                onMouseLeave={(e) => e.target.style.fill = highlightArea === 'short_service_line' ? courtAreas.short_service_line.color : 'transparent'} />
          
          {/* Long service lines doubles (horizontal, 195 units from net) */}
          <rect x="45" y="40" width="210" height="10" fill={highlightArea === 'long_service_line_doubles' ? courtAreas.long_service_line_doubles.color : 'transparent'} 
                onClick={() => handleAreaClick('long_service_line_doubles')} className="cursor-pointer"
                style={{transition: 'fill 0.2s'}}
                onMouseEnter={(e) => e.target.style.fill = highlightArea === 'long_service_line_doubles' ? courtAreas.long_service_line_doubles.color : 'rgba(245, 158, 11, 0.4)'}
                onMouseLeave={(e) => e.target.style.fill = highlightArea === 'long_service_line_doubles' ? courtAreas.long_service_line_doubles.color : 'transparent'} />
          <rect x="45" y="430" width="210" height="10" fill={highlightArea === 'long_service_line_doubles' ? courtAreas.long_service_line_doubles.color : 'transparent'} 
                onClick={() => handleAreaClick('long_service_line_doubles')} className="cursor-pointer"
                style={{transition: 'fill 0.2s'}}
                onMouseEnter={(e) => e.target.style.fill = highlightArea === 'long_service_line_doubles' ? courtAreas.long_service_line_doubles.color : 'rgba(245, 158, 11, 0.4)'}
                onMouseLeave={(e) => e.target.style.fill = highlightArea === 'long_service_line_doubles' ? courtAreas.long_service_line_doubles.color : 'transparent'} />
          
          {/* Back boundary lines (220 units from net) */}
          <rect x="45" y="15" width="210" height="10" fill={highlightArea === 'back_boundary' ? courtAreas.back_boundary.color : 'transparent'} 
                onClick={() => handleAreaClick('back_boundary')} className="cursor-pointer"
                style={{transition: 'fill 0.2s'}}
                onMouseEnter={(e) => e.target.style.fill = highlightArea === 'back_boundary' ? courtAreas.back_boundary.color : 'rgba(6, 182, 212, 0.4)'}
                onMouseLeave={(e) => e.target.style.fill = highlightArea === 'back_boundary' ? courtAreas.back_boundary.color : 'transparent'} />
          <rect x="45" y="455" width="210" height="10" fill={highlightArea === 'back_boundary' ? courtAreas.back_boundary.color : 'transparent'} 
                onClick={() => handleAreaClick('back_boundary')} className="cursor-pointer"
                style={{transition: 'fill 0.2s'}}
                onMouseEnter={(e) => e.target.style.fill = highlightArea === 'back_boundary' ? courtAreas.back_boundary.color : 'rgba(6, 182, 212, 0.4)'}
                onMouseLeave={(e) => e.target.style.fill = highlightArea === 'back_boundary' ? courtAreas.back_boundary.color : 'transparent'} />
          
          {/* Center lines (vertical, from short service line to baseline) */}
          <rect x="145" y="15" width="10" height="165" fill={highlightArea === 'center_line' ? courtAreas.center_line.color : 'transparent'} 
                onClick={() => handleAreaClick('center_line')} className="cursor-pointer"
                style={{transition: 'fill 0.2s'}}
                onMouseEnter={(e) => e.target.style.fill = highlightArea === 'center_line' ? courtAreas.center_line.color : 'rgba(236, 72, 153, 0.4)'}
                onMouseLeave={(e) => e.target.style.fill = highlightArea === 'center_line' ? courtAreas.center_line.color : 'transparent'} />
          <rect x="145" y="300" width="10" height="165" fill={highlightArea === 'center_line' ? courtAreas.center_line.color : 'transparent'} 
                onClick={() => handleAreaClick('center_line')} className="cursor-pointer"
                style={{transition: 'fill 0.2s'}}
                onMouseEnter={(e) => e.target.style.fill = highlightArea === 'center_line' ? courtAreas.center_line.color : 'rgba(236, 72, 153, 0.4)'}
                onMouseLeave={(e) => e.target.style.fill = highlightArea === 'center_line' ? courtAreas.center_line.color : 'transparent'} />
          
          {/* Service courts */}
          {/* Top half - right service court (from server's perspective) */}
          <rect x="65" y="45" width="80" height="130" fill={highlightArea === 'right_service_court' ? courtAreas.right_service_court.color : 'transparent'} 
                onClick={() => handleAreaClick('right_service_court')} className="cursor-pointer"
                style={{transition: 'fill 0.2s'}}
                onMouseEnter={(e) => e.target.style.fill = highlightArea === 'right_service_court' ? courtAreas.right_service_court.color : 'rgba(34, 197, 94, 0.3)'}
                onMouseLeave={(e) => e.target.style.fill = highlightArea === 'right_service_court' ? courtAreas.right_service_court.color : 'transparent'} />
          {/* Top half - left service court */}
          <rect x="155" y="45" width="80" height="130" fill={highlightArea === 'left_service_court' ? courtAreas.left_service_court.color : 'transparent'} 
                onClick={() => handleAreaClick('left_service_court')} className="cursor-pointer"
                style={{transition: 'fill 0.2s'}}
                onMouseEnter={(e) => e.target.style.fill = highlightArea === 'left_service_court' ? courtAreas.left_service_court.color : 'rgba(239, 68, 68, 0.3)'}
                onMouseLeave={(e) => e.target.style.fill = highlightArea === 'left_service_court' ? courtAreas.left_service_court.color : 'transparent'} />
          {/* Bottom half - left service court */}
          <rect x="65" y="305" width="80" height="130" fill={highlightArea === 'left_service_court' ? courtAreas.left_service_court.color : 'transparent'} 
                onClick={() => handleAreaClick('left_service_court')} className="cursor-pointer"
                style={{transition: 'fill 0.2s'}}
                onMouseEnter={(e) => e.target.style.fill = highlightArea === 'left_service_court' ? courtAreas.left_service_court.color : 'rgba(239, 68, 68, 0.3)'}
                onMouseLeave={(e) => e.target.style.fill = highlightArea === 'left_service_court' ? courtAreas.left_service_court.color : 'transparent'} />
          {/* Bottom half - right service court */}
          <rect x="155" y="305" width="80" height="130" fill={highlightArea === 'right_service_court' ? courtAreas.right_service_court.color : 'transparent'} 
                onClick={() => handleAreaClick('right_service_court')} className="cursor-pointer"
                style={{transition: 'fill 0.2s'}}
                onMouseEnter={(e) => e.target.style.fill = highlightArea === 'right_service_court' ? courtAreas.right_service_court.color : 'rgba(34, 197, 94, 0.3)'}
                onMouseLeave={(e) => e.target.style.fill = highlightArea === 'right_service_court' ? courtAreas.right_service_court.color : 'transparent'} />
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
            onClick={openQuizModal}
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
            <div className="text-sm text-gray-600">
              <div className="font-medium">{userName}</div>
              <div>{userDOB}</div>
            </div>
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
              currentAnswer === quizQuestions[currentQuestion].id ? 'border-4 border-green-500' : 'border-4 border-red-500'
            }`}>
              <div className={`text-4xl mb-2 ${
                currentAnswer === quizQuestions[currentQuestion].id ? 'text-green-500' : 'text-red-500'
              }`}>
                {currentAnswer === quizQuestions[currentQuestion].id ? <Check size={48} /> : <X size={48} />}
              </div>
              <h3 className="text-xl font-bold mb-2">
                {currentAnswer === quizQuestions[currentQuestion].id ? 'Correct!' : 'Incorrect'}
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
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-lg font-semibold text-gray-800 mb-2">{userName}</div>
            <div className="text-sm text-gray-600">Date of Birth: {userDOB}</div>
          </div>
          
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