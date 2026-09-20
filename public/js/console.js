/* ==========================================================================
   CONSOLE.JS - Interactive Quick Console Execution Controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const codeInput = document.getElementById('quickCodeInput');
  const runBtn = document.getElementById('quickRunBtn');
  const clearBtn = document.getElementById('quickClearBtn');
  const outputArea = document.getElementById('quickConsoleOutput');
  const presetButtons = document.querySelectorAll('.quick-console-preset');

  if (!codeInput || !runBtn || !outputArea) {
    return;
  }

  // Helper to format any JS value into readable text
  function formatValue(val) {
    if (val === undefined) return 'undefined';
    if (val === null) return 'null';
    if (typeof val === 'string') return val;
    if (typeof val === 'function') return val.toString();
    if (val instanceof Error) return `${val.name}: ${val.message}`;
    if (typeof val === 'object') {
      try {
        return JSON.stringify(val, null, 2);
      } catch (e) {
        return Object.prototype.toString.call(val);
      }
    }
    return String(val);
  }

  // Appends an output entry to the console terminal
  function appendOutput(type, message) {
    const line = document.createElement('div');
    line.className = `qc-line qc-${type}`;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const timeSpan = document.createElement('span');
    timeSpan.className = 'qc-time';
    timeSpan.textContent = `[${timestamp}]`;

    const tagSpan = document.createElement('span');
    tagSpan.className = `qc-badge qc-badge-${type}`;
    tagSpan.textContent = type.toUpperCase();

    const textSpan = document.createElement('span');
    textSpan.className = 'qc-text';
    textSpan.textContent = message;

    line.appendChild(timeSpan);
    line.appendChild(tagSpan);
    line.appendChild(textSpan);

    outputArea.appendChild(line);
    outputArea.scrollTop = outputArea.scrollHeight;
  }

  // Safely execute JavaScript code and capture logs, warnings, errors, and return values
  function executeCode() {
    const rawCode = codeInput.value;
    if (!rawCode.trim()) {
      appendOutput('warn', 'Console input is empty. Type some JavaScript code to run.');
      return;
    }

    // Intercept console calls during this execution
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;
    const originalInfo = console.info;

    let hasLoggedOutput = false;

    console.log = (...args) => {
      hasLoggedOutput = true;
      appendOutput('log', args.map(formatValue).join(' '));
      originalLog.apply(console, args);
    };

    console.warn = (...args) => {
      hasLoggedOutput = true;
      appendOutput('warn', args.map(formatValue).join(' '));
      originalWarn.apply(console, args);
    };

    console.error = (...args) => {
      hasLoggedOutput = true;
      appendOutput('error', args.map(formatValue).join(' '));
      originalError.apply(console, args);
    };

    console.info = (...args) => {
      hasLoggedOutput = true;
      appendOutput('info', args.map(formatValue).join(' '));
      originalInfo.apply(console, args);
    };

    try {
      // Wrap code in an asynchronous-compatible function to capture return value
      // Try evaluating as an expression first, then as statements
      let result;
      let executed = false;

      try {
        // Attempt evaluating as single expression first (e.g. 10 + 20)
        const exprFn = new Function(`return (${rawCode})`);
        result = exprFn();
        executed = true;
      } catch (exprErr) {
        // Fall back to general statement execution block
        const blockFn = new Function(`
          "use strict";
          ${rawCode}
        `);
        result = blockFn();
        executed = true;
      }

      // If the code returned a value that wasn't already logged
      if (executed && result !== undefined) {
        appendOutput('return', `← ${formatValue(result)}`);
      } else if (!hasLoggedOutput) {
        appendOutput('info', 'Code executed successfully (no output or return value).');
      }
    } catch (runtimeError) {
      // Clear and readable error message without crashing the portfolio
      const errorMsg = runtimeError instanceof Error ? `${runtimeError.name}: ${runtimeError.message}` : String(runtimeError);
      appendOutput('error', errorMsg);
    } finally {
      // Always restore original console methods
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
      console.info = originalInfo;
    }
  }

  // Event: Run Button Click
  runBtn.addEventListener('click', executeCode);

  // Event: Keyboard Shortcut (Ctrl+Enter or Cmd+Enter)
  codeInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      executeCode();
    }
  });

  // Event: Clear Output
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      outputArea.innerHTML = '';
      appendOutput('info', 'Console cleared. Ready for execution.');
    });
  }

  // Event: Preset snippets
  presetButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const sampleCode = btn.getAttribute('data-code');
      if (sampleCode) {
        codeInput.value = sampleCode;
        codeInput.focus();
        // Automatically run preset
        executeCode();
      }
    });
  });

  // Initial welcome message in console
  appendOutput('info', 'Quick Console ready. Press Run or Ctrl+Enter to execute JavaScript.');
});
