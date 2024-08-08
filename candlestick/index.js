const log = console.log;

// Step 1: Define chart properties with dark theme.
const chartProperties = {
  width: window.innerWidth,
  height: window.innerHeight,
  timeScale: {
    timeVisible: true,
    secondsVisible: false,
  },
  crossHair: {
    mode: LightweightCharts.CrosshairMode.Normal,
  },
  layout: {
    backgroundColor: '#1e1e1e', // Dark theme background
    textColor: '#ffffff', // Light text color
  },
  grid: {
    horzLines: {
      color: '#2e2e2e', // Darker grid lines
    },
    vertLines: {
      color: '#2e2e2e', // Darker grid lines
    },
  },
  candleStyle: {
    borderUpColor: '#4fff54', // Green for up candles
    borderDownColor: '#ff4f4f', // Red for down candles
    wickUpColor: '#4fff54',
    wickDownColor: '#ff4f4f',
    wickWidth: 2,
    borderWidth: 2,
  }
};

// Step 2: Create the chart with defined properties and bind it to the DOM element.
const domElement = document.getElementById('tvchart');
const chart = LightweightCharts.createChart(domElement, chartProperties);

// Step 3: Add the CandleStick Series.
const candleSeries = chart.addCandlestickSeries();

// Step 4: Custom  data with more realistic values
function generateRealisticData() {
  const data = [];
  const now = Math.floor(Date.now() / 1000);
  let basePrice = 30000; // Starting price
  for (let i = 0; i < 200; i++) {
    const time = now - (200 - i) * 3600; // 1-hour intervals
    const open = basePrice;
    const change = (Math.random() - 0.5) * 2000; // Smaller price fluctuation
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * 500;
    const low = Math.min(open, close) - Math.random() * 500;
    basePrice = close; // Update basePrice for next interval
    data.push({
      time: time,
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2))
    });
  }
  return data;
}

const realisticData = generateRealisticData();
candleSeries.setData(realisticData);

// Adjust chart size on window resize
window.addEventListener('resize', () => {
  chart.resize(window.innerWidth, window.innerHeight);
});
