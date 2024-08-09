import React, { useState, useEffect } from 'react';

const CodeEditor = () => {
  const [code, setCode] = useState('// Write your JavaScript code here\n');
  const [consoleOutput, setConsoleOutput] = useState('');

  useEffect(() => {
    // Handle messages from the iframe
    const handleConsoleMessages = (event) => {
      if (event.data.type === 'console') {
        setConsoleOutput((prev) => prev + event.data.message + '\n');
      }
    };

    window.addEventListener('message', handleConsoleMessages);

    return () => {
      window.removeEventListener('message', handleConsoleMessages);
    };
  }, []);

  const runCode = () => {
    // Clear previous console output
    setConsoleOutput('');

    // Create a new iframe to run the code
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none'; // Hide the iframe from view
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <html>
      <head><title>Output</title></head>
      <body>
      <script>
        // Redirect console output to parent window
        window.console = {
          log: function(message) {
            window.parent.postMessage({ type: 'console', message: 'Log: ' + message }, '*');
          },
          error: function(message) {
            window.parent.postMessage({ type: 'console', message: 'Error: ' + message }, '*');
          }
        };

        // Catch and report errors in user code
        try {
          ${code}
        } catch (e) {
          console.error(e.message);
        }
      </script>
      </body>
      </html>
    `);
    doc.close();
    
    // Clean up
    iframe.remove();
  };

  return (
    <div className="flex flex-col items-center p-6 bg-slate-600 rounded-lg shadow-lg w-full max-w-4xl mx-auto mt-8">
        <h1 className='bg-transparent text-2xl italic font-semibold mb-2'>LabXplorerX JavaScript Editor</h1>
      <textarea
        className="w-full h-64 border border-gray-300 rounded-md p-2 mb-4 font-mono text-lg resize-none"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        className="bg-slate-900 hover:bg-slate-700 text-white py-2 px-4 rounded-md transition duration-300"
        onClick={runCode}
      >
        Run Code
      </button>
      <div className="w-full mt-6 bg-gray-900 text-white p-4 rounded-md overflow-auto h-64">
        <pre className='bg-transparent'>{consoleOutput}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;
