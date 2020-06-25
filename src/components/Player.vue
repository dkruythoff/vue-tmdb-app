<template>
  <div ref="containerRef">
    <video
      ref="videoRef"
      autoplay
      />
  </div>
</template>

<script>
import shaka from 'shaka-player/dist/shaka-player.ui'

export default {
  name: 'Player',
  data() {
    return {
      player: null,
      fullscreen : false
    }
  },
  props: {
    src: {
      type: String,
      required: true
    }
  },
  mounted() {
    const {videoRef} = this.$refs
    this.player = new shaka.Player(videoRef);
    videoRef.addEventListener("fullscreenchange", () => {
      if (!this.fullscreen) {
        this.fullscreen = true
      } else {
        this.$emit('stop')
      }
    })
    this.player.load(this.src)
    videoRef.requestFullscreen()
  },
  beforeDestroy() {
    this.player.destroy()
  }
}
</script>