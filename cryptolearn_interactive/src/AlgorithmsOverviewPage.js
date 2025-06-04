import React from "react";
import "./App.css";

// PUBLIC_INTERFACE
/**
 * AlgorithmsOverviewPage: Cryptographic algorithm educational overview for use in main app or standalone.
 * When 'onNavigate' is provided, the parent (App.js container) handles navigation and layout, so this
 * page does NOT render its own sidebar or layout. If no 'onNavigate' is provided, it renders standalone
 * with its own sidebar and container.
 */
function AlgorithmsOverviewPage({ onNavigate }) {
  // If no onNavigate handler, render standalone with sidebar and layout.
  const isStandalone = !onNavigate;

  const content = (
    <main className="cryptolearn-content" style={{ paddingTop: 10 }}>
      <section className="cryptolearn-section" style={{ marginBottom: 46 }}>
        <h1 className="cryptolearn-section-title" style={{ fontSize: "2.25rem", marginBottom: 15 }}>
          Cryptographic Algorithms Overview
        </h1>
        <div style={{ fontSize: "1.07rem", color: "var(--text-secondary)", textAlign: "center" }}>
          Learn how cryptographers conceal, protect, and verify information: <b>Caesar Cipher</b>, <b>AES-128</b>, and <b>SHA-256</b> each play a unique role in building secure digital systems.
        </div>
      </section>

      {/* Caesar Cipher Section */}
      <section className="cryptolearn-section">
        <h2 className="cryptolearn-section-title" style={{ color: "var(--secondary)" }}>Caesar Cipher</h2>
        <AlgorithmIllustration label="Caesar Cipher" accentColor="var(--secondary)">
          <div style={{
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "flex-start",
            margin: "12px 0"
          }}>
            <div style={{
              background: "#14171d",
              color: "#fff",
              borderRadius: 6,
              padding: 12,
              minWidth: 180,
              fontFamily: "monospace",
              border: "1.2px solid var(--accent)",
              textAlign: "center"
            }}>
              PLAIN:&ensp;<span style={{ color: "var(--accent)", fontWeight: 700 }}>HELLO</span>
              <br />
              <span style={{ fontSize: 23, color: "var(--secondary)" }}>&rarr; shift +3 &rarr;</span>
              <br />
              CIPHER:&ensp;<span style={{ color: "var(--accent)", fontWeight: 700 }}>KHOOR</span>
            </div>
          </div>
        </AlgorithmIllustration>
        <ExplanatoryPanel>
          <b>What is it?</b><br />
          The Caesar Cipher is one of the simplest and most ancient ciphers. Each letter in the plaintext is replaced by another a fixed number of positions away in the alphabet.
          <br /><br />

          <b>How does it work?</b>
          <ol style={{ paddingLeft: 22, color: "var(--text-color)", marginBottom: 0 }}>
            <li>Choose a shift amount (e.g., 3).</li>
            <li>For each letter, find its position in the alphabet.</li>
            <li>Replace it with the letter that is the chosen number of positions ahead (wrap from Z to A if needed).</li>
            <li>Non-letter characters may be left unchanged.</li>
          </ol>
          <div style={{ marginBottom: 10 }} />

          <b>Use Cases:</b>
          <ul style={{ paddingLeft: 22, color: "var(--text-secondary)" }}>
            <li>Children's puzzles and simple secret codes.</li>
            <li>Historical use by Julius Caesar.</li>
            <li>Never used for real-world security today.</li>
          </ul>

          <b>Security Notes:</b>
          <ul style={{ paddingLeft: 22, color: "var(--text-secondary)" }}>
            <li>Only 25 possible shifts; very easily broken by brute-force or frequency analysis.</li>
            <li>No longer secure for any practical purpose.</li>
          </ul>
        </ExplanatoryPanel>
      </section>

      {/* AES-128 Section */}
      <section className="cryptolearn-section">
        <h2 className="cryptolearn-section-title" style={{ color: "var(--secondary)" }}>AES-128</h2>
        <AlgorithmIllustration label="AES-128" accentColor="var(--accent)">
          <div style={{
            display: "flex", flexDirection: "row", gap: 20, alignItems: "center", justifyContent: "center", margin: "12px 0"
          }}>
            <VisualBlock label="Plaintext" value="HelloAES2024!" highlight />
            <span style={{ color: "var(--secondary)", fontSize: 29, fontWeight: 700 }}>{'+'}</span>
            <VisualBlock label="Key (16 chars)" value="MySecr3tKey2024!" accent />
            <span style={{ color: "var(--accent)", fontSize: 24 }}>{'\u21D2'}</span>
            <VisualBlock label="Ciphertext" value="(Encrypted Output)" hideValue accentBg />
          </div>
        </AlgorithmIllustration>
        <ExplanatoryPanel>
          <b>What is it?</b><br />
          <b>AES-128 (Advanced Encryption Standard)</b> is a symmetric block cipher used worldwide to protect data. It is a global security standard.
          <br /><br />

          <b>How does it work?</b>
          <ol style={{ paddingLeft: 22, color: "var(--text-color)", marginBottom: 0 }}>
            <li>Data is split into <b>blocks of 128 bits</b> (16 bytes).</li>
            <li>A 128-bit secret <b>key</b> is used.</li>
            <li>Encryption goes through 10 rounds of transformations:
              <ul style={{ paddingLeft: 16, color: "var(--text-secondary)" }}>
                <li><b>SubBytes:</b> Substitute bytes using an S-box table.</li>
                <li><b>ShiftRows:</b> Rotate rows of the block matrix.</li>
                <li><b>MixColumns:</b> Mix column data (except final round).</li>
                <li><b>AddRoundKey:</b> XOR block with part of the key.</li>
              </ul>
            </li>
            <li>The output is a scrambled "ciphertext" block, unreadable without the same key.</li>
          </ol>

          <div style={{ marginBottom: 8 }} />
          <b>Core Concepts:</b>
          <ul style={{ color: "var(--text-secondary)" }}>
            <li><b>Block Size:</b> 128 bits (16 bytes)</li>
            <li><b>Key Size:</b> 128 bits (16 characters)</li>
            <li><b>Rounds:</b> 10 rounds (encryption transformations)</li>
            <li><b>Key Expansion:</b> Original key expanded to round keys</li>
          </ul>

          <b>Use Cases:</b>
          <ul style={{ color: "var(--text-secondary)" }}>
            <li>Securing web traffic (HTTPS/TLS)</li>
            <li>WPA2/WPA3 Wi-Fi networks</li>
            <li>Encrypted files, disk encryption (BitLocker, FileVault)</li>
            <li>Mobile apps, payment, fintech</li>
          </ul>

          <b>Security Notes:</b>
          <ul style={{ color: "var(--text-secondary)" }}>
            <li>Practically unbreakable with strong keys; trusted for global security.</li>
            <li>Key must be kept secret and unpredictable.</li>
            <li>Vulnerabilities arise only from weak keys, bad implementation, or side-channel attacks.</li>
          </ul>
        </ExplanatoryPanel>
      </section>

      {/* SHA-256 Section */}
      <section className="cryptolearn-section">
        <h2 className="cryptolearn-section-title" style={{ color: "var(--secondary)" }}>SHA-256</h2>
        <AlgorithmIllustration label="SHA-256" accentColor="var(--accent)">
          <div style={{
            display: "flex", flexDirection: "row", gap: 20, alignItems: "center", justifyContent: "center", margin: "12px 0"
          }}>
            <VisualBlock label="Input" value="HelloSHA!" highlight />
            <span style={{ color: "var(--secondary)", fontSize: 26 }}>&rarr;</span>
            <VisualBlock label="SHA-256 Hash" value="7e04f3...cd921" shorten />
          </div>
        </AlgorithmIllustration>
        <ExplanatoryPanel>
          <b>What is it?</b><br />
          <b>SHA-256</b> is a one-way <b>hash function</b> that takes any input and produces a unique 256-bit (32-byte) fingerprint (the "hash").
          <br /><br />

          <b>How does it work?</b>
          <ol style={{ paddingLeft: 22, color: "var(--text-color)", marginBottom: 0 }}>
            <li>Input is padded to a multiple of 512 bits (blocks).</li>
            <li>Each block is processed through 64 rounds of mixing, bitwise operations, and nonlinear functions using fixed "constants".</li>
            <li>Final result is a 256-bit hash unique to the input.</li>
          </ol>
          <div style={{ marginBottom: 8 }} />

          <b>Core Concepts:</b>
          <ul style={{ color: "var(--text-secondary)" }}>
            <li>Output: <b>256 bits</b> (64 hexadecimal digits / 32 bytes)</li>
            <li><b>Deterministic:</b> Input always produces same output</li>
            <li><b>One-way:</b> Cannot "un-hash" to recover input</li>
            <li><b>Collision resistant:</b> Very, very unlikely for two different inputs to get same hash</li>
          </ul>

          <b>Use Cases:</b>
          <ul style={{ color: "var(--text-secondary)" }}>
            <li>Storing passwords securely (with salt and pepper)</li>
            <li>Digital signatures and certificates</li>
            <li>Blockchain records and cryptocurrency security</li>
            <li>File integrity verification</li>
          </ul>

          <b>Security Notes:</b>
          <ul style={{ color: "var(--text-secondary)" }}>
            <li>Never use for encryption (irreversible).</li>
            <li>SHA-256 is considered secure for most modern applications.</li>
            <li>No realistic collisions found to date.</li>
          </ul>
        </ExplanatoryPanel>
      </section>
    </main>
  );

  if (isStandalone) {
    // Standalone page w/ own navbar, sidebar, layout.
    return (
      <div className="cryptolearn-main" style={{ minHeight: "100vh", width: "100vw" }}>
        <AlgorithmsOverviewNavbar />
        <div className="cryptolearn-layout" style={{ marginTop: 80 }}>
          <nav className="cryptolearn-sidebar" aria-label="Sidebar Navigation" style={{ minWidth: 170 }}>
            <ul>
              <li className="active" style={{ cursor: "pointer" }} tabIndex={0} aria-label="Algorithms Overview">Algorithms Overview</li>
              <li style={{ cursor: "pointer" }} tabIndex={0} aria-label="Caesar Cipher">Caesar Cipher</li>
              <li style={{ cursor: "pointer" }} tabIndex={0} aria-label="AES-128">AES-128</li>
              <li style={{ cursor: "pointer" }} tabIndex={0} aria-label="SHA-256">SHA-256 Hash</li>
            </ul>
          </nav>
          {content}
        </div>
        <footer style={{
          background: "#191b23",
          color: "var(--text-secondary)",
          borderTop: "1.5px solid var(--border-color)",
          textAlign: "center",
          padding: "15px 0",
          fontSize: "0.97rem"
        }}>
          CipherLab &mdash; Algorithms Overview &copy; {new Date().getFullYear()}
        </footer>
      </div>
    );
  }

  // App-integrated (main tab view): only the content section, let container render nav/layout/footer.
  return content;
}

