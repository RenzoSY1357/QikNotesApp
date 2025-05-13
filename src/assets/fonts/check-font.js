// This script will run after the page loads to check if the Virgil font is loading correctly
document.addEventListener('DOMContentLoaded', () => {
  // Create a span element with Virgil font
  const span = document.createElement('span');
  span.textContent = 'Font Test';
  span.style.fontFamily = 'Virgil, sans-serif';
  span.style.position = 'fixed';
  span.style.bottom = '10px';
  span.style.right = '10px';
  span.style.backgroundColor = 'white';
  span.style.padding = '5px';
  span.style.zIndex = '9999';
  
  // Add it to the body
  document.body.appendChild(span);
  
  // Check which font is actually being used
  setTimeout(() => {
    const computedFont = window.getComputedStyle(span).fontFamily;
    console.log('Font being used:', computedFont);
    
    // If it doesn't contain Virgil, there might be an issue
    if (!computedFont.includes('Virgil')) {
      console.error('Virgil font not loading properly!');
      span.style.backgroundColor = 'red';
      span.style.color = 'white';
      span.textContent = 'Font issue!';
    } else {
      console.log('Virgil font loaded correctly!');
      span.style.backgroundColor = 'green';
      span.style.color = 'white';
      span.textContent = 'Font OK!';
      
      // Remove after 5 seconds
      setTimeout(() => {
        document.body.removeChild(span);
      }, 5000);
    }
  }, 1000);
});
