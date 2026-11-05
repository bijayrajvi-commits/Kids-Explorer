<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Robot Baker's Recipe Rescue</title>
    <!-- Tailwind CSS for modern responsive layout -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts: Fredoka for cute kid-friendly typography -->
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Fredoka', cursive, sans-serif;
            user-select: none;
            -webkit-user-select: none;
        }
        .bouncing {
            animation: bounce 2s infinite ease-in-out;
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        .wobble {
            animation: wobble 0.4s ease-in-out;
        }
        @keyframes wobble {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-8px) rotate(-3deg); }
            75% { transform: translateX(8px) rotate(3deg); }
        }
        .pop-in {
            animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes popIn {
            0% { transform: scale(0.3); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        /* Custom scrollbar for inventory/treehouse */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 9999px;
        }
        ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 9999px;
        }
    </style>
</head>
<body class="bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 min-h-screen text-slate-700 flex flex-col items-center justify-between p-3 sm:p-6 overflow-x-hidden">

    <!-- Top Navigation & Header -->
    <header class="w-full max-w-4xl flex items-center justify-between bg-white/80 backdrop-blur-md px-4 py-3 rounded-3xl shadow-lg border-2 border-orange-100 mb-4 z-10">
        <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-orange-400 rounded-2xl flex items-center justify-center text-2xl shadow-md bouncing">🤖</div>
            <div>
                <h1 class="text-xl sm:text-2xl font-bold text-orange-600 tracking-wide">Chef Pip's Bakery</h1>
                <p class="text-xs sm:text-sm text-slate-400 font-semibold" id="level-subtitle">Level 1: The Linear Recipe</p>
            </div>
        </div>
        
        <div class="flex items-center gap-2 sm:gap-4">
            <!-- Treehouse / Rewards Button -->
            <button onclick="openTreehouseModal()" class="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-bold px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl shadow-md transform active:scale-95 transition flex items-center gap-2 text-sm sm:text-base border-b-4 border-rose-600">
                <span>🏡</span> <span class="hidden sm:inline">Treehouse</span> (<span id="sticker-count">0</span>)
            </button>
            <!-- Sound Toggle -->
            <button onclick="toggleSound()" id="sound-btn" class="w-11 h-11 bg-amber-100 hover:bg-amber-200 text-amber-700 font-bold rounded-2xl shadow-sm flex items-center justify-center text-xl transition active:scale-95 border-2 border-amber-300">
                🔊
            </button>
        </div>
    </header>

    <!-- Main Game Arena -->
    <main class="w-full max-w-4xl flex-1 flex flex-col items-center justify-center relative my-2">
        
        <!-- Level Progress Indicator -->
        <div class="flex items-center gap-2 mb-4 bg-white/60 px-4 py-2 rounded-full shadow-sm border border-orange-100">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Progress:</span>
            <div class="flex gap-1.5" id="progress-dots">
                <!-- Injected via JS -->
            </div>
        </div>

        <!-- Dynamic Game Container -->
        <div id="game-container" class="w-full bg-white rounded-3xl shadow-xl border-4 border-orange-100 p-4 sm:p-8 flex flex-col items-center relative min-h-[420px] sm:min-h-[480px] justify-between transition-all duration-300">
            <!-- Content loaded dynamically based on active level -->
        </div>

        <!-- Character Helper Speech Bubble -->
        <div class="w-full max-w-2xl mt-4 bg-amber-100/90 border-2 border-amber-300 rounded-3xl p-3 sm:p-4 shadow-md flex items-center gap-4 relative pop-in">
            <div class="text-3xl sm:text-4xl bg-white w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-inner flex-shrink-0 bouncing" id="helper-avatar">🤖</div>
            <div class="flex-1">
                <h4 class="text-xs sm:text-sm font-bold text-orange-700 uppercase tracking-wide" id="helper-name">Chef Pip</h4>
                <p class="text-sm sm:text-base font-semibold text-slate-700" id="helper-speech">"Let's get baking! Follow the recipe steps in the right order!"</p>
            </div>
        </div>

    </main>

    <!-- Footer / Creator Note -->
    <footer class="w-full max-w-4xl text-center py-3 text-xs text-slate-400 font-medium">
        The Robot Baker's Recipe Rescue • Designed for Kids Ages 5-7 🧁✨
    </footer>

    <!-- Treehouse / Reward Modal -->
    <div id="treehouse-modal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
        <div class="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 border-4 border-orange-200 pop-in flex flex-col max-h-[90vh]">
            <div class="flex items-center justify-between mb-4 pb-2 border-b-2 border-orange-100">
                <div class="flex items-center gap-3">
                    <span class="text-3xl">🏡</span>
                    <div>
                        <h3 class="text-xl font-bold text-orange-600">The Virtual Bakery Treehouse</h3>
                        <p class="text-xs text-slate-400 font-semibold">Your collected rewards and animal friends!</p>
                    </div>
                </div>
                <button onclick="closeTreehouseModal()" class="w-10 h-10 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl flex items-center justify-center text-lg transition">✕</button>
            </div>

            <!-- Treehouse Canvas/Visual Grid -->
            <div id="treehouse-canvas" class="flex-1 bg-gradient-to-b from-sky-100 to-amber-100 rounded-2xl p-4 border-2 border-amber-200 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-4 min-h-[260px] items-center justify-items-center">
                <!-- Populated dynamically -->
            </div>

            <div class="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                <span class="text-sm font-bold text-slate-500" id="treehouse-status">Unlocked: 0 / 5 Rewards</span>
                <button onclick="closeTreehouseModal()" class="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-2xl shadow-md transition text-sm">Keep Playing</button>
            </div>
        </div>
    </div>

    <!-- Celebration Modal (Level Complete) -->
    <div id="celebration-modal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
        <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border-4 border-amber-300 pop-in text-center flex flex-col items-center">
            <div class="text-6xl mb-2 bouncing">🎉</div>
            <h3 class="text-2xl font-bold text-orange-600 mb-1" id="celeb-title">Recipe Mastered!</h3>
            <p class="text-sm text-slate-500 mb-6 font-medium" id="celeb-desc">You helped Chef Pip bake delicious treats!</p>
            
            <div id="reward-badge-preview" class="w-24 h-24 bg-gradient-to-br from-amber-200 to-orange-300 rounded-3xl flex items-center justify-center text-5xl shadow-lg mb-6 border-4 border-white">
                ⭐
            </div>

            <button onclick="advanceLevel()" class="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg text-lg transform active:scale-95 transition border-b-4 border-orange-700">
                Next Recipe! 🚀
            </button>
        </div>
    </div>

    <!-- JavaScript Game Logic -->
    <script>
        // --- Web Audio API Sound Synthesizer ---
        let soundEnabled = true;
        let audioCtx = null;

        function initAudio() {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
        }

        function playSound(type) {
            if (!soundEnabled) return;
            initAudio();
            if (!audioCtx) return;

            const now = audioCtx.currentTime;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            if (type === 'pop' || type === 'click') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(400, now);
                osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
                gain.gain.setValueAtTime(0.3, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
            } else if (type === 'success') {
                // Success chimes
                const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
                notes.forEach((freq, idx) => {
                    const o = audioCtx.createOscillator();
                    const g = audioCtx.createGain();
                    o.connect(g);
                    g.connect(audioCtx.destination);
                    o.type = 'triangle';
                    o.frequency.setValueAtTime(freq, now + idx * 0.08);
                    g.gain.setValueAtTime(0.25, now + idx * 0.08);
                    g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);
                    o.start(now + idx * 0.08);
                    o.stop(now + idx * 0.08 + 0.25);
                });
            } else if (type === 'error') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(180, now);
                osc.frequency.linearRampToValueAtTime(120, now + 0.25);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
                osc.start(now);
                osc.stop(now + 0.25);
            } else if (type === 'robot') {
                osc.type = 'square';
                osc.frequency.setValueAtTime(300, now);
                osc.frequency.setValueAtTime(600, now + 0.05);
                gain.gain.setValueAtTime(0.15, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
                osc.start(now);
                osc.stop(now + 0.15);
            }
        }

        function toggleSound() {
            soundEnabled = !soundEnabled;
            const btn = document.getElementById('sound-btn');
            btn.textContent = soundEnabled ? '🔊' : '🔇';
            playSound('click');
        }

        // --- Game State ---
        let currentLevel = 1; // 1 to 5
        const totalLevels = 5;
        let unlockedRewards = []; // Store reward objects/ids

        const levelMetadata = {
            1: { title: "Level 1: Linear Recipe", subtitle: "Tap steps in correct order (1, 2, 3)", helper: "Chef Pip", avatar: "🤖" },
            2: { title: "Level 2: The Oven Branch", subtitle: "Choose the right tool for the job (If/Else)", helper: "Bake-O the Bear", avatar: "🐻" },
            3: { title: "Level 3: The Cookie Loop", subtitle: "Use loops to stamp cookies 5 times!", helper: "Chef Pip", avatar: "🤖" },
            4: { title: "Level 4: Debug Inspector", subtitle: "Find and fix the swapped recipe steps!", helper: "Bake-O the Bear", avatar: "🐻" },
            5: { title: "Level 5: Master Chef Station", subtitle: "Build the complete cake assembly line!", helper: "Chef Pip", avatar: "🤖" }
        };

        const levelRewards = {
            1: { id: 'hat', name: "Chef's Hat", icon: "🎩", desc: "Chef Pip's stylish starter hat!" },
            2: { id: 'mitts', name: "Oven Mitts", icon: "🧤", desc: "Safe paws for hot oven trays!" },
            3: { id: 'cutter', name: "Cookie Cutter", icon: "⭐", desc: "Magic star cookie stamp!" },
            4: { id: 'frosting', name: "Rainbow Frosting", icon: "🧁", desc: "Sweet colorful toppings!" },
            5: { id: 'crown', name: "Master Crown", icon: "👑", desc: "The ultimate Baker Crown!" }
        };

        // --- Initialize App ---
        window.onload = function() {
            renderProgressDots();
            loadLevel(currentLevel);
        };

        function renderProgressDots() {
            const container = document.getElementById('progress-dots');
            container.innerHTML = '';
            for (let i = 1; i <= totalLevels; i++) {
                const dot = document.createElement('div');
                dot.className = `w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i === currentLevel 
                        ? 'bg-orange-500 text-white ring-4 ring-orange-200 scale-110' 
                        : i < currentLevel 
                        ? 'bg-emerald-50text-emerald-600 border-2 border-emerald-300' 
                        : 'bg-slate-100 text-slate-400'
                }`;
                dot.textContent = i < currentLevel ? '✓' : i;
                container.appendChild(dot);
            }
        }

        function loadLevel(level) {
            currentLevel = level;
            renderProgressDots();
            
            const meta = levelMetadata[level];
            document.getElementById('level-subtitle').textContent = meta.title;
            document.getElementById('helper-name').textContent = meta.helper;
            document.getElementById('helper-avatar').textContent = meta.avatar;

            const container = document.getElementById('game-container');
            container.innerHTML = '';

            switch(level) {
                case 1: setupLevel1(container); break;
                case 2: setupLevel2(container); break;
                case 3: setupLevel3(container); break;
                case 4: setupLevel4(container); break;
                case 5: setupLevel5(container); break;
            }
        }

        function setSpeech(text) {
            document.getElementById('helper-speech').textContent = `"${text}"`;
        }

        // ==========================================
        // LEVEL 1: Linear Order (Tap in sequence)
        // ==========================================
        function setupLevel1(container) {
            setSpeech("Let's bake bread! Tap the steps in the correct 1-2-3 order.");
            
            const steps = [
                { id: 1, name: "Wash Hands", icon: "🧼", order: 1 },
                { id: 2, name: "Grab Bowl", icon: "🥣", order: 2 },
                { id: 3, name: "Pour Flour", icon: "🌾", order: 3 }
            ];
            // Shuffle for gameplay
            const shuffled = [...steps].sort(() => Math.random() - 0.5);

            let expectedNext = 1;

            const header = document.createElement('div');
            header.className = "text-center mb-4";
            header.innerHTML = `<h3 class="text-xl font-bold text-slate-700">Step <span id="l1-step">1</span> of 3: What comes first?</h3>`;
            container.appendChild(header);

            const grid = document.createElement('div');
            grid.className = "grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl my-auto";

            shuffled.forEach(step => {
                const card = document.createElement('button');
                card.className = "bg-orange-50 hover:bg-orange-100 border-3 border-orange-200 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 shadow-sm transform active:scale-95 transition cursor-pointer group";
                card.innerHTML = `
                    <span class="text-5xl group-hover:scale-110 transition">${step.icon}</span>
                    <span class="font-bold text-lg text-orange-800">${step.name}</span>
                `;
                card.onclick = () => {
                    if (step.order === expectedNext) {
                        playSound('pop');
                        card.classList.add('opacity-40', 'pointer-events-none', 'bg-emerald-100', 'border-emerald-300');
                        expectedNext++;
                        if (expectedNext > 3) {
                            playSound('success');
                            triggerLevelComplete();
                        } else {
                            document.getElementById('l1-step').textContent = expectedNext;
                            setSpeech("Great job! What's next in the recipe?");
                        }
                    } else {
                        playSound('error');
                        card.classList.add('wobble');
                        setTimeout(() => card.classList.remove('wobble'), 400);
                        setSpeech("Oops! Check the recipe order. Try a different step!");
                    }
                };
                grid.appendChild(card);
            });
            container.appendChild(grid);
        }

        // ==========================================
        // LEVEL 2: Two-Branch Split (If / Else condition)
        // ==========================================
        let l2Step = 1;
        function setupLevel2(container) {
            l2Step = 1;
            setSpeech("Chef Pip's oven is super hot! How do we put the tray in safely?");

            container.innerHTML = `
                <div class="text-center mb-2">
                    <h3 class="text-xl font-bold text-slate-700">Condition Check: Oven is <span class="text-red-500">HOT 🔥</span></h3>
                </div>
                <div class="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-2xl my-auto">
                    <div class="bg-amber-50 border-4 border-amber-200 rounded-3xl p-6 flex flex-col items-center justify-center w-48 h-48 shadow-md">
                        <span class="text-6xl bouncing">🔥</span>
                        <span class="font-bold text-amber-800 mt-2">Hot Oven</span>
                    </div>
                    <div class="text-4xl text-orange-400 font-bold">➔</div>
                    <div id="l2-dropzone" class="w-full sm:w-64 h-48 border-4 border-dashed border-orange-300 rounded-3xl bg-orange-50/50 flex flex-col items-center justify-center p-4 text-center cursor-pointer transition">
                        <span class="text-4xl mb-1">❓</span>
                        <span class="text-sm font-bold text-orange-700">Drag or Tap correct protective tool here!</span>
                    </div>
                </div>
                <div class="flex gap-4 mt-4" id="l2-options">
                    <!-- populated -->
                </div>
            `;

            const optionsContainer = document.getElementById('l2-options');
            const choices = [
                { id: 'mitts', name: "Oven Mitts", icon: "🧤", correct: true },
                { id: 'bare', name: "Bare Hands", icon: "🖐️", correct: false }
            ].sort(() => Math.random() - 0.5);

            choices.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = "bg-white hover:bg-orange-50 border-3 border-orange-200 rounded-2xl px-6 py-3 font-bold text-orange-800 shadow-sm flex items-center gap-3 text-lg transform active:scale-95 transition";
                btn.innerHTML = `<span>${opt.icon}</span> <span>${opt.name}</span>`;
                btn.onclick = () => {
                    if (opt.correct) {
                        playSound('success');
                        document.getElementById('l2-dropzone').innerHTML = `<span class="text-6xl">${opt.icon}</span><span class="font-bold text-emerald-600 mt-2">Safe & Protected!</span>`;
                        document.getElementById('l2-dropzone').className = "w-full sm:w-64 h-48 border-4 border-emerald-300 rounded-3xl bg-emerald-50 flex flex-col items-center justify-center p-4 text-center pop-in";
                        optionsContainer.innerHTML = '';
                        setTimeout(() => triggerLevelComplete(), 1200);
                    } else {
                        playSound('error');
                        btn.classList.add('wobble');
                        setTimeout(() => btn.classList.remove('wobble'), 400);
                        setSpeech("Ouch! Bare hands will get too hot! Use protective mitts.");
                    }
                };
                optionsContainer.appendChild(btn);
            });
        }

        // ==========================================
        // LEVEL 3: Repeating Loop Block
        // ==========================================
        let l3Count = 0;
        const targetLoopCount = 5;
        function setupLevel3(container) {
            l3Count = 0;
            setSpeech("Instead of stamping 1 by 1, wrap a Loop Block around the cookie stamp!");

            container.innerHTML = `
                <div class="text-center mb-2">
                    <h3 class="text-xl font-bold text-slate-700">Cookie Stamp Assembly Line</h3>
                    <p class="text-sm text-slate-400">Target Cookies: <span class="text-orange-600 font-bold" id="l3-target">0</span> / 5</p>
                </div>
                
                <div class="w-full max-w-xl bg-orange-50 border-3 border-orange-200 rounded-3xl p-6 flex flex-col items-center gap-4 my-auto">
                    <!-- Loop Box UI -->
                    <div class="w-full bg-white border-2 border-orange-300 rounded-2xl p-4 flex items-center justify-between shadow-inner">
                        <div class="flex items-center gap-3">
                            <span class="text-3xl bg-amber-100 p-2 rounded-xl">🔁</span>
                            <div>
                                <h4 class="font-bold text-orange-700 text-sm">REPEAT LOOP BLOCK</h4>
                                <p class="text-xs text-slate-400">Action: Stamp Cookie Star</p>
                            </div>
                        </div>
                        <div class="bg-orange-500 text-white font-bold px-4 py-2 rounded-xl text-lg shadow-sm">
                            5 TIMES
                        </div>
                    </div>

                    <!-- Visual Tray of Cookies -->
                    <div id="l3-tray" class="grid grid-cols-5 gap-3 w-full py-4 bg-white/60 rounded-2xl p-4 border border-orange-100 min-h-[90px] items-center justify-items-center">
                        <!-- Filled dynamically -->
                    </div>
                </div>

                <button id="l3-btn" onclick="executeLoopStep()" class="mt-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 px-8 rounded-2xl shadow-md text-lg transform active:scale-95 transition border-b-4 border-orange-700 flex items-center gap-2">
                    <span>⚡ Run Loop (Stamp 5x)</span>
                </button>
            `;
        }

        function executeLoopStep() {
            playSound('robot');
            const tray = document.getElementById('l3-tray');
            tray.innerHTML = '';
            
            for (let i = 0; i < targetLoopCount; i++) {
                const cookie = document.createElement('div');
                cookie.className = "text-3xl pop-in";
                cookie.style.animationDelay = `${i * 0.1}s`;
                cookie.textContent = "⭐";
                tray.appendChild(cookie);
            }
            
            document.getElementById('l3-target').textContent = targetLoopCount;
            document.getElementById('l3-btn').disabled = true;
            document.getElementById('l3-btn').classList.add('opacity-50', 'pointer-events-none');
            
            playSound('success');
            setSpeech("Amazing! The loop finished all 5 cookies in a flash!");
            setTimeout(() => triggerLevelComplete(), 1400);
        }

        // ==========================================
        // LEVEL 4: Debugging Broken Recipe
        // ==========================================
        let l4Steps = [
            { id: 1, text: "Bake Cake in Oven", icon: "🔥", correctPos: 2 },
            { id: 2, text: "Add Sweet Frosting", icon: "🧁", correctPos: 1 }
        ]; // Out of order intentionally

        function setupLevel4(container) {
            setSpeech("Uh oh! Chef Pip put the frosting BEFORE baking! Swap them to fix the bug!");

            container.innerHTML = `
                <div class="text-center mb-2">
                    <h3 class="text-xl font-bold text-slate-700">Bug Inspector: Fix the Timeline</h3>
                    <p class="text-sm text-slate-400">Tap the two steps to swap their order!</p>
                </div>

                <div id="l4-timeline" class="flex flex-col sm:flex-row gap-4 w-full max-w-2xl my-auto items-center justify-center">
                    <!-- Injected -->
                </div>

                <button onclick="checkDebugOrder()" class="mt-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 px-8 rounded-2xl shadow-md text-lg transform active:scale-95 transition border-b-4 border-orange-700">
                    Check Recipe Order ✨
                </button>
            `;
            renderL4Timeline();
        }

        function renderL4Timeline() {
            const container = document.getElementById('l4-timeline');
            container.innerHTML = '';
            l4Steps.forEach((step, idx) => {
                const card = document.createElement('div');
                card.className = "bg-orange-50 hover:bg-orange-100 border-3 border-orange-300 rounded-3xl p-5 flex items-center gap-4 w-full sm:w-72 shadow-sm cursor-pointer transition";
                card.innerHTML = `
                    <span class="text-3xl bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner">${step.icon}</span>
                    <div class="flex-1">
                        <span class="text-xs font-bold text-orange-500 uppercase">Step ${idx + 1}</span>
                        <h4 class="font-bold text-slate-700 text-sm sm:text-base">${step.text}</h4>
                    </div>
                    <span class="text-xl text-orange-400">⇄</span>
                `;
                card.onclick = () => {
                    playSound('pop');
                    // Swap with other element
                    const otherIdx = idx === 0 ? 1 : 0;
                    const temp = l4Steps[0];
                    l4Steps[0] = l4Steps[1];
                    l4Steps[1] = temp;
                    renderL4Timeline();
                };
                container.appendChild(card);
            });
        }

        function checkDebugOrder() {
            // Correct order: 1. Add Frosting? Wait, baking comes first, frosting comes second.
            // Let's check: l4Steps[0].text should be "Bake Cake in Oven"
            if (l4Steps[0].text.includes("Bake")) {
                playSound('success');
                setSpeech("Bug fixed! Bake first, then add sweet frosting!");
                setTimeout(() => triggerLevelComplete(), 1200);
            } else {
                playSound('error');
                setSpeech("Not quite right! Can you frost a cake before baking it in the hot oven? Try swapping!");
            }
        }

        // ==========================================
        // LEVEL 5: Master Chef Station (Multi-step)
        // ==========================================
        function setupLevel5(container) {
            setSpeech("Final Master Challenge! Build the complete birthday cake script!");

            const requiredTasks = ["Mix Batter", "Bake in Oven", "Add Frosting", "Top with Candle"];
            let completedTasks = [];

            container.innerHTML = `
                <div class="text-center mb-2">
                    <h3 class="text-xl font-bold text-slate-700">Master Chef Multi-Station Assembly</h3>
                    <p class="text-sm text-slate-400">Complete all 4 stations in correct order!</p>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl my-auto" id="l5-stations">
                    <!-- Stations injected -->
                </div>
            `;

            const stationsGrid = document.getElementById('l5-stations');
            const shuffledTasks = [
                { name: "Add Frosting", icon: "🧁", idx: 2 },
                { name: "Mix Batter", icon: "🥣", idx: 0 },
                { name: "Top with Candle", icon: "🕯️", idx: 3 },
                { name: "Bake in Oven", icon: "🔥", idx: 1 }
            ].sort((a,b) => a.idx - b.idx); // Actually let's list them shuffled for user to tap sequentially

            const gameTasks = [...shuffledTasks].sort(() => Math.random() - 0.5);
            let nextIndexToTap = 0;

            gameTasks.forEach(task => {
                const card = document.createElement('button');
                card.className = "bg-orange-50 hover:bg-orange-100 border-3 border-orange-200 rounded-3xl p-4 flex flex-col items-center justify-center gap-2 shadow-sm transform active:scale-95 transition cursor-pointer";
                card.innerHTML = `
                    <span class="text-4xl">${task.icon}</span>
                    <span class="font-bold text-xs sm:text-sm text-orange-800 text-center">${task.name}</span>
                `;
                card.onclick = () => {
                    if (task.idx === nextIndexToTap) {
                        playSound('pop');
                        card.classList.add('opacity-40', 'pointer-events-none', 'bg-emerald-100', 'border-emerald-300');
                        nextIndexToTap++;
                        if (nextIndexToTap === 4) {
                            playSound('success');
                            setSpeech("Incredible! You completed the Master Chef Birthday Cake!");
                            setTimeout(() => triggerLevelComplete(), 1400);
                        } else {
                            setSpeech(`Station ${nextIndexToTap} complete! Keep going!`);
                        }
                    } else {
                        playSound('error');
                        card.classList.add('wobble');
                        setTimeout(() => card.classList.remove('wobble'), 400);
                        setSpeech("Check the sequence! What station is needed next?");
                    }
                };
                stationsGrid.appendChild(card);
            });
        }

        // ==========================================
        // Rewards & Level Completion
        // ==========================================
        function triggerLevelComplete() {
            const reward = levelRewards[currentLevel];
            if (!unlockedRewards.some(r => r.id === reward.id)) {
                unlockedRewards.push(reward);
            }
            document.getElementById('sticker-count').textContent = unlockedRewards.length;

            document.getElementById('celeb-title').textContent = `Level ${currentLevel} Mastered!`;
            document.getElementById('celeb-desc').textContent = `You earned the "${reward.name}" reward for your Treehouse!`;
            document.getElementById('reward-badge-preview').textContent = reward.icon;

            document.getElementById('celebration-modal').classList.remove('hidden');
        }

        function advanceLevel() {
            document.getElementById('celebration-modal').classList.add('hidden');
            if (currentLevel < totalLevels) {
                currentLevel++;
                loadLevel(currentLevel);
            } else {
                // Game finished loop back or show final congrats
                currentLevel = 1;
                loadLevel(currentLevel);
                openTreehouseModal();
            }
        }

        // ==========================================
        // Treehouse Modal
        // ==========================================
        function openTreehouseModal() {
            playSound('click');
            const canvas = document.getElementById('treehouse-canvas');
            canvas.innerHTML = '';

            const allRewardsList = Object.values(levelRewards);
            allRewardsList.forEach(rew => {
                const isUnlocked = unlockedRewards.some(r => r.id === rew.id);
                const item = document.createElement('div');
                item.className = `w-32 h-32 rounded-3xl flex flex-col items-center justify-center p-3 text-center border-3 transition ${
                    isUnlocked 
                        ? 'bg-white border-orange-300 shadow-md pop-in' 
                        : 'bg-slate-200/50 border-slate-300 opacity-60'
                }`;
                item.innerHTML = `
                    <span class="text-4xl mb-1">${isUnlocked ? rew.icon : '🔒'}</span>
                    <h5 class="font-bold text-xs text-slate-700">${rew.name}</h5>
                    <p class="text-[10px] text-slate-400 mt-0.5">${isUnlocked ? rew.desc : 'Complete Level'}</p>
                `;
                canvas.appendChild(item);
            });

            document.getElementById('treehouse-status').textContent = `Unlocked: ${unlockedRewards.length} / ${allRewardsList.length} Rewards`;
            document.getElementById('treehouse-modal').classList.remove('hidden');
        }

        function closeTreehouseModal() {
            playSound('click');
            document.getElementById('treehouse-modal').classList.add('hidden');
        }
    </script>
</body>
</html>