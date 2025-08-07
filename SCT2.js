let startTime = 0;
  let elapsedTime = 0;
  let interval;
  let running = false;

  function formatTime(ms) {
    const date = new Date(ms);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  function updateDisplay() {
    const now = Date.now();
    elapsedTime = now - startTime;
    document.getElementById('display').textContent = formatTime(elapsedTime);
  }

  function start() {
    if (!running) {
      running = true;
      startTime = Date.now() - elapsedTime;
      interval = setInterval(updateDisplay, 10);
      document.getElementById('startBtn').disabled = true;
      document.getElementById('stopBtn').disabled = false;
      document.getElementById('lapBtn').disabled = false;
    }
  }

  function stop() {
    if (running) {
      running = false;
      clearInterval(interval);
      document.getElementById('startBtn').disabled = false;
      document.getElementById('stopBtn').disabled = true;
      document.getElementById('lapBtn').disabled = true;
    }
  }

  function reset() {
    stop();
    elapsedTime = 0;
    document.getElementById('display').textContent = "00:00:00.000";
    document.getElementById('laps').innerHTML = '';
  }

  function lap() {
    if (running) {
      const lapTime = formatTime(elapsedTime);
      const lapDiv = document.createElement('div');
      lapDiv.className = 'lap';
      lapDiv.textContent = `Lap ${document.getElementById('laps').children.length + 1}: ${lapTime}`;
      document.getElementById('laps').prepend(lapDiv); // latest lap on top
    }
  }