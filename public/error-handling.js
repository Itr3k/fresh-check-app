
// Early error detection
window.addEventListener('error', function(e) {
  console.error('Global error caught:', e.error || e.message);
  const errorDisplay = document.getElementById('error-display');
  if (errorDisplay) {
    errorDisplay.textContent = 'Error: ' + (e.error?.message || e.message || 'Unknown error');
    errorDisplay.style.display = 'block';
  }
});

// Check if the page is being loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded');
  setTimeout(function() {
    const root = document.getElementById('root');
    // Check if root has any children after a short delay
    if (root && root.children.length === 0) {
      console.warn('Root element exists but has no children after 2 seconds');
    }
  }, 2000);
});
