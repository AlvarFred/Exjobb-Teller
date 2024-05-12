<script>
    export let color;
    export let percentage;
</script>

<div class="single-chart">
      <svg viewBox="0 0 36 36" class="circular-chart orange" >
        <path class="circle-bg"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path class="circle" style="stroke: {color};" 
          stroke-dasharray="{percentage}, 100"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="18" y="20.35" class="percentage">{percentage}%</text>
      </svg>
</div>

<style>    
.single-chart {
  width: 50%;
  justify-content: space-around;
}

.circular-chart {
  display: block;
  margin: 10px auto;
  /* max-width: 80%;
  max-height: 250px; */
}

.circle-bg {
  fill: none;
  stroke: #eee;
  stroke-width: 3.8;
}

.circle {
  fill: none;
  stroke-width: 2.8;
  stroke-linecap: round;
  animation: progress 1s ease-out forwards;
}

@keyframes progress {
  0% {
    stroke-dasharray: 0 100;
  }
}
.percentage {
  fill: #666;
  font-family: sans-serif;
  font-size: 0.5em;
  text-anchor: middle;
}
</style>