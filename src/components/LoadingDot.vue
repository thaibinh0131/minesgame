<template>
  <div class="loading">
    <div class="loading-dot"></div>
    <div class="loading-dot"></div>
    <div class="loading-dot"></div>
    <div class="loading-dot"></div>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  @apply flex items-center;
}

.loading-dot {
  width: 7px;
  height: 7px;
  margin: 0 4px;
  border-radius: 50%;
  opacity: 0;
  @apply bg-dark-blue;
  animation: loadingFade 1s infinite;
}

.loading-dot:nth-child(1) {
  animation-delay: 0s;
}

.loading-dot:nth-child(2) {
  animation-delay: 0.1s;
}

.loading-dot:nth-child(3) {
  animation-delay: 0.2s;
}
.loading-dot:nth-child(3) {
  animation-delay: 0.3s;
}

@-webkit-keyframes loadingFade {
  0% {
    opacity: 1;
  }

  33% {
    opacity: 0.75;
  }
  66% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;
  }
}

@-moz-keyframes loadingFade {
  0% {
    opacity: 1;
  }

  33% {
    opacity: 0.75;
  }
  66% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;
  }
}

@keyframes loadingFade {
  0% {
    opacity: 1;
  }

  33% {
    opacity: 0.75;
  }
  66% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;
  }
}
</style>
