<template>
  <div>
    <Navbar />
    <div id="main" class="container-fluid">
        <nuxt />
    </div>
  </div>
</template>
<script type="text/javascript">
import Navbar from '@/components/Navbar';
export default {
  components: {
    Navbar
  }
}
</script>