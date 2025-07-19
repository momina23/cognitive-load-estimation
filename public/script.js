let data = {
    mouseMoves: [],
    scrolls: [],
    clicks: [],
    keyStrokes: [],
    startTime: Date.now()
  };
  
  document.addEventListener('mousemove', e => {
    data.mouseMoves.push({ x: e.clientX, y: e.clientY, t: Date.now() });
  });
  document.addEventListener('scroll', e => {
    data.scrolls.push({ y: window.scrollY, t: Date.now() });
  });
  document.addEventListener('click', e => {
    data.clicks.push(Date.now());
  });
  document.addEventListener('keydown', e => {
    data.keyStrokes.push({ key: e.key, t: Date.now() });
  });
  
  function submitData() {
    data.endTime = Date.now();
    data.rating = document.getElementById('rating').value;
    data.age = document.getElementById('age').value;
    data.answer = document.getElementById('answer').value;
  
    fetch('/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(() => {
      alert("Data submitted. Thank you!");
      window.location.reload();
    });
  }
  