<template>
  <div class="loading-wrapper">
    <div class="loading-main">
      <div :class="['loading', loadingClass]">
        <svg class="loading-circular" viewBox="25 25 50 50">
          <circle
            class="loading-path"
            cx="50"
            cy="50"
            r="20"
            :stroke="loadingColor"
            fill="none"
            stroke-width="3"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
// import "@/assets/css/components/loading.css";

const props = defineProps({
  loadingColor: {
    default: "#132a72",
    type: String,
  },
  loadingClass: {
    default: "w-10 h-10",
    type: [String, Array],
  },
});
</script>
<style>
.loading-wrapper {
  position: relative;
  height: 100%;
  width: fit-content;
}

.loading-main .loading {
  position: relative;
}
.profile-main-loader .loader:before {
  content: "";
  display: block;
  padding-top: 100%;
}

.loading-circular {
  -webkit-animation: rotate 2s linear infinite;
  animation: rotate 2s linear infinite;
  height: 100%;
  -webkit-transform-origin: center center;
  -ms-transform-origin: center center;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  margin: auto;
}

.loading-path {
  stroke-dasharray: 150, 200;
  stroke-dashoffset: -10;
  -webkit-animation: dash 1.5s ease-in-out infinite,
    color 6s ease-in-out infinite;
  animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
  stroke-linecap: round;
  /* stroke: var(--color-navy-900); */
}

@-webkit-keyframes rotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes rotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}
</style>