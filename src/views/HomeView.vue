<template>
  <div class="home">
    <HeadNav class="headNav" :class="{ scrolled: isScrolled }"/>
    <BackCover class="bacCover"/>
    <MainContent />
  </div>
</template>
<script>
import '@/assets/css/home/home.css'
import BackCover from '@/components/home/BacCover.vue'
import MainContent from '@/components/home/MainContent.vue'
import HeadNav from '@/components/menu/HeadNav.vue'
export default {
  components: {
    BackCover,
    MainContent,
    HeadNav
  },
  data() {
    return {
      isScrolled: false
    }
  },
  created() {
    console.log(process.env.VUE_APP_BASE_URI)
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (window.scrollY > 70) {
        this.isScrolled = true;
      } else {
        this.isScrolled = false;
      }
    }
  }
}
</script>