// Navbar for AlgorithmsOverviewPage
function AlgorithmsOverviewNavbar({ onNavigate }) {
  // Center CipherLab, put nav/back/github at left, keep header styled large
  return (
    <nav className="navbar cryptolearn-navbar">
      <div className="container"
        style={{
          maxWidth: 1200,
          width: "100%",
          margin: "0 auto",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 70
        }}>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%",
          display: "flex",
          alignItems: "center",
          paddingLeft: 24
        }}>
          {onNavigate ? (
            <button
              className="btn"
              style={{ background: "var(--accent)", color: "#111", fontSize: "1rem" }}
              onClick={() => onNavigate("main")}
              aria-label="Return to Main Playground"
            >
              Back
            </button>
          ) : (
            // GitHub link removed as per requirements; leave space empty
            null
          )}
        </div>
        <div style={{
          margin: "0 auto",
          textAlign: "center",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <span
            style={{
              color: "var(--secondary)",
              fontSize: "2.15rem",
              fontWeight: 800,
              letterSpacing: "0.02em",
              lineHeight: 1,
              textAlign: "center",
              width: "fit-content"
            }}
            className="cipherlab-branding-title"
          >
            CipherLab
          </span>
        </div>
      </div>
    </nav>
  );
}

// Card illustration with a big label for each algorithm
function AlgorithmIllustration({ label, accentColor, children }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 14, marginTop: 6,
      borderBottom: `2px solid var(--border-color)`, paddingBottom: 12
    }}>
      <span style={{
        fontSize: "1.12rem", fontWeight: 700, color: accentColor, letterSpacing: ".01em", marginBottom: 2
      }}>
        {label}
      </span>
      <div>{children}</div>
    </div>
  );
}

