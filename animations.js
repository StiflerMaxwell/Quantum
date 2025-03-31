// 引入GSAP库
// 注意：需要在HTML中添加GSAP CDN链接

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
  // 注册插件
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  
  // 初始化动画
  initAnimations();
  
  // 初始化滚动触发
  initScrollTriggers();
  
  // 初始化页面淡入效果
  gsap.to('body', {
    opacity: 1,
    duration: 1,
    ease: 'power2.inOut',
    onComplete: () => {
      document.body.style.transition = 'none'; // 移除过渡效果以避免冲突
    }
  });
});

// 初始化基础动画
function initAnimations() {
  // 首屏元素淡入动画
  const heroTl = gsap.timeline();
  
  // 控制首屏动画时间线
  heroTl
    .fromTo('.vertu-title', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
      0
    )
    .fromTo('.subtitle', 
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
      0.3
    )
    .fromTo('.pre-order-btn', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      0.6
    );
}

// 初始化滚动触发动画
function initScrollTriggers() {
  // 创建文本渐入效果
  const createTextReveal = (selector, delay = 0) => {
    gsap.utils.toArray(selector).forEach(element => {
      // 只修改元素的位置和透明度，不更改任何h2的风格或样式
      gsap.fromTo(element,
        { 
          opacity: 0,
          y: 40
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: delay,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "top 60%",
            toggleActions: "play none none none",
            once: true
          }
        }
      );
    });
  };

  // 创建批量渐入效果
  const createStaggerReveal = (selector, staggerTime = 0.08) => {
    const elements = gsap.utils.toArray(selector);
    if (elements.length === 0) return;
    
    gsap.fromTo(elements,
      { 
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: {
          each: staggerTime,
          ease: "power2.inOut"
        },
        ease: "power3.out",
        scrollTrigger: {
          trigger: elements[0].parentNode || elements[0],
          start: "top 80%",
          end: "top 60%",
          toggleActions: "play none none none",
          once: true
        }
      }
    );
  };

  // 应用于标题 - 仅应用动画效果，不修改样式
  createTextReveal('section:not(.hero) h2');
  
  // 应用于所有描述文本
  createTextReveal('p[class$="-description"], .engineering-subtitle, .vps-description p, .more-than, .non-stop', 0.15);
  
  // 应用于所有图片
  gsap.utils.toArray([
    '.processor-img',
    '.phone-detail-img',
    '.beauty-img',
    '.satellite-features-container',
    '.translator-image',
    '.phone-security-img'
  ]).forEach(img => {
    gsap.fromTo(img,
      { 
        opacity: 0,
        scale: 1.05,
        y: 30
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: img,
          start: 'top 85%',
          end: 'top 40%',
          toggleActions: 'play none none none',
          once: true,
          scrub: false
        }
      }
    );
  });

  // 处理器特性项渐入
  createStaggerReveal('.processor-item', 0.12);

  // 美学特性水平交错淡入
  gsap.utils.toArray('.beauty-feature').forEach((feature, index) => {
    // 根据索引确定方向
    const startX = index % 2 === 0 ? -30 : 30;
    
    gsap.fromTo(feature,
      { 
        opacity: 0,
        x: startX
      },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: feature,
          start: "top 85%",
          end: "top 60%",
          toggleActions: "play none none none",
          once: true
        }
      }
    );
  });

  // 卫星通信特性毛玻璃效果
  gsap.fromTo('.feature-box',
    { 
      opacity: 0, 
      backdropFilter: 'blur(0px)',
      webkitBackdropFilter: 'blur(0px)',
      y: 40
    },
    {
      opacity: 1,
      backdropFilter: 'blur(20px)',
      webkitBackdropFilter: 'blur(20px)',
      y: 0,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.satellite-features',
        start: 'top 85%',
        end: 'top 60%',
        toggleActions: 'play none none none',
        once: true
      }
    }
  );

  // 工程特性列表淡入
  createStaggerReveal('.engineering-features li', 0.08);

  // VPS统计数据动画
  gsap.utils.toArray('.stat').forEach((stat, index) => {
    const statNum = stat.querySelector('h3');
    const statText = stat.querySelectorAll('p');
    
    // 文本淡入
    gsap.fromTo(statText,
      { opacity: 1, y: 0 },
      { 
        opacity: 1, 
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stat,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true
        }
      }
    );
    
    // 数字元素动画
    gsap.fromTo(statNum,
      { opacity: 1, y: 0, scale: 1 },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 1.5,
        delay: 0.2 + (index * 0.1),
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stat,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true
        }
      }
    );
  });

  // 相机功能列表淡入
  createStaggerReveal('.feature-list li', 0.1);
  
  // 为特性项添加淡入效果
  gsap.utils.toArray('.feature-item').forEach((item, index) => {
    gsap.fromTo(item,
      { 
        opacity: 0,
        y: 20 
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.1 * index,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.feature-box',
          start: "top 85%",
          end: "top 60%",
          toggleActions: "play none none none",
          once: true
        }
      }
    );
  });
}

// 按钮悬停效果
document.addEventListener('DOMContentLoaded', () => {
  // 按钮悬停效果
  document.querySelectorAll('.pre-order-btn, .pre-order-link').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        backgroundColor: btn.classList.contains('pre-order-btn') ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.1)',
        duration: 0.5,
        ease: 'power2.out'
      });
    });
    
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        backgroundColor: btn.classList.contains('pre-order-btn') ? '#fff' : 'transparent',
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  });
  
  // 平滑滚动到锚点
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        gsap.to(window, {
          duration: 1.2,
          scrollTo: {
            y: targetElement,
            offsetY: 50,
            autoKill: false
          },
          ease: 'power3.inOut'
        });
      }
    });
  });

  // 添加视差滚动效果
  gsap.utils.toArray('.beauty-img, .processor-img').forEach(img => {
    gsap.to(img, {
      y: -40,
      ease: "none",
      scrollTrigger: {
        trigger: img,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });
  });
}); 
