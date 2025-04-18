// 引入GSAP库
// 注意：需要在HTML中添加GSAP CDN链接

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
  // 注册插件
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  
  // 立即执行的卫星通信部分布局优化
  (function optimizeSatelliteLayout() {
    const satelliteContainer = document.querySelector('.satellite-features-container');
    if (satelliteContainer) {
      // 设置容器初始高度
      const featureBox = satelliteContainer.querySelector('.feature-box');
      
      // 先隐藏但不设置位移
      gsap.set(featureBox, { opacity: 0 });
      
      // 防止元素内部位移跳动，只设置透明度
      const featureItems = satelliteContainer.querySelectorAll('.feature-item');
      gsap.set(featureItems, { opacity: 0 });
      
      // 设置布局高度
      setTimeout(() => {
        if (featureBox && featureBox.clientHeight > 0) {
          satelliteContainer.style.minHeight = `${featureBox.clientHeight + 40}px`;
        }
        
        // 设置文字内容固定高度，防止高度跳动
        featureItems.forEach(item => {
          const h3 = item.querySelector('h3');
          const p = item.querySelector('p');
          
          if (h3 && h3.clientHeight > 0) {
            h3.style.height = `${h3.clientHeight}px`;
          }
          
          if (p && p.clientHeight > 0) {
            p.style.height = `${p.clientHeight}px`;
          }
        });
      }, 100);
    }
  })();
  
  // 立即执行的VPS部分布局优化
  (function optimizeVPSLayout() {
    const vpsSection = document.querySelector('.vps');
    if (vpsSection) {
      // 为VPS部分的h3元素设置渐入动画
      const statH3Elements = vpsSection.querySelectorAll('.stat h3');
      if (statH3Elements.length > 0) {
        // 先将元素设置为不可见
        gsap.set(statH3Elements, { opacity: 0, y: 10 });
        
        // 为每个h3元素创建平滑的渐入动画
        statH3Elements.forEach((element, index) => {
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 1.2, // 动画持续时间更长
            delay: 0.2 + (index * 0.15), // 每个元素之间有延迟
            ease: "power2.out" // 使用更平滑的缓动函数
          });
        });
      }
      
      // 处理其他VPS元素
      const otherVpsElements = vpsSection.querySelectorAll('.vps-description p, .more-than, .non-stop');
      if (otherVpsElements.length > 0) {
        // 直接设置可见性，避免闪烁
        gsap.set(otherVpsElements, { opacity: 1, y: 0, clearProps: "all" });
      }
      
      // 确保h2标题也直接可见
      const vpsTitle = vpsSection.querySelector('h2');
      if (vpsTitle) {
        gsap.set(vpsTitle, { opacity: 1, y: 0, clearProps: "all" });
      }
    }
  })();
  
  // 预设所有需要动画的元素为不可见，防止闪烁
  presetAnimatedElements();
  
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

