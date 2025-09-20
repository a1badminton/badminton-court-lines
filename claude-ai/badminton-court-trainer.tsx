<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Badminton Court Trainer</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            background-color: #f9fafb;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .header h1 {
            font-size: 2rem;
            color: #374151;
            margin-bottom: 8px;
        }
        
        .header p {
            color: #6b7280;
        }
        
        .court-container {
            display: flex;
            justify-content: center;
            margin-bottom: 30px;
        }
        
        .court-svg {
            border: 2px solid #d1d5db;
            background: #f0fdf4;
            max-width: 400px;
            width: 100%;
        }
        
        .buttons {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .btn {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            transition: background-color 0.2s;
        }
        
        .btn-primary {
            background-color: #3b82f6;
            color: white;
        }
        
        .btn-primary:hover {
            background-color: #2563eb;
        }
        
        .btn-success {
            background-color: #10b981;
            color: white;
        }
        
        .btn-success:hover {
            background-color: #059669;
        }
        
        .btn-secondary {
            background-color: #6b7280;
            color: white;
        }
        
        .btn-secondary:hover {
            background-color: #4b5563;
        }
        
        /* Modal Styles */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 9999;
        }
        
        .modal.show {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-content {
            background: white;
            border-radius: 8px;
            padding: 30px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
        }
        
        .modal-header {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 24px;
            text-align: center;
            color: #374151;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 8px;
            color: #374151;
        }
        
        .form-input {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            font-size: 16px;
        }
        
        .form-input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .modal-buttons {
            display: flex;
            gap: 16px;
            margin-top: 30px;
        }
        
        .btn-disabled {
            background-color: #d1d5db !important;
            cursor: not-allowed !important;
        }
        
        /* Quiz Styles */
        .quiz-header {
            display: flex;
            justify-content: between;
            align-items: center;
            margin-bottom: 24px;
            flex-wrap: wrap;
            gap: 20px;
        }
        
        .quiz-info {
            font-size: 14px;
            color: #6b7280;
        }
        
        .quiz-question {
            background: #eff6ff;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 24px;
            text-align: center;
        }
        
        .quiz-question h3 {
            font-size: 18px;
            color: #1d4ed8;
            font-weight: 600;
        }
        
        /* Result Modal */
        .result-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 10000;
        }
        
        .result-modal.show {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .result-content {
            background: white;
            border-radius: 8px;
            padding: 30px;
            text-align: center;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
        }
        
        .result-content.correct {
            border: 4px solid #10b981;
        }
        
        .result-content.incorrect {
            border: 4px solid #ef4444;
        }
        
        .result-icon {
            font-size: 48px;
            margin-bottom: 16px;
        }
        
        .result-icon.correct {
            color: #10b981;
        }
        
        .result-icon.incorrect {
            color: #ef4444;
        }
        
        .clickable-area {
            cursor: pointer;
            transition: fill 0.2s;
        }
        
        .sidebar {
            width: 300px;
            padding: 20px;
            background: #f9fafb;
            border-radius: 8px;
        }
        
        .sidebar h3 {
            margin-bottom: 16px;
            color: #374151;
        }
        
        .area-button {
            width: 100%;
            text-align: left;
            padding: 12px;
            margin-bottom: 8px;
            border: 1px solid #e5e7eb;
            background: white;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .area-button:hover {
            background: #f3f4f6;
        }
        
        .area-button.selected {
            background: #dbeafe;
            border-color: #3b82f6;
        }
        
        .color-indicator {
            display: inline-block;
            width: 16px;
            height: 16px;
            border-radius: 4px;
            margin-right: 8px;
            vertical-align: middle;
        }
        
        .area-info {
            background: #dbeafe;
            padding: 16px;
            border-radius: 8px;
            margin-top: 16px;
        }
        
        .area-info h4 {
            color: #1d4ed8;
            margin-bottom: 8px;
        }
        
        .area-info p {
            color: #1e40af;
            font-size: 14px;
        }
        
        .learn-container {
            display: flex;
            gap: 30px;
            align-items: flex-start;
        }
        
        @media (max-width: 768px) {
            .learn-container {
                flex-direction: column;
            }
            
            .sidebar {
                width: 100%;
            }
            
            .quiz-header {
                flex-direction: column;
                text-align: center;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Badminton Court Trainer</h1>
            <p>Learn the court lines and test your knowledge</p>
        </div>
        
        <div id="menu-screen">
            <div class="court-container">
                <svg viewBox="0 0 300 480" class="court-svg">
                    <!-- Court background -->
                    <rect x="50" y="20" width="200" height="440" fill="rgba(34, 197, 94, 0.1)" stroke="black" stroke-width="2"/>
                    
                    <!-- Doubles sidelines -->
                    <line x1="50" y1="20" x2="50" y2="460" stroke="black" stroke-width="2"/>
                    <line x1="250" y1="20" x2="250" y2="460" stroke="black" stroke-width="2"/>
                    
                    <!-- Singles sidelines -->
                    <line x1="65" y1="20" x2="65" y2="460" stroke="black" stroke-width="2"/>
                    <line x1="235" y1="20" x2="235" y2="460" stroke="black" stroke-width="2"/>
                    
                    <!-- Net (imaginary line) -->
                    <line x1="50" y1="240" x2="250" y2="240" stroke="rgba(0, 0, 0, 0.3)" stroke-width="1" stroke-dasharray="5,5"/>
                    
                    <!-- Short service lines -->
                    <line x1="50" y1="175" x2="250" y2="175" stroke="black" stroke-width="2"/>
                    <line x1="50" y1="305" x2="250" y2="305" stroke="black" stroke-width="2"/>
                    
                    <!-- Long service lines for doubles -->
                    <line x1="50" y1="45" x2="250" y2="45" stroke="black" stroke-width="2"/>
                    <line x1="50" y1="435" x2="250" y2="435" stroke="black" stroke-width="2"/>
                    
                    <!-- Back boundary lines -->
                    <line x1="50" y1="20" x2="250" y2="20" stroke="black" stroke-width="2"/>
                    <line x1="50" y1="460" x2="250" y2="460" stroke="black" stroke-width="2"/>
                    
                    <!-- Center lines -->
                    <line x1="150" y1="20" x2="150" y2="175" stroke="black" stroke-width="2"/>
                    <line x1="150" y1="305" x2="150" y2="460" stroke="black" stroke-width="2"/>
                </svg>
            </div>
            
            <div class="buttons">
                <button class="btn btn-primary" onclick="showLearnMode()">
                    📖 Learning Mode
                </button>
                <button class="btn btn-success" onclick="showQuizModal()">
                    🧠 Quiz Mode
                </button>
            </div>
        </div>
        
        <div id="learn-screen" style="display: none;">
            <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 24px;">
                <button class="btn btn-secondary" onclick="showMenu()">🏠 Menu</button>
                <h2>Learning Mode</h2>
            </div>
            <p style="margin-bottom: 24px; color: #6b7280;">Click on different parts of the court to learn about the lines and areas.</p>
            
            <div class="learn-container">
                <div style="flex: 1;">
                    <div class="court-container">
                        <svg viewBox="0 0 300 480" class="court-svg" id="learn-court">
                            <!-- Court will be generated by JavaScript -->
                        </svg>
                    </div>
                </div>
                
                <div class="sidebar">
                    <h3>Court Areas</h3>
                    <div id="area-buttons"></div>
                    <div id="area-info" style="display: none;" class="area-info">
                        <h4 id="area-name"></h4>
                        <p id="area-description"></p>
                    </div>
                </div>
            </div>
        </div>
        
        <div id="quiz-screen" style="display: none;">
            <div class="quiz-header">
                <div style="display: flex; align-items: center; gap: 20px;">
                    <button class="btn btn-secondary" onclick="showMenu()">🏠 Menu</button>
                    <div class="quiz-info">
                        <div style="font-weight: 600;" id="user-name"></div>
                        <div id="user-dob"></div>
                    </div>
                    <h2>Quiz Mode</h2>
                </div>
                <div class="quiz-info" style="text-align: right;">
                    <div>Question <span id="current-question">1</span> of <span id="total-questions">8</span></div>
                    <div style="font-size: 18px; font-weight: 600;">Score: <span id="current-score">0</span>/<span id="total-questions-score">8</span></div>
                </div>
            </div>
            
            <div class="quiz-question">
                <h3 id="question-text">Click on the Singles Sideline</h3>
            </div>
            
            <div class="court-container">
                <svg viewBox="0 0 300 480" class="court-svg" id="quiz-court">
                    <!-- Court will be generated by JavaScript -->
                </svg>
            </div>
        </div>
        
        <div id="results-screen" style="display: none;">
            <div style="text-align: center;">
                <h2 style="font-size: 2rem; margin-bottom: 16px;">Quiz Complete!</h2>
                
                <div style="background: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
                    <div style="font-size: 18px; font-weight: 600; margin-bottom: 8px;" id="final-user-name"></div>
                    <div style="color: #6b7280;" id="final-user-dob"></div>
                </div>
                
                <div style="font-size: 4rem; font-weight: bold; color: #3b82f6; margin-bottom: 16px;" id="final-percentage">0%</div>
                <p style="font-size: 20px; color: #6b7280; margin-bottom: 30px;">
                    You got <span id="final-score">0</span> out of <span id="final-total">8</span> questions correct
                </p>
                
                <div class="buttons">
                    <button class="btn btn-success" onclick="retakeQuiz()">🔄 Try Again</button>
                    <button class="btn btn-primary" onclick="showMenu()">🏠 Back to Menu</button>
                </div>
            </div>
        </div>
    </div>

    <!-- User Info Modal -->
    <div id="user-modal" class="modal">
        <div class="modal-content">
            <h2 class="modal-header">Quiz Information</h2>
            <form id="user-form">
                <div class="form-group">
                    <label class="form-label">Full Name</label>
                    <input type="text" class="form-input" id="user-name-input" placeholder="Enter your full name" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Date of Birth</label>
                    <input type="date" class="form-input" id="user-dob-input" required>
                </div>
                <div class="modal-buttons">
                    <button type="button" class="btn btn-secondary" onclick="closeQuizModal()" style="flex: 1;">Cancel</button>
                    <button type="submit" class="btn btn-success" id="start-quiz-btn" style="flex: 1;">Start Quiz</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Result Modal -->
    <div id="result-modal" class="result-modal">
        <div class="result-content" id="result-content">
            <div class="result-icon" id="result-icon">✓</div>
            <h3 style="font-size: 24px; margin-bottom: 8px;" id="result-title">Correct!</h3>
            <p style="color: #6b7280;" id="result-description"></p>
        </div>
    </div>

    <script>
        // Game State
        let currentMode = 'menu';
        let selectedArea = null;
        let userName = '';
        let userDOB = '';
        let quizScore = 0;
        let currentQuestion = 0;
        let currentAnswer = null;

        // Court Areas Data
        const courtAreas = {
            singles_sideline: { 
                name: "Singles Sideline", 
                color: "rgba(59, 130, 246, 0.3)",
                hoverColor: "rgba(59, 130, 246, 0.4)",
                description: "The side boundary for singles play"
            },
            doubles_sideline: { 
                name: "Doubles Sideline", 
                color: "rgba(16, 185, 129, 0.3)",
                hoverColor: "rgba(16, 185, 129, 0.4)",
                description: "The side boundary for doubles play (wider than singles)"
            },
            short_service_line: { 
                name: "Short Service Line", 
                color: "rgba(245, 101, 101, 0.3)",
                hoverColor: "rgba(245, 101, 101, 0.4)",
                description: "The front boundary of the service court"
            },
            long_service_line_doubles: { 
                name: "Long Service Line (Doubles)", 
                color: "rgba(245, 158, 11, 0.3)",
                hoverColor: "rgba(245, 158, 11, 0.4)",
                description: "The back service boundary for doubles (shorter than back boundary)"
            },
            center_line: { 
                name: "Center Line", 
                color: "rgba(236, 72, 153, 0.3)",
                hoverColor: "rgba(236, 72, 153, 0.4)",
                description: "Divides the service court into left and right service courts"
            },
            back_boundary: { 
                name: "Back Boundary Line", 
                color: "rgba(6, 182, 212, 0.3)",
                hoverColor: "rgba(6, 182, 212, 0.4)",
                description: "The back boundary of the court for all play"
            },
            right_service_court: { 
                name: "Right Service Court", 
                color: "rgba(34, 197, 94, 0.2)",
                hoverColor: "rgba(34, 197, 94, 0.3)",
                description: "Service area on the right side of the court"
            },
            left_service_court: { 
                name: "Left Service Court", 
                color: "rgba(239, 68, 68, 0.2)",
                hoverColor: "rgba(239, 68, 68, 0.3)",
                description: "Service area on the left side of the court"
            }
        };

        // Quiz Questions
        const quizQuestions = [
            { id: 'singles_sideline', question: "Click on the Singles Sideline" },
            { id: 'doubles_sideline', question: "Click on the Doubles Sideline" },
            { id: 'short_service_line', question: "Click on the Short Service Line" },
            { id: 'long_service_line_doubles', question: "Click on the Long Service Line for Doubles" },
            { id: 'center_line', question: "Click on the Center Line" },
            { id: 'back_boundary', question: "Click on the Back Boundary Line" },
            { id: 'right_service_court', question: "Click on the Right Service Court" },
            { id: 'left_service_court', question: "Click on the Left Service Court" }
        ];

        // Modal Functions
        function showQuizModal() {
            document.getElementById('user-modal').classList.add('show');
            document.getElementById('user-name-input').focus();
        }

        function closeQuizModal() {
            document.getElementById('user-modal').classList.remove('show');
            document.getElementById('user-name-input').value = '';
            document.getElementById('user-dob-input').value = '';
        }

        // Clear States
        function clearSelectedArea() {
            selectedArea = null;
            const areaInfo = document.getElementById('area-info');
            if (areaInfo) {
                areaInfo.style.display = 'none';
            }
            
            // Clear selected button states
            document.querySelectorAll('.area-button').forEach(btn => {
                btn.classList.remove('selected');
            });
        }

        function clearHoverEffects() {
            // Reset all interactive rectangles to transparent
            document.querySelectorAll('.clickable-area').forEach(rect => {
                rect.setAttribute('fill', 'transparent');
            });
        }

        // Navigation Functions
        function showMenu() {
            hideAllScreens();
            document.getElementById('menu-screen').style.display = 'block';
            currentMode = 'menu';
            clearSelectedArea();
            clearHoverEffects();
        }

        function showLearnMode() {
            hideAllScreens();
            document.getElementById('learn-screen').style.display = 'block';
            currentMode = 'learn';
            clearSelectedArea();
            clearHoverEffects();
            generateCourtSVG('learn-court', true);
            generateAreaButtons();
        }

        function startQuiz() {
            hideAllScreens();
            document.getElementById('quiz-screen').style.display = 'block';
            currentMode = 'quiz';
            clearSelectedArea();
            clearHoverEffects();
            
            // Set user info
            document.getElementById('user-name').textContent = userName;
            document.getElementById('user-dob').textContent = 'DOB: ' + userDOB;
            document.getElementById('final-user-name').textContent = userName;
            document.getElementById('final-user-dob').textContent = 'Date of Birth: ' + userDOB;
            
            // Reset quiz state
            currentQuestion = 0;
            quizScore = 0;
            updateQuizDisplay();
            generateCourtSVG('quiz-court', true);
        }

        function showResults() {
            hideAllScreens();
            document.getElementById('results-screen').style.display = 'block';
            
            const percentage = Math.round((quizScore / quizQuestions.length) * 100);
            document.getElementById('final-percentage').textContent = percentage + '%';
            document.getElementById('final-score').textContent = quizScore;
            document.getElementById('final-total').textContent = quizQuestions.length;
        }

        function retakeQuiz() {
            currentQuestion = 0;
            quizScore = 0;
            clearSelectedArea();
            clearHoverEffects();
            showQuizModal();
        }

        function hideAllScreens() {
            document.getElementById('menu-screen').style.display = 'none';
            document.getElementById('learn-screen').style.display = 'none';
            document.getElementById('quiz-screen').style.display = 'none';
            document.getElementById('results-screen').style.display = 'none';
        }

        // Court Generation
        function generateCourtSVG(containerId, interactive = false) {
            const container = document.getElementById(containerId);
            container.innerHTML = `
                <!-- Court background -->
                <rect x="50" y="20" width="200" height="440" fill="rgba(34, 197, 94, 0.1)" stroke="black" stroke-width="2"/>
                
                <!-- Doubles sidelines -->
                <line x1="50" y1="20" x2="50" y2="460" stroke="black" stroke-width="2"/>
                <line x1="250" y1="20" x2="250" y2="460" stroke="black" stroke-width="2"/>
                
                <!-- Singles sidelines -->
                <line x1="65" y1="20" x2="65" y2="460" stroke="black" stroke-width="2"/>
                <line x1="235" y1="20" x2="235" y2="460" stroke="black" stroke-width="2"/>
                
                <!-- Net (imaginary line) -->
                <line x1="50" y1="240" x2="250" y2="240" stroke="rgba(0, 0, 0, 0.3)" stroke-width="1" stroke-dasharray="5,5"/>
                
                <!-- Short service lines -->
                <line x1="50" y1="175" x2="250" y2="175" stroke="black" stroke-width="2"/>
                <line x1="50" y1="305" x2="250" y2="305" stroke="black" stroke-width="2"/>
                
                <!-- Long service lines for doubles -->
                <line x1="50" y1="45" x2="250" y2="45" stroke="black" stroke-width="2"/>
                <line x1="50" y1="435" x2="250" y2="435" stroke="black" stroke-width="2"/>
                
                <!-- Back boundary lines -->
                <line x1="50" y1="20" x2="250" y2="20" stroke="black" stroke-width="2"/>
                <line x1="50" y1="460" x2="250" y2="460" stroke="black" stroke-width="2"/>
                
                <!-- Center lines -->
                <line x1="150" y1="20" x2="150" y2="175" stroke="black" stroke-width="2"/>
                <line x1="150" y1="305" x2="150" y2="460" stroke="black" stroke-width="2"/>
            `;

            if (interactive) {
                addInteractiveAreas(container);
            }
        }

        function addInteractiveAreas(container) {
            const areas = [
                // Singles sidelines
                { id: 'singles_sideline', x: 60, y: 15, width: 10, height: 450 },
                { id: 'singles_sideline', x: 230, y: 15, width: 10, height: 450 },
                
                // Doubles sidelines
                { id: 'doubles_sideline', x: 45, y: 15, width: 10, height: 450 },
                { id: 'doubles_sideline', x: 245, y: 15, width: 10, height: 450 },
                
                // Short service lines
                { id: 'short_service_line', x: 45, y: 170, width: 210, height: 10 },
                { id: 'short_service_line', x: 45, y: 300, width: 210, height: 10 },
                
                // Long service lines doubles
                { id: 'long_service_line_doubles', x: 45, y: 40, width: 210, height: 10 },
                { id: 'long_service_line_doubles', x: 45, y: 430, width: 210, height: 10 },
                
                // Back boundary
                { id: 'back_boundary', x: 45, y: 15, width: 210, height: 10 },
                { id: 'back_boundary', x: 45, y: 455, width: 210, height: 10 },
                
                // Center lines
                { id: 'center_line', x: 145, y: 15, width: 10, height: 165 },
                { id: 'center_line', x: 145, y: 300, width: 10, height: 165 },
                
                // Service courts
                { id: 'right_service_court', x: 65, y: 45, width: 80, height: 130 },
                { id: 'left_service_court', x: 155, y: 45, width: 80, height: 130 },
                { id: 'left_service_court', x: 65, y: 305, width: 80, height: 130 },
                { id: 'right_service_court', x: 155, y: 305, width: 80, height: 130 }
            ];

            areas.forEach(area => {
                const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rect.setAttribute('x', area.x);
                rect.setAttribute('y', area.y);
                rect.setAttribute('width', area.width);
                rect.setAttribute('height', area.height);
                rect.setAttribute('fill', selectedArea === area.id ? courtAreas[area.id].color : 'transparent');
                rect.classList.add('clickable-area');
                
                rect.addEventListener('click', () => handleAreaClick(area.id));
                rect.addEventListener('mouseenter', () => {
                    if (selectedArea !== area.id) {
                        rect.setAttribute('fill', courtAreas[area.id].hoverColor);
                    }
                });
                rect.addEventListener('mouseleave', () => {
                    if (selectedArea !== area.id) {
                        rect.setAttribute('fill', 'transparent');
                    }
                });
                
                container.appendChild(rect);
            });
        }

        function handleAreaClick(areaId) {
            if (currentMode === 'learn') {
                selectedArea = areaId;
                showAreaInfo(areaId);
                generateCourtSVG('learn-court', true);
            } else if (currentMode === 'quiz') {
                currentAnswer = areaId;
                const correct = areaId === quizQuestions[currentQuestion].id;
                
                if (correct) {
                    quizScore++;
                }
                
                // Update score immediately after answering
                updateQuizDisplay();
                
                showResultModal(correct, courtAreas[quizQuestions[currentQuestion].id].name);
                
                setTimeout(() => {
                    hideResultModal();
                    if (currentQuestion < quizQuestions.length - 1) {
                        currentQuestion++;
                        updateQuizDisplay();
                        generateCourtSVG('quiz-court', true);
                    } else {
                        showResults();
                    }
                }, 1500);
            }
        }

        function showAreaInfo(areaId) {
            const area = courtAreas[areaId];
            document.getElementById('area-name').textContent = area.name;
            document.getElementById('area-description').textContent = area.description;
            document.getElementById('area-info').style.display = 'block';
            
            // Update button states
            document.querySelectorAll('.area-button').forEach(btn => {
                btn.classList.remove('selected');
            });
            document.querySelector(`[data-area="${areaId}"]`).classList.add('selected');
        }

        function generateAreaButtons() {
            const container = document.getElementById('area-buttons');
            container.innerHTML = '';
            
            Object.entries(courtAreas).forEach(([key, area]) => {
                const button = document.createElement('button');
                button.className = 'area-button';
                button.setAttribute('data-area', key);
                button.innerHTML = `
                    <span class="color-indicator" style="background-color: ${area.color.replace('0.3', '0.8').replace('0.2', '0.8')};"></span>
                    <span style="font-size: 14px; font-weight: 500;">${area.name}</span>
                `;
                button.addEventListener('click', () => {
                    selectedArea = key;
                    showAreaInfo(key);
                    generateCourtSVG('learn-court', true);
                });
                container.appendChild(button);
            });
        }

        function updateQuizDisplay() {
            document.getElementById('current-question').textContent = currentQuestion + 1;
            document.getElementById('total-questions').textContent = quizQuestions.length;
            
            // Show score as correct/answered (only show score after first question is answered)
            const questionsAnswered = currentMode === 'quiz' && currentAnswer ? currentQuestion + 1 : currentQuestion;
            document.getElementById('total-questions-score').textContent = Math.max(questionsAnswered, 0);
            document.getElementById('current-score').textContent = quizScore;
            document.getElementById('question-text').textContent = quizQuestions[currentQuestion].question;
        }

        function showResultModal(correct, correctAnswerName) {
            const modal = document.getElementById('result-modal');
            const content = document.getElementById('result-content');
            const icon = document.getElementById('result-icon');
            const title = document.getElementById('result-title');
            const description = document.getElementById('result-description');
            
            if (correct) {
                content.className = 'result-content correct';
                icon.textContent = '✓';
                icon.className = 'result-icon correct';
                title.textContent = 'Correct!';
            } else {
                content.className = 'result-content incorrect';
                icon.textContent = '✗';
                icon.className = 'result-icon incorrect';
                title.textContent = 'Incorrect';
            }
            
            description.textContent = correctAnswerName;
            modal.classList.add('show');
        }

        function hideResultModal() {
            document.getElementById('result-modal').classList.remove('show');
        }

        // Form Validation
        function updateStartButton() {
            const nameInput = document.getElementById('user-name-input');
            const dobInput = document.getElementById('user-dob-input');
            const startBtn = document.getElementById('start-quiz-btn');
            
            if (nameInput.value.trim() && dobInput.value) {
                startBtn.classList.remove('btn-disabled');
                startBtn.disabled = false;
            } else {
                startBtn.classList.add('btn-disabled');
                startBtn.disabled = true;
            }
        }

        // Event Listeners
        document.getElementById('user-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('user-name-input');
            const dobInput = document.getElementById('user-dob-input');
            
            if (nameInput.value.trim() && dobInput.value) {
                userName = nameInput.value.trim();
                userDOB = dobInput.value;
                
                closeQuizModal();
                startQuiz();
            }
        });

        document.getElementById('user-name-input').addEventListener('input', updateStartButton);
        document.getElementById('user-dob-input').addEventListener('input', updateStartButton);

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            generateCourtSVG('menu-screen .court-svg', false);
            updateStartButton();
        });
    </script>
</body>
</html>