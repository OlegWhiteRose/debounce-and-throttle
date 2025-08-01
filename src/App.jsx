import { useState, useMemo } from 'react';

function debounce(callback, delay = 1000) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), delay);
  }
}

function throttle(callback, delay = 1000) {
  let shouldWate = false;
  let lastArgs;

  return (...args) => {
    if (shouldWate) {
      lastArgs = args;
      return;
    }

    callback(...args);
    shouldWate = true;
    
    setTimeout(() => {
      shouldWate = false;
      if (lastArgs) {
        callback(...lastArgs); 
        lastArgs = undefined;
      }
    }, delay);
  }
}

function App() {
  const [text, setText] = useState('');
  const [debounceText, setDebounceText] = useState('');
  const [throttleText, setThrottleText] = useState('');

  const updateDebounce = useMemo(() => debounce(setDebounceText), []);
  const updateThrottle = useMemo(() => throttle(setThrottleText), []);

  const toggledInput = (event) => {
    const curText = event.target.value;
    
    setText(curText);
    updateDebounce(curText);
    updateThrottle(curText);
  }

  return (
    <>  
      <input onChange={toggledInput} type="text" />
      <div>Default: {text} </div>
      <div>Debounce: {debounceText} </div>
      <div>Throttle: {throttleText} </div>
    </>
  )
}

export default App;
