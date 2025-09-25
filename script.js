// Chart setup
const ctx = document.getElementById("sensorChart").getContext("2d");
const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      { label: "Gas (ppm)", data: [], borderColor: "#ff5722", tension: 0.3 },
      { label: "Temp (°C)", data: [], borderColor: "#fdd835", tension: 0.3 },
      { label: "Humidity (%)", data: [], borderColor: "#00bcd4", tension: 0.3 },
      { label: "Distance (cm)", data: [], borderColor: "#9c27b0", tension: 0.3 },
    ]
  },
  options: { responsive: true }
});

// Elements
const gasValue = document.getElementById("gasValue");
const tempValue = document.getElementById("tempValue");
const humidityValue = document.getElementById("humidityValue");
const distanceValue = document.getElementById("distanceValue");

const gasStatus = document.getElementById("gasStatus");
const tempStatus = document.getElementById("tempStatus");
const humidityStatus = document.getElementById("humidityStatus");
const distanceStatus = document.getElementById("distanceStatus");

const logTable = document.getElementById("logTable");

// Generate demo sensor data
function generateData() {
  return {
    gas: Math.floor(Math.random() * 100),
    temp: (20 + Math.random() * 10).toFixed(1),
    humidity: (40 + Math.random() * 30).toFixed(1),
    distance: (10 + Math.random() * 90).toFixed(1),
    time: new Date().toLocaleTimeString()
  };
}

// Update UI
function updateDashboard() {
  const d = generateData();

  gasValue.textContent = `${d.gas} ppm`;
  tempValue.textContent = `${d.temp} °C`;
  humidityValue.textContent = `${d.humidity} %`;
  distanceValue.textContent = `${d.distance} cm`;

  gasStatus.textContent = d.gas > 70 ? "⚠️ Danger" : "✅ Safe";
  gasStatus.className = d.gas > 70 ? "status danger" : "status safe";

  tempStatus.textContent = d.temp > 28 ? "🔥 High" : "❄️ Normal";
  tempStatus.className = d.temp > 28 ? "status high" : "status normal";

  humidityStatus.textContent = d.humidity > 65 ? "💧 High" : "🌫 Normal";
  humidityStatus.className = d.humidity > 65 ? "status high" : "status normal";

  distanceStatus.textContent = d.distance < 20 ? "⚠️ Too Close" : "📏 Normal";
  distanceStatus.className = d.distance < 20 ? "status danger" : "status safe";

  // Update chart
  chart.data.labels.push(d.time);
  chart.data.datasets[0].data.push(d.gas);
  chart.data.datasets[1].data.push(d.temp);
  chart.data.datasets[2].data.push(d.humidity);
  chart.data.datasets[3].data.push(d.distance);

  if (chart.data.labels.length > 10) {
    chart.data.labels.shift();
    chart.data.datasets.forEach(ds => ds.data.shift());
  }
  chart.update();

  // Update log table
  const row = `<tr>
    <td>${d.time}</td>
    <td>${d.gas}</td>
    <td>${d.temp}</td>
    <td>${d.humidity}</td>
    <td>${d.distance}</td>
  </tr>`;
  logTable.insertAdjacentHTML("afterbegin", row);
  if (logTable.rows.length > 8) {
    logTable.deleteRow(-1);
  }
}

// Update every 2s
setInterval(updateDashboard, 2000);