// Panel with smooth background and padding
function ExplanatoryPanel({ children }) {
  return (
    <div style={{
      background: "#191b23",
      padding: "20px 18px 12px 18px",
      borderRadius: "8px",
      border: "1.2px solid var(--border-color)",
      color: "var(--text-color)",
      fontSize: "1.07rem",
      marginBottom: "8px",
      lineHeight: 1.59
    }}>
      {children}
    </div>
  );
}

// Visual block to highlight "plaintext", "key", "ciphertext", or "hash"
function VisualBlock({ label, value, highlight, accent, accentBg, hideValue, shorten }) {
  let displayValue = value;
  if (hideValue) displayValue = "•••••••••••";
  if (shorten && typeof value === "string" && value.length > 12)
    displayValue = value.slice(0, 7) + "..." + value.slice(-5);

  return (
    <div style={{
      minWidth: 100,
      background: accentBg ? "var(--accent)" : highlight ? "var(--secondary)" : "#23272e",
      color: accentBg ? "#14171d" : accent ? "var(--accent)" : "#fff",
      borderRadius: 7,
      padding: "8px 14px",
      boxShadow: "0 0 3px #0003",
      textAlign: "center",
      fontFamily: "Fira Mono, Monaco, monospace",
      fontSize: "1.09rem"
    }}>
      <div style={{ fontWeight: 600, color: accentBg ? "#14171d" : "var(--accent)", marginBottom: 2 }}>
        {label}
      </div>
      <div style={{
        maxWidth: 180,
        wordBreak: "break-all",
        fontWeight: highlight ? 700 : 500
      }}>
        {displayValue}
      </div>
    </div>
  );
}

export default AlgorithmsOverviewPage;
