
console.log('HTML loaded, checking application status');

// Add a timeout to check if React has rendered
setTimeout(function() {
  const root = document.getElementById('root');
  if (root && (root.children.length === 0 || root.innerHTML === '')) {
    console.error('React application failed to render after 5 seconds');
    root.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: system-ui, sans-serif;">
        <h2>Application failed to load</h2>
        <p>Please check the browser console for errors or try refreshing the page.</p>
      </div>
    `;
  } else {
    console.log('React application rendered successfully');
  }
}, 5000);
