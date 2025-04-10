document.addEventListener('DOMContentLoaded', function () {
  // 初始化GSAP滚动触发器
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

  // 添加导航滚动效果
  document.querySelector('.explore-btn').addEventListener('click', function () {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: {
        y: '.quantum-agape',
        offsetY: 0,
      },
      ease: 'power2.inOut',
    })
  })

  // 为每个部分添加滚动动画
  const sections = document.querySelectorAll('section:not(.hero-banner)')
  sections.forEach((section) => {
    gsap.fromTo(
      section,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
  })

  // 为产品卡片添加悬停效果
  const patternCards = document.querySelectorAll('.pattern-card')
  patternCards.forEach((card) => {
    card.addEventListener('mouseenter', function () {
      gsap.to(this, { y: -10, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.5)', duration: 0.3 })
    })

    card.addEventListener('mouseleave', function () {
      gsap.to(this, { y: 0, boxShadow: 'none', duration: 0.3 })
    })
  })

  // 相机规格动画
  const specs = document.querySelectorAll('.spec')
  gsap.fromTo(
    specs,
    { opacity: 0, x: (i, el) => (el.classList.contains('left') ? -30 : 30) },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.camera-features',
        start: 'top 70%',
      },
    }
  )

  // 视频播放按钮效果
  const playButton = document.querySelector('.play-button')
  if (playButton) {
    playButton.addEventListener('mouseenter', function () {
      gsap.to(this, { scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.4)', duration: 0.3 })
    })

    playButton.addEventListener('mouseleave', function () {
      gsap.to(this, { scale: 1, backgroundColor: 'rgba(255, 255, 255, 0.2)', duration: 0.3 })
    })

    playButton.addEventListener('click', function () {
      // 这里可以添加视频播放的功能
      alert('视频将在此处播放')
    })
  }

  // 添加视差滚动效果
  gsap.to('.hero-banner', {
    backgroundPosition: '50% 30%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-banner',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  })

  gsap.to('.celestial-dawn', {
    backgroundPosition: '50% 30%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.celestial-dawn',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })

  // 为统计数字添加计数动画
  const statNumbers = document.querySelectorAll('.stat-number')
  statNumbers.forEach((stat) => {
    const dataTarget = parseInt(stat.getAttribute('data-target') ?? 0)
    const targetNumber = dataTarget || parseInt(stat.textContent)
    const isPlus = targetNumber > 1000
    gsap.fromTo(
      stat,
      { innerText: 0 },
      {
        innerText: targetNumber,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: stat,
          start: 'top 80%',
        },
        onUpdate: function () {
          const textValue = Math.floor(this.targets()[0].innerText)
          if (isPlus) {
            stat.textContent = textValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '+'
          } else {
            stat.textContent = textValue + '+'
          }
        },
      }
    )
  })

  addCelestialDawn()
})

// 轮播图实现
function addCelestialDawn() {
  // 轮播图实现
  // TODO: 轮播图数据待添加
  const slides = [
    {
      background: 'images/celestial-dawn.png',
      title: 'Phoenix Flame',
      description: 'Capturing the vibrant red-orange <br /> hues and dynamic energy',
    },
    {
      background: 'images/celestial-dawn2.png',
      title: 'Phoenix Flame',
      description: 'Capturing the vibrant red-orange <br /> hues and dynamic energy',
    },
    {
      background: 'images/celestial-dawn3.png',
      title: 'ETERNAL FLOW',
      description: 'Dynamic patterns that<br>capture infinite possibilities',
    },
  ]

  let currentSlide = 0
  const celestialSectionWrapper = document.querySelector('.celestial-dawn')
  const celestialSection = celestialSectionWrapper.querySelector('.celestial-dawn-bg')
  const titleElement = celestialSectionWrapper.querySelector('h2')
  const descriptionElement = celestialSectionWrapper.querySelector('p')

  // 设置初始状态
  updateSlide()

  // 上一张
  document.querySelector('.prev-slide').addEventListener('click', function () {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length
    updateSlide()
  })

  // 下一张
  document.querySelector('.next-slide').addEventListener('click', function () {
    currentSlide = (currentSlide + 1) % slides.length
    updateSlide()
  })

  function updateSlide() {
    const slide = slides[currentSlide]
    celestialSection.style.backgroundImage = `url('${slide.background}')`
    titleElement.innerHTML = slide.title
    descriptionElement.innerHTML = slide.description

    // 添加淡入效果
    gsap.fromTo(
      [titleElement, descriptionElement],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 }
    )
  }
}

// 视频播放功能
document.addEventListener('DOMContentLoaded', function() {
  // 获取元素
  const playButton = document.querySelector('.play-video-icon');
  const videoContainer = document.querySelector('.video-showcase-video-container');
  const video = document.querySelector('.video-showcase-video');

  // 确保元素存在
  if (playButton && videoContainer && video) {
    // 添加点击事件监听器
    playButton.addEventListener('click', function() {
      // 显示视频容器
      videoContainer.classList.add('active');

      // 隐藏播放按钮
      // playButton.classList.add('hidden');

      // 播放视频
      video.play().catch(error => {
        console.error('视频播放失败:', error);
        // 如果视频播放失败，恢复按钮和容器状态
        videoContainer.classList.remove('active');
        playButton.classList.remove('hidden');
      });
    });

    // 监听视频的播放和停止。停止播放时，显示按钮
    video.addEventListener('pause', function() {
      playButton.classList.remove('hidden');
    });
    video.addEventListener('play', function() {
      playButton.classList.add('hidden');
    });

    // 当点击视频时，则切换播放和停止
    video.addEventListener('click', function() {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });

    // 当视频结束时，恢复按钮和容器状态
    video.addEventListener('ended', function() {
      if (!video.loop) { // 如果视频不是循环播放的
        videoContainer.classList.remove('active');
        playButton.classList.remove('hidden');
      }
    });
  }
});
