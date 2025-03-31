// 寮曞叆GSAP搴?
// 娉ㄦ剰锛氶渶瑕佸湪HTML涓坊鍔燝SAP CDN閾炬帴

// 绛夊緟DOM鍔犺浇瀹屾垚
document.addEventListener('DOMContentLoaded', () => {
  // 娉ㄥ唽鎻掍欢
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  
  // 鍒濆鍖栨粴鍔ㄨЕ鍙戝姩鐢?
  initScrollAnimations();
  
  // 鍒濆鍖栬宸粴鍔ㄦ晥鏋?
  initParallaxEffects();
  
  // 鍒濆鍖栫壒娈婁氦浜掓晥鏋?
  initSpecialEffects();
  
  // 鍒濆鍖栨枃瀛楅€愬瓧鏄剧ず鏁堟灉
  initTextRevealEffects();
  
  // 娣″叆椤甸潰
  gsap.to('body', {
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
  });
});

// 鍒濆鍖栨粴鍔ㄨЕ鍙戠殑鍔ㄧ敾
function initScrollAnimations() {
  // 涓烘墍鏈塻ection鏍囬鍒涘缓娣″叆鍔ㄧ敾锛屾帓闄ょ涓€灞?
  gsap.utils.toArray('section:not(.hero) h2').forEach(title => {
    gsap.fromTo(title, 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
  
  // 涓烘墍鏈夋弿杩版钀藉垱寤烘贰鍏ュ姩鐢?
  const descriptions = [
    '.beauty-description',
    '.encryption-description',
    '.satellite-description',
    '.translator-description',
    '.security-content p',
    '.engineering-subtitle',
    '.vps-description p',
    '.more-than',
    '.non-stop'
  ];
  
  descriptions.forEach(selector => {
    gsap.utils.toArray(selector).forEach(desc => {
      gsap.fromTo(desc,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: desc,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  });
  
  // 鍥剧墖娣″叆鍔ㄧ敾
  const images = [
    '.processor-img',
    '.phone-detail-img',
    '.satellite-features-container',
    '.translator-image',
    '.phone-security-img'
  ];
  
  images.forEach(selector => {
    gsap.utils.toArray(selector).forEach(img => {
      gsap.fromTo(img,
        { 
          opacity: 0,
          scale: 1.05,
          filter: 'blur(5px)'
        },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  });
  
  // 涓篵eauty-img娣诲姞鏇寸畝鍗曠殑娣″叆鍔ㄧ敾
  gsap.fromTo('.beauty-img',
    { 
      opacity: 0,
      scale: 1.02
    },
    {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.beauty-img',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    }
  );
  
  // 鐗规€ч」鍔ㄧ敾 - 浼樺寲beauty-feature鐨勫姩鐢?
  gsap.utils.toArray('.beauty-feature').forEach((item, i) => {
    gsap.fromTo(item,
      { 
        opacity: 0,
        y: 15, // 浣跨敤鍨傜洿鏂瑰悜鐨勫姩鐢绘浛浠ｆ按骞虫柟鍚?
      },
      {
        opacity: 1, 
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.beauty-features',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        delay: i * 0.1 // 鍑忓皬闂撮殧鏃堕棿锛岃鍔ㄧ敾鏇磋繛璐?
      }
    );
  });
  
  // 鍏朵粬鐗规€ч」鐨勫姩鐢?
  animateFeatureItems('.processor-item', 0.15, 0);
  animateFeatureItems('.feature-item', 0.15, 0);
  animateFeatureItems('.engineering-features li', 0.1, 20);
  
  // 姣涚幓鐠冩晥鏋滃姩鐢?
  gsap.fromTo('.feature-box',
    {
      opacity: 0,
      y: 30,
      backdropFilter: 'blur(0px)'
    },
    {
      opacity: 1,
      y: 0,
      backdropFilter: 'blur(15px)',
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.satellite-features',
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    }
  );
  
  // 鎸夐挳鍔ㄧ敾鏁堟灉
  gsap.utils.toArray('.pre-order-link').forEach(btn => {
    gsap.fromTo(btn,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: btn,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // SplitText鏁堟灉 (闇€瑕侀澶栫殑GSAP SplitText鎻掍欢)
  if (window.SplitText) {
    const titleElements = gsap.utils.toArray(['.discretion .security-content h2']);
    titleElements.forEach(element => {
      const split = new SplitText(element, { type: "chars,words" });
      
      gsap.from(split.chars, {
        opacity: 0,
        y: 10,
        stagger: 0.02,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    });
  }
}

// 鍒濆鍖栬宸粴鍔ㄦ晥鏋?
function initParallaxEffects() {
  // 涓鸿儗鏅浘娣诲姞瑙嗗樊鏁堟灉
  gsap.utils.toArray([
    '.satellite-features-container',
    '.translator-image',
    '.phone-security-img'
  ]).forEach(element => {
    gsap.to(element, {
      y: -80,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5
      }
    });
  });
  
  // 绉婚櫎POWER OF BEAUTY鍖哄煙鐨勮儗鏅綅缃宸晥鏋滐紝鍙兘瀵艰嚧濂囨€晥鏋?
}

// 鍒濆鍖栫壒娈婁氦浜掓晥鏋?
function initSpecialEffects() {
  // 榧犳爣鎮仠鏁堟灉
  const hoverElements = document.querySelectorAll('.pre-order-btn, .pre-order-link');
  
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
  
  // 鎸夐挳寰氦浜?
  const preOrderLink = document.querySelectorAll('.pre-order-link');
  preOrderLink.forEach(link => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, {
        x: 5,
        duration: 0.3,
        ease: 'power1.out'
      });
    });
    
    link.addEventListener('mouseleave', () => {
      gsap.to(link, {
        x: 0,
        duration: 0.3,
        ease: 'power1.out'
      });
    });
  });
  
  // 鍥剧墖鎮仠鏁堟灉
  gsap.utils.toArray('.beauty-feature, .processor-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        y: -5,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
  
  // 骞虫粦婊氬姩鍒伴敋鐐?
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: targetElement,
            offsetY: 50
          },
          ease: 'power3.out'
        });
      }
    });
  });
}

// 鐗规€ч」鐩寜椤哄簭鍔ㄧ敾
function animateFeatureItems(selector, staggerTime, xOffset) {
  gsap.utils.toArray(selector).forEach((item, i) => {
    gsap.fromTo(item,
      { 
        opacity: 0,
        x: xOffset,
      },
      {
        opacity: 1, 
        x: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        delay: i * staggerTime
      }
    );
  });
}

// 鍒濆鍖栨枃瀛楅€愬瓧鏄剧ず鏁堟灉
function initTextRevealEffects() {
  // 濡傛灉SplitText鎻掍欢瀛樺湪
  if (window.SplitText) {
    // 搴旂敤浜庝富瑕佹爣棰?
    const mainTitles = gsap.utils.toArray([
      '.security-content h2',
      '.engineering-content h2',
      '.translator-content h2'
    ]);
    
    mainTitles.forEach(element => {
      if (!element) return;
      
      // 鍒涘缓鍒嗗壊鏂囨湰瀹炰緥
      const splitText = new SplitText(element, {
        type: "chars,words,lines",
        linesClass: "split-line"
      });
      
      // 缁欐瘡涓瓧绗︽坊鍔犲姩鐢?
      gsap.from(splitText.chars, {
        opacity: 0,
        y: 20,
        rotationX: -90,
        stagger: 0.02,
        duration: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    });
    
    // 搴旂敤浜庢钀芥枃鏈?
    const paragraphs = gsap.utils.toArray([
      '.security-content p',
      '.translator-description'
    ]);
    
    paragraphs.forEach(element => {
      if (!element) return;
      
      // 鍒涘缓鍒嗗壊鏂囨湰瀹炰緥锛屽彧鍒嗗壊鍗曡瘝
      const splitText = new SplitText(element, {
        type: "words",
        wordsClass: "split-word"
      });
      
      // 缁欐瘡涓崟璇嶆坊鍔犲姩鐢?
      gsap.from(splitText.words, {
        opacity: 0,
        y: 10,
        stagger: 0.01,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    });
  }
} 
