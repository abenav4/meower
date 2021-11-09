<template>
  <div class="fullscreen bg-pink text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        ;_;
      </div>

      <div class="text-h2" style="opacity:.4">
        oh nyo..
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="pink"
        unelevated
        to="/"
        label="home"
        no-caps
      />
    </div>
  </div>

</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Error404'
})
</script>

    .bg-brand {
      background: #a2aa33;
    }
