import React, { useState } from 'react';
import './App.css';
import CryptoJS from 'crypto-js';
import Chart from 'chart.js/auto';
import AlgorithmsOverviewPage from './AlgorithmsOverviewPage';

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app cryptolearn-main">
      <YESContainer />
    </div>
  );
}

// PUBLIC_INTERFACE
function YESContainer() {
  // Tab options: Caesar, AES, SHA-256, Performance
  const [selectedTab, setSelectedTab] = useState('Caesar');
  // For mobile, this could be a drawer, but here styled as a responsive sidebar/topnav
  const tabs = [
    { name: 'Caesar', label: 'Caesar Cipher' },
    { name: 'AES', label: 'AES-128' },
    { name: 'SHA256', label: 'SHA-256 Hash' },
    { name: 'Performance', label: 'Performance Chart' },
  ];

  // Render main navigation/sidebar and responsive container
  return (
    <>
      <Navbar />
      <div className="cryptolearn-layout">
        <nav className="cryptolearn-sidebar" aria-label="Algorithm navigation">
          <ul>
            {tabs.map(tab => (
              <li
                key={tab.name}
                className={selectedTab === tab.name ? 'active' : ''}
                onClick={() => setSelectedTab(tab.name)}
                tabIndex={0}
                aria-label={tab.label}
                style={{ cursor: 'pointer' }}
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </nav>
        <main className="cryptolearn-content">
          {selectedTab === 'Caesar' && <CaesarCipherSimulator />}
          {selectedTab === 'AES' && <AESSimulator />}
          {selectedTab === 'SHA256' && <SHA256Simulator />}
          {selectedTab === 'Performance' && <PerformanceChartSection />}
        </main>
      </div>
      <footer style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '16px 0', fontSize: '0.92rem' }}>
        YES © {new Date().getFullYear()} &mdash; Educational Purposes Only
      </footer>
    </>
  );
}

// --- NAVBAR ---
function Navbar() {
  return (
    <nav className="navbar cryptolearn-navbar">
      <div className="container" style={{maxWidth: 1200, width: '100%', margin: '0 auto'}}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div className="logo">
            <span className="logo-symbol" style={{color: 'var(--accent)'}}>*</span>{' '}
            <span style={{color: 'var(--secondary)'}}>YES</span>
          </div>
          <a href="https://github.com/" style={{color:"var(--accent)", fontWeight: 500, textDecoration:"none"}} target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </nav>
  );
}

// --- CAESAR CIPHER SIMULATOR ---
function CaesarCipherSimulator() {
  const [plaintext, setPlaintext] = useState('');
  const [shift, setShift] = useState(3);
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encrypt');
  const [showAnimation, setShowAnimation] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [animStep, setAnimStep] = useState(0);
  const [animStates, setAnimStates] = useState([]);
  const [animating, setAnimating] = useState(false);

  // Algorithm visual steps generation
  function computeCaesarSteps(text, shiftAmt, encryptMode) {
    const results = [];
    for (let i = 0; i < text.length; i++) {
      const originalChar = text[i];
      let resultChar = originalChar;
      const isLetter = /[a-z]/i.test(originalChar);
      if (isLetter) {
        const a = originalChar === originalChar.toLowerCase() ? 97 : 65;
        const shiftNorm = encryptMode ? shiftAmt : (26 - shiftAmt);
        resultChar = String.fromCharCode(((originalChar.charCodeAt(0) - a + shiftNorm) % 26) + a);
      }
      results.push({
        idx: i,
        originalChar,
        resultChar,
      });
    }
    return results;
  }

  function handleStartAnim() {
    setAnimStep(0);
    const steps = computeCaesarSteps(plaintext, shift, mode === 'encrypt');
    setAnimStates(steps);
    setShowAnimation(true);
    setAnimating(true);
    stepAnimation(0, steps);
  }

  function stepAnimation(step, arr) {
    setAnimStep(step);
    if (step < arr.length - 1 && animating) {
      setTimeout(() => {
        stepAnimation(step + 1, arr);
      }, speed);
    } else {
      setTimeout(() => {
        setAnimating(false);
      }, speed);
    }
  }

  function handleStopAnim() {
    setAnimating(false);
  }
  function handleAnimSpeedChange(e) {
    setSpeed(Number(e.target.value));
  }
  function handleModeChange(e) {
    setMode(e.target.value);
    setOutput('');
    setShowAnimation(false);
    setAnimStates([]);
    setAnimStep(0);
  }
  function handlePlaintextChange(e) {
    setPlaintext(e.target.value.replace(/[^a-zA-Z ]/g, '')); // Only simple letters for demo
    setShowAnimation(false);
  }
  function handleShiftChange(e) {
    let value = Number(e.target.value);
    if (isNaN(value) || value < 0) value = 0;
    if (value > 25) value = 25;
    setShift(value);
    setShowAnimation(false);
  }
  function handleInstantCompute() {
    const arr = computeCaesarSteps(plaintext, shift, mode === 'encrypt');
    setOutput(arr.map(({ resultChar }) => resultChar).join(''));
    setShowAnimation(false);
  }

  return (
    <div className="cryptolearn-section">
      <h2 className="cryptolearn-section-title">Caesar Cipher Simulator</h2>
      <div className="cryptolearn-input-block">
        <label>Plaintext:</label>
        <input type="text" value={plaintext} maxLength={36} onChange={handlePlaintextChange} placeholder="Enter text" autoFocus />
        <label style={{marginLeft:8}}>Shift (0-25):</label>
        <input type="number" value={shift} min={0} max={25} onChange={handleShiftChange} style={{width:70}} />
        <select value={mode} style={{marginLeft:12}} onChange={handleModeChange}>
          <option value="encrypt">Encrypt</option>
          <option value="decrypt">Decrypt</option>
        </select>
        <button className="btn" style={{marginLeft:12}} onClick={handleInstantCompute}>Compute</button>
        <button className="btn" style={{marginLeft:12, backgroundColor:'var(--accent)'}} onClick={handleStartAnim} disabled={!plaintext || animating}>Animate Steps</button>
        <label style={{marginLeft:10, color:"var(--text-secondary)"}}>
          Speed
          <input type="range" min="200" max="1000" value={speed} onChange={handleAnimSpeedChange} style={{verticalAlign:'middle', marginLeft:4}}/>
        </label>
        {animating ? (
          <button className="btn" style={{marginLeft:12, backgroundColor:"#ddd", color:"#111"}} onClick={handleStopAnim}>Pause</button>
        ) : null}
      </div>
      <div className="cryptolearn-output-block">
        <label>Result:</label>
        <output style={{marginLeft:8, fontWeight:600}}>
          {output && !showAnimation ? output : (showAnimation ? animStates.slice(0, animStep + 1).map((step, i) =>
            <span key={i} style={{color:'var(--accent)', fontWeight:'bold'}}>{step.resultChar}</span>
          ) : '')}
        </output>
      </div>
      {showAnimation && (
        <div className="cryptolearn-visualization">
          <CaesarCipherCanvas steps={animStates} animStep={animStep} />
        </div>
      )}
      <EducationalContentAndQuiz algorithm="Caesar"/>
    </div>
  );
}

// Visualization Canvas for Caesar Cipher
function CaesarCipherCanvas({ steps, animStep }) {
  // Re-render with each animation step, showing glyphs transformation
  return (
    <div
      style={{
        width: "100%",
        margin: "12px auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 48,
        fontSize: "1.2rem",
        letterSpacing: "0.12em",
        background: "rgba(34, 211, 238, 0.05)",
        border: "1.5px solid var(--accent)",
        borderRadius: 8,
        padding: 12
      }}
    >
      {steps.slice(0, animStep + 1).map((step, idx) =>
        <span
          key={idx}
          style={{
            color: idx === animStep ? "var(--secondary)" : "var(--text-color)",
            fontWeight: idx === animStep ? "bold" : 500,
            transition: "color 0.2s, font-weight 0.2s",
            background: idx === animStep ? "var(--accent)" : "transparent",
            borderRadius: 2,
            marginRight: 2,
            padding: idx === animStep ? "0 4px" : "0",
          }}>
          {step.originalChar}→{step.resultChar}&nbsp;
        </span>
      )}
    </div>
  );
}

 // --- AES SIMULATOR ---
function AESSimulator() {
  const [plaintext, setPlaintext] = useState('');
  const [key, setKey] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encrypt');
  const [status, setStatus] = useState('');
  const [showAnim, setShowAnim] = useState(false);
  const [keyTouched, setKeyTouched] = useState(false);

  function handlePlaintextChange(e) {
    setPlaintext(e.target.value);
  }

  function handleKeyChange(e) {
    setKey(e.target.value);
    if (!keyTouched) setKeyTouched(true);
  }

  function handleKeyBlur() {
    setKeyTouched(true);
  }

  function handleModeChange(e) {
    setMode(e.target.value);
    setOutput('');
    setShowAnim(false);
    setStatus('');
  }

  function validateInputs() {
    if (key.length !== 16) {
      setStatus("AES-128 requires a 16-character key.");
      return false;
    }
    setStatus("");
    return true;
  }

  function handleCompute() {
    if (!validateInputs()) return;
    try {
      let res;
      if (mode === 'encrypt') {
        res = CryptoJS.AES.encrypt(plaintext, key).toString();
      } else {
        const bytes = CryptoJS.AES.decrypt(plaintext, key);
        res = bytes.toString(CryptoJS.enc.Utf8);
        if (!res) throw new Error('Wrong key or corrupt input');
      }
      setOutput(res);
      setShowAnim(true);
      setStatus('Success');
    } catch (e) {
      setOutput('');
      setStatus('Error: ' + e.message);
    }
  }

  // Always show the Key input field when AES is selected, and provide live validation for 16-char length.
  // Refactored so that the input lines are: 1) Plaintext, 2) Key input, 3) Button(s) (Compute).
  return (
    <div className="cryptolearn-section">
      <h2 className="cryptolearn-section-title">AES-128 Simulator</h2>
      <div
        className="cryptolearn-input-block"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 0,
          paddingBottom: 0
        }}
      >
        {/* First line: Plaintext */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            flexWrap: "wrap",
            gap: 0,
            paddingBottom: 8
          }}
        >
          <label>Plaintext / Ciphertext:</label>
          <input
            type="text"
            value={plaintext}
            onChange={handlePlaintextChange}
            style={{ width: "40%", marginLeft: 4 }}
          />
        </div>
        {/* Second line: Key input */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            marginTop: 4,
            flexWrap: "wrap"
          }}
        >
          <label>Key (16 chars):</label>
          <input
            type="text"
            value={key}
            maxLength={16}
            minLength={16}
            onBlur={handleKeyBlur}
            onChange={handleKeyChange}
            style={{
              width: 180,
              fontFamily: 'monospace',
              marginLeft: 4,
              borderColor:
                keyTouched && key.length !== 16
                  ? 'red'
                  : 'var(--accent)',
              outline: keyTouched
                ? key.length !== 16
                  ? '2.5px solid red'
                  : '2.5px solid var(--accent)'
                : '',
              background: "#181826",
              color: 'var(--text-color)',
              zIndex: 12, // ensure above overlays
              position: "relative", // ensure stacking
              boxShadow: "0 0 0 2px rgba(34,211,238,0.1)"
            }}
            aria-label="AES key input"
            aria-invalid={keyTouched && key.length !== 16}
            autoFocus
          />
          {keyTouched && key.length !== 16 && (
            <span
              style={{
                color: 'red',
                fontSize: '0.96rem',
                marginLeft: 8,
                fontWeight: 500
              }}
              role="alert"
              aria-live="polite"
            >
              Key must be exactly 16 characters
            </span>
          )}
        </div>
        {/* Third line: Mode select and Compute buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            marginTop: 8,
            flexWrap: "wrap"
          }}
        >
          <select value={mode} style={{ marginLeft: 0 }} onChange={handleModeChange}>
            <option value="encrypt">Encrypt</option>
            <option value="decrypt">Decrypt</option>
          </select>
          <button
            className="btn"
            style={{ marginLeft: 16 }}
            onClick={handleCompute}
            disabled={key.length !== 16}
          >
            Compute
          </button>
        </div>
      </div>
      <div className="cryptolearn-output-block">
        <label>Result:</label>
        <output
          style={{
            marginLeft: 8,
            fontWeight: 600,
            wordBreak: 'break-all'
          }}
        >
          {output}
        </output>
        <span style={{ marginLeft: 16, color: status === 'Success' ? 'var(--accent)' : 'red' }}>
          {status}
        </span>
      </div>
      {showAnim && (
        <div className="cryptolearn-visualization">
          <AESVisualization
            plaintext={plaintext}
            key={key}
            ciphertext={output}
            mode={mode}
          />
        </div>
      )}
      <EducationalContentAndQuiz algorithm="AES" />
    </div>
  );
}

function AESVisualization({plaintext, key, ciphertext, mode}) {
  // This visualization is conceptual: input, key, → output
  return (
    <div style={{
      display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
      gap: '32px', background:'rgba(245, 158, 66, 0.05)', border:"1.5px solid var(--secondary)", borderRadius:8, padding:14, margin:'14px 0'
    }}>
      <AESVisualBlock label={mode === 'encrypt' ? "Plaintext" : "Ciphertext"} value={plaintext} />
      <span style={{fontSize:32, color:'var(--secondary)'}}>&rarr;</span>
      <AESVisualBlock label="Key" value={key} isKey />
      <span style={{fontSize:32, color:'var(--secondary)'}}>&rarr;</span>
      <AESVisualBlock label={mode === 'encrypt' ? "Ciphertext" : "Plaintext"} value={ciphertext} />
    </div>
  );
}

function AESVisualBlock({label, value, isKey}) {
  return (
    <div style={{
      minWidth:120, minHeight:40, background: isKey ? "var(--secondary)" : "#23272e",
      color: isKey ? "#fff" : "var(--text-color)", borderRadius:6, padding:"6px 12px", boxShadow:'0 0 4px #0002'
    }}>
      <div style={{fontWeight:600, color:'var(--accent)', marginBottom:2}}>{label}</div>
      <div style={{maxWidth:200, wordBreak:'break-all', fontFamily:'monospace'}}>{value}</div>
    </div>
  );
}

// --- SHA-256 SIMULATOR ---
function SHA256Simulator() {
  const [plaintext, setPlaintext] = useState('');
  const [hash, setHash] = useState('');
  const [showAnim, setShowAnim] = useState(false);

  function handlePlaintextChange(e) { setPlaintext(e.target.value); }
  function handleCompute() {
    if (!plaintext) return;
    // Simulate stepwise hash creation with an animation (not true SHA-256 block internals, which are too complex)
    setShowAnim(true);
    setHash(CryptoJS.SHA256(plaintext).toString(CryptoJS.enc.Hex));
  }

  return (
    <div className="cryptolearn-section">
      <h2 className="cryptolearn-section-title">SHA-256 Hash Simulator</h2>
      <div className="cryptolearn-input-block">
        <label>Input:</label>
        <input type="text" value={plaintext} onChange={handlePlaintextChange} style={{width:"50%"}} />
        <button className="btn" style={{marginLeft:12}} onClick={handleCompute}>Compute</button>
      </div>
      <div className="cryptolearn-output-block">
        <label>Result:</label>
        <output style={{marginLeft:8, fontWeight:600, wordBreak:'break-all'}}>
          {hash}
        </output>
      </div>
      {showAnim && (
        <div className="cryptolearn-visualization">
          <SHA256Visualization plaintext={plaintext} hash={hash} />
        </div>
      )}
      <EducationalContentAndQuiz algorithm="SHA256"/>
    </div>
  );
}

// Visualization (schematic: input → padding → hash, no true block details)
function SHA256Visualization({plaintext, hash}) {
  return (
    <div style={{
      padding:12, fontFamily:'monospace', fontSize:'1.03rem', background:'rgba(34,211,238,.07)',
      border:'1.5px solid var(--accent)', borderRadius:8, margin:'12px 0'
    }}>
      <div>
        <span style={{color:'var(--accent)', fontWeight:600}}>Input:</span>{"  "}
        <span>{plaintext || <span style={{color:"var(--secondary)"}}>N/A</span>}</span>
      </div>
      <div style={{margin:"6px 0"}}>
        <span style={{color:'var(--secondary)'}}>.... SHA-256 rounds ....</span>
      </div>
      <div>
        <span style={{color:'var(--accent)', fontWeight:600}}>Hash:</span>{"  "}
        <span style={{wordBreak:'break-all'}}>{hash}</span>
      </div>
    </div>
  );
}

// --- EDUCATIONAL CONTENT & QUIZ ---
function EducationalContentAndQuiz({ algorithm }) {
  const contentMap = {
    Caesar: {
      title: "About Caesar Cipher",
      explanation: (
        <>
          <div>
            <b>Caesar Cipher</b> is a monoalphabetic substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet. It's one of the oldest and simplest ciphers, named after Julius Caesar who used it with a shift of 3. <br />
            <ul>
              <li><b>Security:</b> Easily broken by brute-force. Not suitable for modern use.</li>
              <li><b>Use cases:</b> Children's puzzles, toy encryption.</li>
            </ul>
          </div>
        </>
      ),
      quiz: [
        {
          q: "What is the main weakness of the Caesar Cipher?",
          choices: [
            "It is vulnerable to brute-force attacks.",
            "It uses a very large key space.",
            "It is quantum-resistant.",
            "It was never used historically."
          ],
          answer: 0
        },
        {
          q: "A shift of 3 on 'A' gives which letter?",
          choices: ["C", "D", "F", "Z"],
          answer: 0
        }
      ]
    },
    AES: {
      title: "About AES-128 (Advanced Encryption Standard)",
      explanation: (
        <>
          <div>
            <b>What is AES?</b><br/>
            AES (Advanced Encryption Standard) is a symmetric block cipher standard established by NIST and widely used worldwide to secure sensitive data. <br/>
            <br />

            <b>How does AES-128 work?</b>
            <ul>
              <li><b>Block Cipher:</b> Encrypts data in fixed-size blocks of 128 bits (16 bytes).</li>
              <li><b>Key Size:</b> AES-128 uses a 128-bit (16-character) key.</li>
              <li>
                <b>Basic Steps (Encryption):</b>
                <ol style={{ paddingLeft: 22, color: 'var(--text-color)' }}>
                  <li><b>Key Expansion:</b> The original key is transformed into multiple round keys.</li>
                  <li><b>Initial Round:</b> Plaintext is XORed with the first round key.</li>
                  <li><b>Rounds:</b> 9 rounds in which data is transformed through:<br/>
                    &nbsp; &bull; <b>SubBytes:</b> Byte substitution (using a table called S-box).<br/>
                    &nbsp; &bull; <b>ShiftRows:</b> Rows of the matrix are shifted.<br/>
                    &nbsp; &bull; <b>MixColumns:</b> Columns are mixed (mathematical transformation).<br/>
                    &nbsp; &bull; <b>AddRoundKey:</b> XOR with a round key.
                  </li>
                  <li><b>Final Round:</b> Like previous rounds but leaves out MixColumns.</li>
                  <li><b>Output:</b> The result is the ciphertext.</li>
                </ol>
              </li>
            </ul>

            <b>Key Features:</b>
            <ul>
              <li>Block size: <b>128 bits (16 bytes)</b></li>
              <li>Key size: <b>128 bits (16 characters)</b></li>
              <li>Rounds: <b>10 rounds</b> of encryption</li>
            </ul>

            <b>Real-World Use Cases:</b>
            <ul>
              <li>Securing web communications (HTTPS/TLS)</li>
              <li>Protecting files and disks (e.g., BitLocker, FileVault)</li>
              <li>WPA2/WPA3 Wi-Fi networks</li>
              <li>Encryption in mobile apps and databases</li>
            </ul>

            <b>Why is AES-128 Secure?</b>
            <ul>
              <li>Brute-forcing a 128-bit key is practically impossible with current technology.</li>
              <li>No feasible attacks are currently known when implemented correctly.</li>
              <li>Audited and trusted by the cryptographic community.</li>
            </ul>
            <div style={{ color: "var(--text-secondary)", marginTop: 10, fontStyle: "italic" }}>
              AES-128 is considered secure for nearly all modern purposes, but always be sure to use a strong key and a secure mode of operation.
            </div>
          </div>
        </>
      ),
      quiz: [
        {
          q: "What is the block size of AES-128?",
          choices: ["128 bits", "256 bits", "8 bits", "64 bits"],
          answer: 0
        },
        {
          q: "How many rounds does AES-128 perform?",
          choices: ["8", "10", "12", "14"],
          answer: 1
        },
        {
          q: "Which is NOT a real-world use of AES?",
          choices: [
            "Securing Wi-Fi networks",
            "Web encryption (HTTPS)",
            "Protecting DNA sequence data (exclusively)",
            "File and disk encryption"
          ],
          answer: 2
        }
      ]
    },
    SHA256: {
      title: "About SHA-256 (Secure Hash Algorithm)",
      explanation: (
        <>
          <div>
            <b>SHA-256</b> is a cryptographic hash function that outputs a fixed-length 256-bit hash from any input.<br />
            <ul>
              <li><b>Security:</b> Pre-image and collision resistant. Not reversible.</li>
              <li><b>Use cases:</b> Digital signatures, data integrity, blockchain.</li>
            </ul>
          </div>
        </>
      ),
      quiz: [
        {
          q: "What is the length of a SHA-256 hash?",
          choices: ["16 bytes", "32 bytes", "64 bytes", "256 bytes"],
          answer: 1
        },
        {
          q: "Is SHA-256 reversible?",
          choices: ["Yes", "No", "Only for short text", "If you have a key"],
          answer: 1
        }
      ]
    }
  };

  const { title, explanation, quiz } = contentMap[algorithm] ?? {};
  return (
    <div className="cryptolearn-education">
      <h3 className="cryptolearn-edu-title">{title}</h3>
      <div className="cryptolearn-edu-explanation">{explanation}</div>
      <MiniQuiz questions={quiz} quizId={algorithm + '-quiz'} />
    </div>
  );
}

// PUBLIC_INTERFACE
function MiniQuiz({ questions, quizId }) {
  // Results persisted using LocalStorage - per quiz algorithm
  const saved = localStorage.getItem(quizId);
  const defaultState = () => saved ? JSON.parse(saved) : { step: 0, correct: 0, done: false };

  const [step, setStep] = useState(defaultState().step);
  const [correct, setCorrect] = useState(defaultState().correct);
  const [done, setDone] = useState(defaultState().done);

  function handleAnswer(idx) {
    const isRight = idx === questions[step].answer;
    const newCorrect = correct + (isRight ? 1 : 0);
    const isLast = step === questions.length - 1;
    setCorrect(newCorrect);
    setStep(isLast ? step : step + 1);
    setDone(isLast);
    localStorage.setItem(quizId, JSON.stringify({
      step: isLast ? 0 : step + 1,
      correct: newCorrect,
      done: isLast
    }));
  }

  function handleReset() {
    setStep(0);
    setCorrect(0);
    setDone(false);
    localStorage.removeItem(quizId);
  }

  if (!questions || questions.length === 0) return null;

  return (
    <div className="cryptolearn-quiz">
      {!done ? (
        <>
          <div style={{ fontWeight: 600, margin: "8px 0" }}>
            Quiz {step + 1}/{questions.length}
          </div>
          <div className="cryptolearn-quiz-q">{questions[step].q}</div>
          <ul className="cryptolearn-quiz-choices">
            {questions[step].choices.map((choice, idx) => (
              <li
                key={idx}
                tabIndex={0}
                className="cryptolearn-quiz-choice"
                onClick={() => handleAnswer(idx)}
                style={{
                  cursor: 'pointer',
                  padding: '6px 14px',
                  margin: '6px 0',
                  background: '#222C',
                  borderRadius: 4,
                  border: '1.5px solid var(--secondary)',
                  transition: 'background 0.2s'
                }}>
                {choice}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <div style={{ fontWeight: 600, color: "var(--secondary)" }}>
            Your quiz result: {correct} / {questions.length} correct!
          </div>
          <button className="btn" style={{ marginTop: 10 }} onClick={handleReset}>Reset Quiz</button>
        </>
      )}
    </div>
  );
}

 // --- PERFORMANCE CHART SECTION ---

// PUBLIC_INTERFACE
function PerformanceChartSection() {
  // Results state persists in component even after tab switches, using localStorage as a backup.
  const [results, setResults] = useState(() => {
    const stored = localStorage.getItem("cryptoPerfResults");
    return stored ? JSON.parse(stored) : [];
  });
  const chartRef = React.useRef();
  const chartInstanceRef = React.useRef(null); // Will hold the Chart.js instance itself
  const [isRunning, setIsRunning] = useState(false);

  // PUBLIC_INTERFACE
  function handleRunBenchmarks() {
    setIsRunning(true);
    setTimeout(() => {
      const plain = 'Lorem ipsum dolor sit amet!';
      const key = 'abcdefghijklmnop';
      const t0 = performance.now();
      for (let i = 0; i < 10000; ++i) caesarEncrypt(plain, 3);
      const t1 = performance.now();
      for (let i = 0; i < 1000; ++i) CryptoJS.AES.encrypt(plain, key);
      const t2 = performance.now();
      for (let i = 0; i < 2000; ++i) CryptoJS.SHA256(plain).toString(CryptoJS.enc.Hex);
      const t3 = performance.now();

      const caesarTime = t1 - t0;
      const aesTime = t2 - t1;
      const shaTime = t3 - t2;

      const newResults = [
        { name: 'Caesar', ms: caesarTime },
        { name: 'AES-128', ms: aesTime },
        { name: 'SHA-256', ms: shaTime }
      ];
      setResults(newResults);
      localStorage.setItem("cryptoPerfResults", JSON.stringify(newResults));
      setIsRunning(false);
    }, 200);
  }

  // Ensure Chart.js instance is cleaned up and replaced properly.
  React.useEffect(() => {
    if (!chartRef.current || results.length === 0) return;
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    // Responsive width: adapt chart to container's width.
    const ctx = chartRef.current.getContext('2d');
    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: results.map(r => r.name),
        datasets: [{
          label: 'Execution Time (ms, lower is faster)',
          data: results.map(r => Number(r.ms.toFixed(2))),
          backgroundColor: ['#F59E42', '#22D3EE', '#84e1fc'],
          borderWidth: 1,
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { beginAtZero: true, grid: { color: '#363a' }, ticks: { color: '#fff' } },
          y: { grid: { color: '#363a' }, ticks: { color: '#fff' } },
        },
        animation: { duration: 700 }
      }
    });
    // Cleanup
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [results]);

  // Add Responsive resize for chart canvas using flexbox and relative height.
  return (
    <div className="cryptolearn-section">
      <h2 className="cryptolearn-section-title">Performance Comparison</h2>
      <button className="btn"
        style={{marginBottom: 20}}
        onClick={handleRunBenchmarks}
        disabled={isRunning}
        aria-busy={isRunning}
      >
        {isRunning ? "Running Benchmarks…" : (results.length ? "Re-run Benchmarks" : "Run Benchmarks")}
      </button>
      <div style={{
        maxWidth: 650, margin: "0 auto",
        minHeight: 260, height: "clamp(220px,25vw,340px)",
        display: "flex", justifyContent: "center", alignItems: "center"
      }}>
        <canvas
          ref={chartRef}
          style={{
            width: "98%",
            height: "240px",
            background: "#191b23",
            borderRadius: 8,
            transition: "width 0.2s"
          }}
          aria-label="YES Cryptographic Performance Bar Chart"
        />
      </div>
      <div style={{color: "var(--text-secondary)", fontSize: ".98rem", marginTop: 16}}>
        {results.length
          ? <span>Results up-to-date. <span style={{color: "var(--accent)"}}>Lower ms means faster.</span></span>
          : <span>Measures typical execution times for 10k Caesar, 1k AES, 2k SHA-256 runs. Click 'Run Benchmarks'.</span>}
      </div>
    </div>
  );
}

// Helper for Caesar encryption - used for benchmark
function caesarEncrypt(text, shift) {
  return text.replace(/[a-z]/gi, c => {
    const a = c >= "a" && c <= "z" ? 97 : 65;
    return String.fromCharCode(((c.charCodeAt(0) - a + shift) % 26) + a);
  });
}

export default App;