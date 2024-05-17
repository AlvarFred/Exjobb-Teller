<script>
    export let completed;
    export let width = 20;
    export let height = 20;
</script>
<svg xmlns="http://www.w3.org/2000/svg"  width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star">
    <polygon fill={completed ? "#ffcc00" : "#D9D9D9"} stroke={completed ? "#ffcc00" : "#D9D9D9"} points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
</svg>