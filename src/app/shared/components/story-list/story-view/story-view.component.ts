import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-story-view',
  templateUrl: './story-view.component.html',
  styleUrls: ['./story-view.component.scss'],
})
export class StoryViewComponent implements AfterViewInit {

  @ViewChild('swiperContainer')
  swiperContainer!: ElementRef;

  constructor() { }

  slides = [
    { type: 'image', src: 'https://picsum.photos/450/800' },
    { type: 'video', src: 'https://exit109.com/~dnn/clips/RW20seconds_1.mp4#t=.1' },
    { type: 'image', src: 'https://picsum.photos/450/810' }
  ];


  private swiper: any;

  ngAfterViewInit(): void {
    this.initializeSwiper();
  }

  private initializeSwiper(): void {
    this.swiper = new Swiper(this.swiperContainer.nativeElement, {
      direction: 'horizontal',
      loop: true,
      autoplay: {
        delay: 5000, // Adjust based on your needs
        disableOnInteraction: false,
      },
   //   slidesPerView: 1,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        renderBullet: (index, className) => {
          // Custom bullet with progress bar
          return `<div class="${className}"><span class="swiper-pagination-progress"></span></div>`;
        },
      },
      on: {
        init: () => {
          this.setVideosAutoplayDuration();
        },
        slideChangeTransitionStart: () => {
          this.updatePaginationProgress();
          const currentSlide = this.swiper.slides[this.swiper.realIndex];
          const autoplayDelay = currentSlide.getAttribute('data-swiper-autoplay');
          if (autoplayDelay) {
            this.updateSwiperAutoplayDelay(parseInt(autoplayDelay, 10));
          }
        },
        // Consider adding other relevant callbacks for autoplay stop, start, etc.
      },
    });
  }

  setVideosAutoplayDuration(): void {
    // This function can set video duration on each video element
    // and adjust swiper's autoplay delay dynamically per slide if needed.
    const videos = this.swiperContainer.nativeElement.querySelectorAll('video');
    videos.forEach((video: any, index: number) => {
      video.onloadedmetadata = () => {
        const duration = video.duration;
        // Assuming you store the duration in a data attribute for each slide
        this.swiper.slides[index].setAttribute('data-swiper-autoplay', `${duration * 1000}`); // Convert to milliseconds

        // If the video of the current slide just loaded, update the autoplay delay immediately
        if (index === this.swiper.realIndex) {
          this.updateSwiperAutoplayDelay(duration * 1000);
        }
      };
    });
  }

  private updateSwiperAutoplayDelay(delay: number): void {
    // Stop autoplay to reset the delay
    this.swiper.autoplay.stop();

    // Set new delay and start autoplay again
    this.swiper.params.autoplay.delay = delay;
    this.swiper.autoplay.start();
  }

  private updatePaginationProgress(): void {
    const activeIndex = this.swiper.realIndex;
    const video = this.swiper.slides[activeIndex].querySelector('video');
    if (video) {
      const progressElement = this.swiper.pagination.bullets[activeIndex].querySelector('.swiper-pagination-progress');
      const updateProgress = () => {
        const percentage = (video.currentTime / video.duration) * 100;
        progressElement.style.width = `${percentage}%`;
      };

      video.addEventListener('timeupdate', updateProgress);

      // Remove previous event listeners if any to avoid memory leaks
      video.onplay = () => {
        video.currentTime = 0; // Restart video on slide change if needed
        updateProgress(); // Initial update
      };

      video.onended = () => {
        this.swiper.slideNext(); // Move to next slide after video ends
      };
    }
  }

}
