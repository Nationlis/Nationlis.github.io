// script.js
document.addEventListener('DOMContentLoaded', () => {
    const images = [
        'images/slide1.webp',
        'images/slide2.webp',
        'images/slide3.webp'
    ];

    class Carousel {
        constructor(images) {
            this.slide = document.querySelector('.carousel-slide');
            this.indicators = document.querySelector('.indicators');
            this.currentIndex = 0;
            this.autoPlayInterval = null;
            this.imageWidth = 0;

            // 创建图片和指示器
            images.forEach((img, index) => {
                const image = new Image();
                image.src = img;
                image.alt = `Slide ${index + 1}`;
                image.classList.add('slide-image');
                this.slide.appendChild(image);

                const indicator = document.createElement('span');
                indicator.addEventListener('click', () => this.goToSlide(index));
                this.indicators.appendChild(indicator);
            });

            // 初始化尺寸
            this.initSize();
            window.addEventListener('resize', () => this.initSize());

            // 事件绑定
            document.querySelector('.prev-btn').addEventListener('click', () => this.prevSlide());
            document.querySelector('.next-btn').addEventListener('click', () => this.nextSlide());

            this.startAutoPlay();
            this.slide.parentElement.addEventListener('mouseenter', () => this.stopAutoPlay());
            this.slide.parentElement.addEventListener('mouseleave', () => this.startAutoPlay());

            this.updateActive();
        }

        initSize() {
            this.imageWidth = this.slide.clientWidth;
            this.slide.style.transform = `translateX(-${this.currentIndex * this.imageWidth}px)`;
        }

        updateActive() {
            // 更新指示器和滑动位置
            this.slide.style.transform = `translateX(-${this.currentIndex * this.imageWidth}px)`;
            document.querySelectorAll('.indicators span').forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentIndex);
            });
        }

        goToSlide(index) {
            if (index >= 0 && index < images.length) {
                this.currentIndex = index;
                this.updateActive();
            }
        }

        nextSlide() {
            this.currentIndex = (this.currentIndex + 1) % images.length;
            this.updateActive();
        }

        prevSlide() {
            this.currentIndex = (this.currentIndex - 1 + images.length) % images.length;
            this.updateActive();
        }

        startAutoPlay() {
            if (!this.autoPlayInterval) {
                this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
            }
        }

        stopAutoPlay() {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    new Carousel(images);
});