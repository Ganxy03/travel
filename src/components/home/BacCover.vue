<template>
    <div class="bacCover">
        <!-- <div class="bacCover1"></div> -->
        <div class="slider-container">
            <div class="slider">
            <div v-for="item in sliderItems" :key="item.id"  class="slider-item">
                <img :src="getImagePath(item.id)" alt="">
            </div>
            </div>
        </div>
        <a class="bar_down" @click="scrollDown"></a>
    </div>
</template>

<script>
import '@/assets/css/home/bacCover.css'


import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import $ from 'jquery';
import 'slick-carousel';
export default {
    components: {

    },
    data() {
        return {
            sliderItems: [
                { id: 1, content: 'Slide 1' },
                { id: 2, content: 'Slide 2' },
            ],
            device: {
                Width: 0,
                Height: 0,
            },
        }
    },
    mounted() {
        this.$nextTick(() => {
            $('.slider').slick();
        });

        this.device.Width = window.innerWidth;
        this.device.Height = window.innerHeight;
    },
    methods: {
        getImagePath(id) {
            // return require(`@/assets/img/home/bac/bg-pc.jpg`);
            return require(`@/assets/img/home/bac/bg_${id}.jpg`);
        },
        scrollDown() {
            const vh = window.innerHeight;
            const scrollDistance = 0.6 * vh - 70;
            window.scrollTo({
                top: scrollDistance,
                behavior: 'smooth',
            });
        },
    }
}
</script>