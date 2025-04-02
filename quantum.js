document.addEventListener('DOMContentLoaded', function() {
    // 注册GSAP插件
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    // 检查是否为移动端
    const isMobile = window.innerWidth <= 768;
    
    // 添加检查是否宽度小于1200px的变量
    const isNarrowScreen = window.innerWidth < 1200;
    
    // 添加loading类锁定滚动
    document.body.classList.add('loading');
    
    // 确保body初始状态正确
    document.body.style.visibility = 'hidden';
    document.body.style.opacity = '0';
    
    // 显示loading文字
    const loadingText = document.querySelector('.loading-text');
    setTimeout(() => {
        loadingText.classList.add('show');
    }, 100);
    
    // ===== 动画元素选择器 =====
    // 需要动画的元素选择器
    const animatedSelectors = [
        '.feature-item', 
        '.processor-item', 
        '.engineering-features li', 
        '.power-feature', 
        '.beauty-feature',
        '.stat h3',
        '.stat p',
        'section:not(.hero) h2',
        'section:not(.hero) p:not(.subtitle)',
        'section:not(.hero) img'
    ];
    
    // 合并为一个选择器字符串
    const combinedSelector = animatedSelectors.join(', ');
    
    // 获取所有需要动画的元素
    const animatedElements = document.querySelectorAll(combinedSelector);
    
    // 预先设置所有元素的初始状态为不可见
    // 这样元素在页面加载和滚动时不会闪烁
    gsap.set(animatedElements, { 
        opacity: 0,
        y: 10, // 减小初始位移值，减少视觉跳动
        force3D: true // 强制3D加速，提高渲染性能
    });
    
    // 特别处理encryption部分
    const encryptionSection = document.querySelector('.encryption');
    if (encryptionSection) {
        const encryptionElements = encryptionSection.querySelectorAll('h2, .encryption-description, .processor-item');
        if (encryptionElements.length > 0) {
            gsap.set(encryptionElements, { opacity: 0, y: 10, force3D: true });
        }
    }
    
    // 优化页面加载性能和减少布局偏移
    function optimizeLayout() {
        // 预设容器高度，减少重排重绘
        const sections = document.querySelectorAll('section:not(.hero)');
        sections.forEach(section => {
            // 计算内容高度并设置最小高度
            const content = section.querySelector('h2, .processor-row, .beauty-content');
            if (content && !section.style.minHeight) {
                // 为section设置一个合理的最小高度，减少布局偏移
                const sectionHeight = section.clientHeight;
                if (sectionHeight > 50) { // 确保有实际内容
                    section.style.minHeight = `${sectionHeight}px`;
                }
            }
        });
        
        // 优化处理器部分
        const processorSection = document.querySelector('.processor-features');
        if (processorSection) {
            const items = processorSection.querySelectorAll('.processor-item');
            if (items.length > 0) {
                // 预先设置内容而不是使用透明度为0，这样布局不会跳动
                items.forEach(item => {
                    // 设置一个初始的最小高度
                    const height = item.clientHeight || 80;
                    if (height > 0 && !item.style.minHeight) {
                        item.style.minHeight = `${height}px`;
                    }
                });
            }
        }
        
        // 特别优化satellite-features部分
        const satelliteContainer = document.querySelector('.satellite-features-container');
        if (satelliteContainer) {
            const featureBox = satelliteContainer.querySelector('.feature-box');
            
            // 保存容器原始高度
            if (satelliteContainer.clientHeight > 0) {
                satelliteContainer.style.minHeight = `${satelliteContainer.clientHeight}px`;
            }
            
            // 为内部特性项设置最小高度
            if (featureBox) {
                const featureItems = featureBox.querySelectorAll('.feature-item');
                featureItems.forEach(item => {
                    if (item.clientHeight > 0) {
                        item.style.minHeight = `${item.clientHeight}px`;
                    }
                });
            }
        }
        
        // 特别优化VPS部分
        const vpsSection = document.querySelector('.vps');
        if (vpsSection) {
            // 确保VPS部分高度稳定
            if (vpsSection.clientHeight > 0) {
                vpsSection.style.minHeight = `${vpsSection.clientHeight}px`;
            }
            
            // 设置所有内容直接可见，不需要动画
            const vpsContent = vpsSection.querySelector('.vps-content');
            if (vpsContent) {
                gsap.set(vpsContent, { opacity: 1, y: 0, clearProps: "all" });
                
                // 为stats部分设置样式
                const stats = vpsContent.querySelectorAll('.stat');
                stats.forEach(stat => {
                    // 设置可见度
                    gsap.set(stat, { opacity: 1, y: 0, clearProps: "all" });
                    
                    // 设置内部元素为可见
                    const statElements = stat.querySelectorAll('h3, p');
                    gsap.set(statElements, { opacity: 1, y: 0, clearProps: "all" });
                });
                
                // 为描述文本设置样式
                const descriptionP = vpsContent.querySelector('.vps-description p');
                if (descriptionP) {
                    gsap.set(descriptionP, { opacity: 1, y: 0, clearProps: "all" });
                }
            }
            
            // 确保标题可见
            const vpsTitle = vpsSection.querySelector('h2');
            if (vpsTitle) {
                gsap.set(vpsTitle, { opacity: 1, y: 0, clearProps: "all" });
            }
        }
    }
    
    // 等待页面完全加载后再开始动画
    window.addEventListener('load', function() {
        // 标记GSAP已加载，并已设置好初始状态
        document.body.classList.add('js-loaded');
        
        // 优化布局以减少偏移和跳动
        optimizeLayout();
        
        // 更新窗口宽度检测
        const isMobile = window.innerWidth <= 768;
        const isNarrowScreen = window.innerWidth < 1200;
        
        // 延迟后移除loading screen - 移动端更快
        const loadingDelay = isMobile ? 1500 : 3000; // 移动端延迟减少到1.5秒
        
        setTimeout(() => {
            const loadingScreen = document.querySelector('.loading-screen');
            const heroBackground = document.querySelector('.hero-background');
            loadingScreen.classList.add('fade-out');
            
            // 等待loading screen淡出后再显示页面内容
            const fadeOutDelay = isMobile ? 500 : 800; // 移动端淡出时间减少到0.5秒
            
            setTimeout(() => {
                // 移除loading类，恢复滚动
                document.body.classList.remove('loading');
                
                // 显示页面内容
                document.body.style.visibility = 'visible';
                document.body.style.opacity = '1';
                
                // 显示背景图片条件： 移动端或窄屏
                if (isMobile || isNarrowScreen) {
                    heroBackground.style.display = 'block'; // 确保背景图片可见
                    heroBackground.classList.add('show');
                    
                    // 当显示背景图片时，调整文字颜色为白色
                    document.querySelector('.vertu-title').style.color = '#fff';
                    document.querySelector('.hero .subtitle').style.color = '#fff';
                } else {
                    // 在使用网格效果时，文字颜色设为黑色
                    document.querySelector('.vertu-title').style.color = '#000';
                    document.querySelector('.hero .subtitle').style.color = '#000';
                }
                
                // 创建主时间线
                const mainTl = gsap.timeline();
                
                // 设置初始状态
                gsap.set('.vertu-title', { opacity: 0, y: 30 });
                gsap.set('.hero .subtitle', { opacity: 0, y: 25 });
                
                // 首屏元素淡入效果 - 移动端更快
                const titleDelay = isMobile ? 0.2 : 0.5; // 移动端延迟减少
                const titleDuration = isMobile ? 0.8 : 1.2; // 移动端动画时间减少
                
                mainTl
                    .to('.vertu-title', 
                        { 
                            opacity: 1, 
                            y: 0, 
                            duration: titleDuration, 
                            ease: 'power3.out',
                            delay: titleDelay
                        }
                    )
                    .to('.hero .subtitle', 
                        { 
                            opacity: 1, 
                            y: 0, 
                            duration: titleDuration, 
                            ease: 'power3.out',
                            delay: isMobile ? 0.2 : 0.3
                        }
                    );

                // 只在PC端且屏幕宽度>=1200px时创建canvas效果
                if (!isMobile && !isNarrowScreen) {
                    const canvasContainer = document.querySelector('.canvas-container');
                    if (canvasContainer) {
                        // 创建网格效果
                        new GridEffect(canvasContainer, 'https://vertu-website-oss.vertu.com/2025/04/hero.webp');
                        
                        // 延迟显示canvas效果
                        setTimeout(() => {
                            canvasContainer.classList.add('show');
                        }, 800);
                    }
                }
                
            }, fadeOutDelay); // 等待loading screen淡出完成
        }, loadingDelay);
    });

    // ===== 滚动触发动画 =====
    
    // 为元素应用动画
    animatedElements.forEach((element, index) => {
        // 如果元素已经有动画或者是VPS部分的元素，跳过
        if (element.dataset.hasAnimation === 'true') return;
        
        // 检查元素是否属于VPS部分
        let isVpsElement = false;
        let parent = element;
        while (parent && parent !== document.body) {
            if (parent.classList && parent.classList.contains('vps')) {
                isVpsElement = true;
                break;
            }
            parent = parent.parentElement;
        }
        
        // 如果是VPS部分元素，直接跳过
        if (isVpsElement) {
            // 设置为已有动画，防止后续重复处理
            element.dataset.hasAnimation = 'true';
            // 确保元素可见
            gsap.set(element, { opacity: 1, y: 0, clearProps: "all" });
            return;
        }
        
        // 标记元素已经有动画
        element.dataset.hasAnimation = 'true';
        
        // 确定动画参数
        let config = {
            opacity: 0,
            y: 10, // 减少位移距离
            duration: 0.6, // 缩短动画时间
            ease: 'power2.out' // 使用更平滑的缓动
        };
        
        // 根据元素类型调整动画
        if (element.tagName === 'H2' || element.tagName === 'H3') {
            config.y = 15; // 减少标题的初始位移
        } else if (element.tagName === 'IMG') {
            config.y = 10; // 减少图片的初始位移
        } else if (element.classList.contains('feature-item') || 
                  element.classList.contains('beauty-feature') || 
                  element.parentElement.classList.contains('engineering-features')) {
            config.y = 10;
            config.delay = index % 4 * 0.05; // 减少交错时间，避免过长等待
        }
        
        // 应用滚动触发动画 - 使用GSAP's to() 而不是 fromTo()
        ScrollTrigger.create({
            trigger: element,
            start: isMobile ? 'top 95%' : 'top 90%',  // 提前触发以减少突然跳动
            once: true,
            markers: false, // 关闭标记
            onEnter: () => {
                // 使用一致的动画参数
                gsap.to(element, {
                    opacity: 1,
                    y: 0,
                    duration: config.duration,
                    delay: config.delay || 0,
                    ease: config.ease,
                    clearProps: '', // 不清除属性，避免跳动
                    overwrite: 'auto', // 自动处理重叠动画
                    force3D: true // 强制3D加速，提高渲染性能
                });
            }
        });
    });
    
    // 平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetElement,
                        offsetY: 50
                    },
                    ease: 'power3.inOut'
                });
            }
        });
    });

    // 图片加载完成后的处理
    const images = document.querySelectorAll('img');
    let loadedImagesCount = 0;

    function handleImageLoad() {
        loadedImagesCount++;
        if (loadedImagesCount === images.length) {
            document.body.classList.add('images-loaded');
        }
    }

    images.forEach(img => {
        if (img.complete) {
            handleImageLoad();
        } else {
            img.addEventListener('load', handleImageLoad);
            img.addEventListener('error', handleImageLoad);
        }
    });

    // 添加网格变形效果
    class GridEffect {
        constructor(container, imageUrl) {
            this.container = container;
            this.imageUrl = imageUrl;
            this.width = container.clientWidth || window.innerWidth;
            this.height = container.clientHeight || window.innerHeight;
            this.mouse = {
                x: 0,
                y: 0,
                prevX: 0,
                prevY: 0,
                vX: 0,
                vY: 0
            };
            
            // 添加效果参数
            this.params = {
                relaxation: 0.965,
                distance: 0.8,
                strength: 1.2,
                gridMap: false,
                rgbIntensity: 0, // 默认关闭RGB效果
                waveHeight: 0.01,
                waveSpeed: 0.3
            };
            
            this.initialize();
            this.setupEventListeners();
            
            // 设置初始波动
            this.planeMaterial.uniforms.uHoverState.value = 0.3;
            
            // 添加自动波动效果
            this.addAutoWave();
        }
        
        initialize() {
            // 创建场景
            this.scene = new THREE.Scene();
            
            // 检测是否为移动设备
            const isMobile = window.innerWidth <= 768;
            
            // 创建相机
            this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 100);
            this.camera.position.set(0, 0, 1);
            
            // 创建渲染器
            this.renderer = new THREE.WebGLRenderer({ 
                antialias: !isMobile, // 移动端关闭抗锯齿以提高性能
                alpha: true,
                powerPreference: isMobile ? 'low-power' : 'high-performance'
            });
            this.renderer.setSize(this.width, this.height);
            this.renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
            
            // 添加到DOM
            this.container.appendChild(this.renderer.domElement);
            
            // 设置canvas样式
            const canvas = this.renderer.domElement;
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.zIndex = '2';
            canvas.style.pointerEvents = 'none';
            
            if (isMobile) {
                // 移动端样式设置
                canvas.style.width = 'auto';
                canvas.style.height = '100%';
                canvas.style.maxHeight = '600px';
                canvas.style.objectFit = 'contain';
                canvas.style.margin = '0 auto';
                
                // 确保canvas居中
                this.container.style.display = 'flex';
                this.container.style.justifyContent = 'center';
                this.container.style.alignItems = 'center';
            } else {
                // 桌面样式
                canvas.style.width = '100%';
                canvas.style.height = '100%';
                canvas.style.objectFit = 'contain';
            }
            
            // 加载纹理
            this.textureLoader = new THREE.TextureLoader();
            
            // 设置容器宽高比
            const containerAspect = this.width / this.height;
            
            this.createPlane();
            this.animate();
        }
        
        createPlane() {
            // 使用与容器比例匹配的平面尺寸
            const containerAspect = this.width / this.height;
            
            // 检测是否为移动设备
            const isMobile = window.innerWidth <= 768;
            
            // 平面尺寸以短边为2.0，长边按比例计算
            let planeWidth, planeHeight;
            
            if (isMobile) {
                // 移动端使用固定比例，根据参考图调整
                // 根据实际图片比例约为1:2.5
                planeHeight = 5.0;
                planeWidth = 2.0;
            } else if (containerAspect >= 1) {
                // 桌面端宽屏，以高度为基准
                planeHeight = 2.0;
                planeWidth = planeHeight * containerAspect;
            } else {
                // 桌面端窄屏，以宽度为基准
                planeWidth = 2.0;
                planeHeight = planeWidth / containerAspect;
            }
            
            // 创建平面几何体 - 使用更多细分以获得更好的变形效果
            // 移动端使用更少的细分提升性能
            const segmentsX = isMobile ? 32 : 64;
            const segmentsY = isMobile ? 32 : 64;
            this.planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight, segmentsX, segmentsY);
            
            // 使用增强版着色器材质
            this.planeMaterial = new THREE.ShaderMaterial({
                vertexShader: `
                    varying vec2 vUv;
                    uniform float uTime;
                    uniform vec2 uMouse;
                    uniform float uHoverState;
                    uniform float uRelaxation;
                    uniform float uDistance;
                    uniform float uStrength;
                    uniform float uWaveHeight;
                    uniform float uWaveSpeed;
                    
                    // 噪声函数
                    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

                    float snoise(vec2 v) {
                        const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                                            0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                                            -0.577350269189626,  // -1.0 + 2.0 * C.x
                                            0.024390243902439); // 1.0 / 41.0
                        vec2 i  = floor(v + dot(v, C.yy));
                        vec2 x0 = v -   i + dot(i, C.xx);
                        vec2 i1;
                        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                        vec4 x12 = x0.xyxy + C.xxzz;
                        x12.xy -= i1;
                        i = mod289(i);
                        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                                        + i.x + vec3(0.0, i1.x, 1.0 ));
                        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                        m = m*m ;
                        m = m*m ;
                        vec3 x = 2.0 * fract(p * C.www) - 1.0;
                        vec3 h = abs(x) - 0.5;
                        vec3 ox = floor(x + 0.5);
                        vec3 a0 = x - ox;
                        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
                        vec3 g;
                        g.x  = a0.x  * x0.x  + h.x  * x0.y;
                        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                        return 130.0 * dot(m, g);
                    }
                    
                    void main() {
                        vUv = uv;
                        
                        vec3 pos = position;
                        
                        // 鼠标影响
                        float dist = distance(pos.xy, uMouse * 2.0 - 1.0);
                        float proximityFactor = 1.0 - clamp(dist / uDistance, 0.0, 1.0);
                        float hoverEffect = proximityFactor * uHoverState * uStrength * 0.2;
                        
                        // 添加基于噪声的全局波动
                        float noiseValue = snoise(vec2(pos.x * 2.0 + uTime * uWaveSpeed, pos.y * 2.0 + uTime * uWaveSpeed)) * uWaveHeight;
                        
                        // 组合所有效果
                        pos.z += hoverEffect + noiseValue * (1.0 + hoverEffect * 2.0);
                        
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                    }
                `,
                fragmentShader: `
                    varying vec2 vUv;
                    uniform sampler2D uTexture;
                    uniform float uHoverState;
                    uniform vec2 uMouse;
                    uniform float uStrength;
                    uniform float uGridMap;
                    uniform float uRgbIntensity;
                    uniform float uTime;
                    uniform float uWaveSpeed;
                    uniform float uTextureAspect;
                    uniform float uContainerAspect;
                    
                    // 噪声函数
                    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

                    float snoise(vec2 v) {
                        const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                                            0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                                            -0.577350269189626,  // -1.0 + 2.0 * C.x
                                            0.024390243902439); // 1.0 / 41.0
                        vec2 i  = floor(v + dot(v, C.yy));
                        vec2 x0 = v -   i + dot(i, C.xx);
                        vec2 i1;
                        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                        vec4 x12 = x0.xyxy + C.xxzz;
                        x12.xy -= i1;
                        i = mod289(i);
                        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                                        + i.x + vec3(0.0, i1.x, 1.0 ));
                        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                        m = m*m ;
                        m = m*m ;
                        vec3 x = 2.0 * fract(p * C.www) - 1.0;
                        vec3 h = abs(x) - 0.5;
                        vec3 ox = floor(x + 0.5);
                        vec3 a0 = x - ox;
                        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
                        vec3 g;
                        g.x  = a0.x  * x0.x  + h.x  * x0.y;
                        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                        return 130.0 * dot(m, g);
                    }
                    
                    // 实现完全展示效果，保持图片比例并完整显示（不裁剪）
                    vec2 containUV(vec2 uv, float textureAspect, float containerAspect) {
                        vec2 scale = vec2(1.0, 1.0);
                        
                        if (textureAspect > containerAspect) {
                            // 图片更宽，以宽度为基准，垂直居中
                            scale.y = containerAspect / textureAspect;
                            return vec2(uv.x, (uv.y - 0.5) * (1.0 / scale.y) + 0.5);
                        } else {
                            // 图片更高，以高度为基准，水平居中
                            scale.x = textureAspect / containerAspect;
                            return vec2((uv.x - 0.5) * (1.0 / scale.x) + 0.5, uv.y);
                        }
                    }
                    
                    void main() {
                        float dist = distance(vUv, uMouse);
                        float proximityFactor = 1.0 - clamp(dist / 0.4, 0.0, 1.0);
                        proximityFactor = pow(proximityFactor, 1.8);
                        
                        // 添加动态扭曲
                        float noiseValue = snoise(vec2(vUv.x * 5.0 + uTime * uWaveSpeed, vUv.y * 5.0 + uTime * uWaveSpeed * 0.7));
                        float timeEffect = (sin(uTime) + 1.0) * 0.5;
                        
                        // 在着色器中直接使用纵横比1，使用contain模式
                        float containerAspect = 1.0;
                        float textureAspect = 1.0;
                        
                        // 获取不失真的UV坐标
                        vec2 adjustedUV = vUv;
                        
                        // 确保UV在0-1范围内
                        bool outOfBounds = adjustedUV.x < 0.0 || adjustedUV.x > 1.0 || adjustedUV.y < 0.0 || adjustedUV.y > 1.0;
                        
                        // 使用原始UV获取纹理颜色
                        vec4 originalColor = outOfBounds ? vec4(0.0, 0.0, 0.0, 0.0) : texture2D(uTexture, adjustedUV);
                        
                        // 控制RGB偏移的强度
                        float rgbShift = (proximityFactor * pow(uHoverState, 0.7) + noiseValue * 0.2) * uRgbIntensity * 0.5;
                        
                        // RGB偏移效果
                        vec2 uvR = adjustedUV + vec2(rgbShift * 0.5, 0.0);
                        vec2 uvG = adjustedUV + vec2(0.0, rgbShift * 0.25);
                        vec2 uvB = adjustedUV - vec2(rgbShift * 0.5, 0.0);
                        
                        // 确保UV坐标在有效范围内
                        bool rOutOfBounds = uvR.x < 0.0 || uvR.x > 1.0 || uvR.y < 0.0 || uvR.y > 1.0;
                        bool gOutOfBounds = uvG.x < 0.0 || uvG.x > 1.0 || uvG.y < 0.0 || uvG.y > 1.0;
                        bool bOutOfBounds = uvB.x < 0.0 || uvB.x > 1.0 || uvB.y < 0.0 || uvB.y > 1.0;
                        
                        vec4 texR = rOutOfBounds ? originalColor : texture2D(uTexture, uvR);
                        vec4 texG = gOutOfBounds ? originalColor : texture2D(uTexture, uvG);
                        vec4 texB = bOutOfBounds ? originalColor : texture2D(uTexture, uvB);
                        
                        // 使用RGB通道组合颜色
                        vec4 color = vec4(texR.r, texG.g, texB.b, originalColor.a);
                        
                        // 混合原始颜色以确保边缘不会变形
                        float edgeFactor = smoothstep(0.0, 0.1, min(vUv.x, min(vUv.y, min(1.0-vUv.x, 1.0-vUv.y))));
                        color = mix(originalColor, color, edgeFactor);
                        
                        // 显示网格线
                        if (uGridMap > 0.5) {
                            float gridSize = 64.0;
                            vec2 grid = fract(vUv * gridSize);
                            
                            // 动态网格
                            grid.x += noiseValue * 0.1 * uHoverState;
                            grid.y += noiseValue * 0.1 * uHoverState;
                            
                            float line = max(step(0.97, grid.x), step(0.97, grid.y));
                            color = mix(color, vec4(1.0, 1.0, 1.0, 0.4), line);
                        }
                        
                        gl_FragColor = color;
                    }
                `,
                uniforms: {
                    uTime: { value: 0 },
                    uTexture: { value: null },
                    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
                    uHoverState: { value: 0.3 },
                    uRelaxation: { value: 0.965 },
                    uDistance: { value: 0.8 },
                    uStrength: { value: 1.2 },
                    uGridMap: { value: 0 },
                    uRgbIntensity: { value: 0 },
                    uWaveHeight: { value: 0.01 },
                    uWaveSpeed: { value: 0.3 },
                    uTextureAspect: { value: 1.778 }, // 默认16:9的图片比例
                    uContainerAspect: { value: containerAspect } // 使用实际容器宽高比
                },
                transparent: true
            });
            
            // 加载图像
            this.textureLoader.load(this.imageUrl, (texture) => {
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                
                // 设置实际纹理宽高比
                if (texture.image && texture.image.width && texture.image.height) {
                    const actualAspect = texture.image.width / texture.image.height;
                    
                    // 图片是16:9的，使用固定值1.778
                    this.planeMaterial.uniforms.uTextureAspect.value = 1.778;
                }
                
                this.planeMaterial.uniforms.uTexture.value = texture;
            }, 
            // 加载进度回调
            (xhr) => {
                // Loading progress callback
            },
            // 加载错误回调
            (error) => {
                const originalImg = this.container.querySelector('img');
                if (originalImg) {
                    originalImg.style.opacity = '1';
                }
            });
            
            // 创建网格
            this.plane = new THREE.Mesh(this.planeGeometry, this.planeMaterial);
            this.scene.add(this.plane);
        }
        
        setupEventListeners() {
            // 鼠标移动监听
            this.container.addEventListener('mousemove', this.onMouseMove.bind(this));
            
            // 添加窗口大小变化监听
            window.addEventListener('resize', this.onResize.bind(this));
            
            // 添加滚动监听
            window.addEventListener('scroll', this.onScroll.bind(this));
        }
        
        onMouseMove(event) {
            const x = (event.clientX / this.width) * 2 - 1;
            const y = -(event.clientY / this.height) * 2 + 1;
            
            this.mouse.prevX = this.mouse.x;
            this.mouse.prevY = this.mouse.y;
            
            this.mouse.x = x * 0.5;
            this.mouse.y = y * 0.5;
            
            this.mouse.vX = this.mouse.x - this.mouse.prevX;
            this.mouse.vY = this.mouse.y - this.mouse.prevY;
            
            // 更新鼠标位置，使用更慢的速度让效果更平滑
            gsap.to(this.planeMaterial.uniforms.uMouse.value, {
                x: (event.clientX / this.width),
                y: 1 - (event.clientY / this.height),
                duration: 0.4,
                ease: 'power2.out'
            });
            
            // 计算移动强度
            const moveStrength = Math.sqrt(this.mouse.vX * this.mouse.vX + this.mouse.vY * this.mouse.vY);
            
            // 悬停效果 - 不需要移动也有基础效果
            gsap.to(this.planeMaterial.uniforms.uHoverState, {
                value: Math.max(0.4, moveStrength * 8) * this.params.strength,
                duration: 0.4,
                ease: 'power2.out'
            });
            
            // 鼠标移动时激活RGB效果
            if (moveStrength > 0.001) {
                gsap.to(this.planeMaterial.uniforms.uRgbIntensity, {
                    value: Math.min(0.02, moveStrength * 5),
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                // 标记用户正在交互
                this._isUserInteracting = true;
                clearTimeout(this._interactionTimeout);
                this._interactionTimeout = setTimeout(() => {
                    this._isUserInteracting = false;
                    
                    // 如果没有手动设置RGB效果，延迟后淡出
                    if (!this._manualRgbSetting) {
                        gsap.to(this.planeMaterial.uniforms.uRgbIntensity, {
                            value: 0,
                            duration: 1.2,
                            ease: 'power2.out'
                        });
                    }
                }, 2000);
            }
        }
        
        onScroll() {
            // 检测是否为移动设备
            const isMobile = window.innerWidth <= 768;
            
            // 更新滚动状态
            this.startScrolling();
            
            // 滚动时激活变形效果，增加互动性
            const scrollSpeed = Math.abs(window.scrollY - (this._lastScrollY || 0)) / (isMobile ? 10 : 20);
            this._lastScrollY = window.scrollY;
            
            if (scrollSpeed > 0.05) {
                // 移动端使用更温和的效果强度
                const effectStrength = isMobile ? Math.min(scrollSpeed * 0.5, 0.6) : Math.min(scrollSpeed * 0.5, 0.8);
                
                gsap.to(this.planeMaterial.uniforms.uHoverState, {
                    value: effectStrength,
                    duration: isMobile ? 0.5 : 0.5,
                    ease: 'power2.out'
                });
                
                // 移动端仅在滚动时激活RGB效果，强度更小
                if (isMobile) {
                    gsap.to(this.planeMaterial.uniforms.uRgbIntensity, {
                        value: Math.min(0.01, scrollSpeed * 0.15),
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
                
                // 计时器，一段时间后恢复默认状态
                clearTimeout(this._scrollTimeout);
                this._scrollTimeout = setTimeout(() => {
                    gsap.to(this.planeMaterial.uniforms.uHoverState, {
                        value: isMobile ? 0.1 : 0.2,
                        duration: 1.0,
                        ease: 'power2.out'
                    });
                    
                    // 移动端RGB效果淡出
                    if (isMobile) {
                        gsap.to(this.planeMaterial.uniforms.uRgbIntensity, {
                            value: 0,
                            duration: 0.5,
                            ease: 'power2.out'
                        });
                    }
                }, isMobile ? 400 : 800);
            }
        }
        
        onResize() {
            // 获取新的窗口尺寸
            const width = this.container.clientWidth || window.innerWidth;
            const height = this.container.clientHeight || window.innerHeight;
            
            // 检查窗口宽度是否小于1200px
            if (width < 1200) {
                // 如果宽度<1200px，隐藏canvas容器
                this.container.classList.remove('show');
                
                // 确保背景图片可见
                const heroBackground = document.querySelector('.hero-background');
                if (heroBackground) {
                    heroBackground.style.display = 'block';
                    heroBackground.classList.add('show');
                    
                    // 调整文字颜色
                    const title = document.querySelector('.vertu-title');
                    const subtitle = document.querySelector('.hero .subtitle');
                    if (title) title.style.color = '#fff';
                    if (subtitle) subtitle.style.color = '#fff';
                }
                
                return; // 不继续更新渲染
            } else {
                // 如果宽度>=1200px，确保容器可见
                this.container.classList.add('show');
                
                // 调整文字颜色
                const title = document.querySelector('.vertu-title');
                const subtitle = document.querySelector('.hero .subtitle');
                if (title) title.style.color = '#000';
                if (subtitle) subtitle.style.color = '#000';
            }
            
            // 更新宽高
            this.width = width;
            this.height = height;
            
            // 检测是否为移动设备
            const isMobile = window.innerWidth <= 768;
            
            // 更新容器宽高比
            const containerAspect = this.width / this.height;
            
            // 更新uniform
            if(this.planeMaterial && this.planeMaterial.uniforms) {
                if (isMobile) {
                    // 移动端使用固定比例以匹配实际图片
                    // 使用与createPlane一致的比例
                    const mobileAspect = 2.0/5.0; // 宽高比为0.4，与createPlane保持一致
                    this.planeMaterial.uniforms.uContainerAspect.value = mobileAspect;
                } else {
                    this.planeMaterial.uniforms.uContainerAspect.value = containerAspect;
                }
            }
            
            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();
            
            this.scene.remove(this.plane);
            this.createPlane();
            
            this.renderer.setSize(this.width, this.height);
            this.renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
        }
        
        addAutoWave() {
            // 检测是否为移动设备
            const isMobile = window.innerWidth <= 768;
            
            // 移动端减弱自动波动效果
            const waveStrength = isMobile ? 0.1 : 0.2;
            const waveDuration = isMobile ? 5 : 4;
            
            // 添加自动波动效果，但不添加RGB偏移
            const autoWave = () => {
                const time = Date.now() * 0.001;
                
                // 移动端减小圆形移动半径
                const radius = isMobile ? 0.1 : 0.15;
                const x = Math.cos(time * 0.2) * radius + 0.5;
                const y = Math.sin(time * 0.25) * radius + 0.5;
                
                // 移动端只在不滚动时应用自动波动，降低CPU使用
                const shouldAnimate = !isMobile || (!this._isUserInteracting && !this._isScrolling);
                
                if (shouldAnimate) {
                    gsap.to(this.planeMaterial.uniforms.uMouse.value, {
                        x: x,
                        y: y,
                        duration: waveDuration,
                        ease: 'sine.inOut'
                    });
                    
                    gsap.to(this.planeMaterial.uniforms.uHoverState, {
                        value: waveStrength + Math.sin(time * 0.4) * 0.1 * this.params.strength,
                        duration: waveDuration,
                        ease: 'sine.inOut'
                    });
                }
                
                requestAnimationFrame(autoWave);
            };
            
            autoWave();
        }
        
        animate() {
            this.planeMaterial.uniforms.uTime.value += 0.01;
            
            this.renderer.render(this.scene, this.camera);
            requestAnimationFrame(this.animate.bind(this));
        }

        // 提供滚动状态追踪
        startScrolling() {
            this._isScrolling = true;
            clearTimeout(this._scrollingTimeout);
            this._scrollingTimeout = setTimeout(() => {
                this._isScrolling = false;
            }, 200);
        }
    }
}); 