// 预设所有需要动画的元素为不可见
function presetAnimatedElements() {
  // 获取所有需要动画的元素
  const animatedSelectors = [
    'section:not(.hero):not(.vps) h2', // 排除VPS部分的h2
    'p[class$="-description"]:not(.vps-description p)', // 排除VPS部分的描述
    '.engineering-subtitle',
    '.processor-item',
    '.beauty-feature',
    '.engineering-features li',
    '.processor-img',
    '.phone-detail-img',
    '.beauty-img',
    '.satellite-features-container',
    '.translator-image',
    '.phone-security-img',
    '.feature-list li'
  ];
  
  // 立即设置所有元素的初始状态为不可见
  animatedSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      gsap.set(elements, { opacity: 0, y: 10 });
    }
  });
  
  // 特别处理encryption部分
  const encryptionItems = document.querySelectorAll('.encryption .processor-item');
  if (encryptionItems.length > 0) {
    gsap.set(encryptionItems, { opacity: 0, y: 10 });
  }
  
  // 特别处理卫星通信特性项 - 只设置透明度，不添加Y轴位移
  const satelliteItems = document.querySelectorAll('.satellite-features .feature-item');
  if (satelliteItems.length > 0) {
    gsap.set(satelliteItems, { opacity: 0 });
  }
  
  // 特别处理feature-box容器
  const featureBox = document.querySelector('.feature-box');
  if (featureBox) {
    gsap.set(featureBox, { opacity: 0 });
  }
}

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
  // 为encryption部分添加专门优化
  function optimizeEncryptionSection() {
    const encryptionSection = document.querySelector('.encryption');
    if (!encryptionSection) return;
    
    // 稳定布局，避免跳动
    const processorRow = encryptionSection.querySelector('.processor-row');
    if (processorRow) {
      // 预设最小高度
      const height = processorRow.clientHeight;
      if (height > 0) {
        processorRow.style.minHeight = `${height}px`;
      }
      
      // 停用原有的交错动画，使用更稳定的动画
      const items = processorRow.querySelectorAll('.processor-item');
      if (items.length > 0) {
        // 清除所有可能应用的动画
        gsap.killTweensOf(items);
        
        // 统一处理所有项目的动画
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: processorRow,
            start: 'top 85%',
            once: true
          }
        });
        
        // 预先设置状态 - 确保渲染前就不可见
        gsap.set(items, { opacity: 0, y: 10 });
        
        // 平滑淡入所有项，不使用交错效果，减少布局计算
        tl.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power1.out',
          stagger: 0.05, // 极轻微的交错，避免过多计算
          clearProps: ''
        });
      }
      
      // 特别处理encryption部分的标题和描述
      const title = encryptionSection.querySelector('h2');
      const description = encryptionSection.querySelector('.encryption-description');
      
      if (title) {
        // 确保标题初始状态就是不可见的
        gsap.set(title, { opacity: 0, y: 10 });
        
        gsap.to(title, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 90%',
            once: true
          }
        });
      }
      
      if (description) {
        // 确保描述初始状态就是不可见的
        gsap.set(description, { opacity: 0, y: 10 });
        
        gsap.to(description, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          delay: 0.1, // 轻微延迟，让标题先显示
          scrollTrigger: {
            trigger: description,
            start: 'top 90%',
            once: true
          }
        });
      }
    }
  }

  // 在DOM内容加载后执行优化
  document.addEventListener('DOMContentLoaded', optimizeEncryptionSection);

  // 处理器特性项渐入 - 优化以减少卡顿
  const processorItems = gsap.utils.toArray('.processor-item:not(.encryption .processor-item)');
  if (processorItems.length > 0) {
    // 使用统一的时间线处理所有项，而不是单独动画
    const processorTl = gsap.timeline({
      scrollTrigger: {
        trigger: processorItems[0].parentElement,
        start: 'top 90%',
        end: 'top 60%',
        toggleActions: 'play none none none',
        once: true
      }
    });
    
    // 预设初始状态
    gsap.set(processorItems, { opacity: 0, y: 15 });
    
    // 添加到时间线，使用更短的动画时间和更平滑的缓动
    processorItems.forEach((item, index) => {
      processorTl.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.6, // 更短的时间
        ease: 'power2.out', // 更平滑的缓动
        clearProps: '', // 不清除属性
      }, index * 0.08); // 轻微的交错效果
    });
  }

  // 创建文本渐入效果
  const createTextReveal = (selector, delay = 0) => {
    gsap.utils.toArray(selector).forEach(element => {
      // 先设置初始状态，确保渲染前就不可见
      gsap.set(element, { opacity: 0, y: 20 });
      
      // 使用to而不是fromTo，避免重复设置初始状态导致闪烁
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 0.6, // 减少动画时间
        ease: "power2.out", // 更平滑的缓动
        delay: delay,
        clearProps: '',
        scrollTrigger: {
          trigger: element,
          start: "top 85%", // 提前触发
          toggleActions: "play none none none",
          once: true
        }
      });
    });
  };

  // 创建批量渐入效果
  const createStaggerReveal = (selector, staggerTime = 0.08) => {
    const elements = gsap.utils.toArray(selector);
    if (elements.length === 0) return;
    
    // 先设置初始状态
    gsap.set(elements, { opacity: 0, y: 15 });
    
    // 统一使用时间线处理所有元素，避免各自独立动画造成的不同步
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: elements[0].parentNode || elements[0],
        start: "top 85%",
        toggleActions: "play none none none",
        once: true
      }
    });
    
    // 添加到时间线
    tl.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.6, // 减少动画时间
      stagger: {
        each: staggerTime,
        ease: "power2.out"
      },
      ease: "power2.out",
      clearProps: ''
    });
  };

  // 应用于标题 - 仅应用动画效果，不修改样式
  createTextReveal('section:not(.hero) h2');
  
  // 应用于所有描述文本
  createTextReveal('p[class$="-description"], .engineering-subtitle, .vps-description p, .more-than, .non-stop', 0.15);
  
  // 应用于所有图片 - 优化动画避免跳动
  gsap.utils.toArray([
    '.processor-img',
    '.phone-detail-img',
    '.beauty-img',
    '.satellite-features-container',
    '.translator-image',
    '.phone-security-img'
  ]).forEach(img => {
    // 预设状态
    gsap.set(img, { opacity: 0, y: 15, scale: 1.02 }); // 减小初始位移和缩放值
    
    // 创建动画
    gsap.to(img, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.7, // 缩短动画时间
      ease: 'power2.out', // 使用更平滑的缓动
      clearProps: '', // 不清除属性，避免跳动
      scrollTrigger: {
        trigger: img,
        start: 'top 90%', // 提前触发
        end: 'top 50%',
        toggleActions: 'play none none none',
        once: true
      }
    });
  });

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
  gsap.set('.feature-box', { 
    opacity: 0, 
    backdropFilter: 'blur(0px)',
    webkitBackdropFilter: 'blur(0px)',
    y: 0 // 无Y轴移动，防止上下跳动
  });
  
  gsap.to('.feature-box', {
    opacity: 1,
    backdropFilter: 'blur(20px)',
    webkitBackdropFilter: 'blur(20px)',
    y: 0,
    duration: 1.0,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.satellite-features',
      start: 'top 90%',
      end: 'top 60%',
      toggleActions: 'play none none none',
      once: true
    }
  });

  // 为特性项添加淡入效果 - 只使用透明度变化，不要位移
  const featureItems = gsap.utils.toArray('.satellite-features .feature-item');
  if (featureItems.length > 0) {
    // 创建时间线，控制顺序出现
    const featureTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.feature-box',
        start: "top 85%",
        toggleActions: "play none none none",
        once: true
      }
    });
    
    // 为每个元素设置初始状态 - 只改变透明度，不移动位置
    gsap.set(featureItems, { opacity: 0 });
    
    // 按顺序添加到时间线
    featureItems.forEach((item, index) => {
      featureTl.to(item, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        clearProps: ''
      }, index * 0.15); // 使用更明显的延迟，确保顺序感
    });
  }

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

  // 移除视差滚动效果 - 根据用户要求去掉图片随滚动浮动的动画
  /* 
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
  */
}); 
