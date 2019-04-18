<template>
  <div>
    <a class="alink" v-if="isLink" :href="href" target="_blank">
      <slot></slot>
    </a>
    <span v-else>
      <slot></slot>
    </span>
  </div>
</template>

<script>
import Global from '@/config/global'
export default {
  props: {
    href: {
      type: String
    },
    marker: {
      type: String
    }
  },

  data () {
    return {
      isLink: Global.ACTION_MARKERS.includes(this.marker)
    }
  }
}
</script>
