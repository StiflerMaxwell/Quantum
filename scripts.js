document.addEventListener('DOMContentLoaded', function() {
    // 首屏元素淡入效果
    setTimeout(function() {
        const heroTitle = document.querySelector('.vertu-title');
        if (heroTitle) {
            heroTitle.classList.add('fade-in');
        }
    }, 500);

    setTimeout(function() {
        const heroSubtitle = document.querySelector('.hero .subtitle');
        if (heroSubtitle) {
            heroSubtitle.classList.add('fade-in');
        }
    }, 1000);

    setTimeout(function() {
        const preOrderBtn = document.querySelector('.pre-order-btn');
        if (preOrderBtn) {
            preOrderBtn.classList.add('fade-in');
        }
    }, 1500);

    // 添加滚动动画
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-item, .processor-item, .engineering-features li, .stat, .power-feature, .beauty-feature');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.85) {
                element.style.animation = 'fadeIn 1s ease-out forwards';
            }
        });
    };

    // 添加第二屏特性部分的淡入动画
    const animateBeautyFeatures = function() {
        const beautyFeatures = document.querySelectorAll('.beauty-feature');
        beautyFeatures.forEach((feature, index) => {
            setTimeout(() => {
                feature.classList.add('fade-in');
            }, 300 * (index + 1));
        });
    };

    // 监听第二屏滚动
    window.addEventListener('scroll', function() {
        const beautySection = document.querySelector('.power-beauty');
        if (beautySection) {
            const beautyPosition = beautySection.getBoundingClientRect().top;
            if (beautyPosition < window.innerHeight * 0.2 && beautyPosition > -beautySection.offsetHeight * 0.8) {
                animateBeautyFeatures();
            }
        }
    });

    // 初始化时执行一次
    animateOnScroll();
    
    // 监听滚动事件
    window.addEventListener('scroll', animateOnScroll);

    // Pre-Order 按钮点击事件
    const preOrderBtn = document.querySelector('.pre-order-btn');
    if (preOrderBtn) {
        preOrderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('感谢您的预订！我们将很快与您联系。');
        });
    }

    // Pre-Order 链接点击事件
    const preOrderLink = document.querySelector('.pre-order-link');
    if (preOrderLink) {
        preOrderLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('感谢您的预订！我们将很快与您联系。');
        });
    }

    // 平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
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
            // 所有图片加载完成
            document.body.classList.add('images-loaded');
        }
    }

    images.forEach(img => {
        if (img.complete) {
            handleImageLoad();
        } else {
            img.addEventListener('load', handleImageLoad);
            img.addEventListener('error', handleImageLoad); // 处理加载失败的情况
        }
    });

    // 添加视差滚动效果
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Hero区域的视差效果
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const heroImg = heroSection.querySelector('.phone-hero-img');
            if (heroImg) {
                heroImg.style.transform = `translateY(${scrollPosition * 0.2}px)`;
            }
        }

        // Power of Beauty区域的视差效果
        const powerBeautySection = document.querySelector('.power-beauty');
        if (powerBeautySection) {
            const phoneDisplayImg = powerBeautySection.querySelector('.phone-display-img');
            if (phoneDisplayImg) {
                const sectionTop = powerBeautySection.offsetTop;
                const sectionScroll = scrollPosition - sectionTop;
                if (sectionScroll > -window.innerHeight && sectionScroll < powerBeautySection.offsetHeight) {
                    phoneDisplayImg.style.transform = `translateY(${sectionScroll * 0.1}px)`;
                }
            }
        }

        // Quantum Encryption区域的视差效果
        const encryptionSection = document.querySelector('.encryption');
        if (encryptionSection) {
            const processorImg = encryptionSection.querySelector('.processor-img');
            if (processorImg) {
                const sectionTop = encryptionSection.offsetTop;
                const sectionScroll = scrollPosition - sectionTop;
                if (sectionScroll > -window.innerHeight && sectionScroll < encryptionSection.offsetHeight) {
                    processorImg.style.transform = `translateY(${sectionScroll * 0.05}px)`;
                }
            }
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
            
            // 创建相机
            this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 100);
            this.camera.position.set(0, 0, 1);
            
            // 创建渲染器
            this.renderer = new THREE.WebGLRenderer({ 
                antialias: true,
                alpha: true 
            });
            this.renderer.setSize(this.width, this.height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            
            // 添加到DOM
            this.container.appendChild(this.renderer.domElement);
            this.renderer.domElement.style.position = 'absolute';
            this.renderer.domElement.style.top = '0';
            this.renderer.domElement.style.left = '0';
            this.renderer.domElement.style.zIndex = '2';
            this.renderer.domElement.style.pointerEvents = 'none';
            this.renderer.domElement.style.width = '100%';
            this.renderer.domElement.style.height = '100%';
            this.renderer.domElement.style.objectFit = 'contain'; // 使用contain模式显示
            
            // 加载纹理
            this.textureLoader = new THREE.TextureLoader();
            
            // 设置容器宽高比
            const containerAspect = this.width / this.height;
            console.log("容器宽高比:", containerAspect);
            
            this.createPlane();
            this.animate();
        }
        
        createPlane() {
            // 使用与容器比例匹配的平面尺寸
            const containerAspect = this.width / this.height;
            
            // 平面尺寸以短边为2.0，长边按比例计算
            let planeWidth, planeHeight;
            
            if (containerAspect >= 1) {
                // 宽屏，以高度为基准
                planeHeight = 2.0;
                planeWidth = planeHeight * containerAspect;
            } else {
                // 窄屏，以宽度为基准
                planeWidth = 2.0;
                planeHeight = planeWidth / containerAspect;
            }
            
            console.log("平面尺寸:", planeWidth, "x", planeHeight, "(容器比例:", containerAspect, ")");
            
            // 创建平面几何体 - 使用更多细分以获得更好的变形效果
            this.planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 64, 64);
            
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
                    console.log("纹理实际宽高比:", actualAspect);
                    
                    // 图片是16:9的，使用固定值1.778
                    this.planeMaterial.uniforms.uTextureAspect.value = 1.778;
                    
                    // 打印设置后的uniform值
                    console.log("设置纹理参数 - 图片宽高比:", this.planeMaterial.uniforms.uTextureAspect.value, "固定16:9比例");
                }
                
                this.planeMaterial.uniforms.uTexture.value = texture;
            }, 
            // 加载进度回调
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% 图片加载中');
            },
            // 加载错误回调
            (error) => {
                console.error('图片加载出错:', error);
                // 加载失败时显示原始图片
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
            window.addEventListener('mousemove', this.onMouseMove.bind(this));
            window.addEventListener('resize', this.onResize.bind(this));
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
            // 滚动时激活变形效果，增加互动性
            const scrollSpeed = Math.abs(window.scrollY - (this._lastScrollY || 0)) / 20;
            this._lastScrollY = window.scrollY;
            
            if (scrollSpeed > 0.05) {
                gsap.to(this.planeMaterial.uniforms.uHoverState, {
                    value: Math.min(scrollSpeed * 0.5, 0.8),
                    duration: 0.5,
                    ease: 'power2.out'
                });
                
                // 计时器，一段时间后恢复默认状态
                clearTimeout(this._scrollTimeout);
                this._scrollTimeout = setTimeout(() => {
                    gsap.to(this.planeMaterial.uniforms.uHoverState, {
                        value: 0.3,
                        duration: 1.5,
                        ease: 'power2.out'
                    });
                }, 800);
            }
        }
        
        onResize() {
            this.width = this.container.clientWidth || window.innerWidth;
            this.height = this.container.clientHeight || window.innerHeight;
            
            // 更新容器宽高比
            const containerAspect = this.width / this.height;
            console.log("窗口调整：容器宽高比更新为", containerAspect);
            
            // 更新uniform
            if(this.planeMaterial && this.planeMaterial.uniforms) {
                this.planeMaterial.uniforms.uContainerAspect.value = containerAspect;
            }
            
            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();
            
            this.scene.remove(this.plane);
            this.createPlane();
            
            this.renderer.setSize(this.width, this.height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }
        
        addAutoWave() {
            // 添加自动波动效果，但不添加RGB偏移
            const autoWave = () => {
                const time = Date.now() * 0.001;
                
                // 圆形移动
                const radius = 0.15;
                const x = Math.cos(time * 0.2) * radius + 0.5;
                const y = Math.sin(time * 0.25) * radius + 0.5;
                
                // 只有当用户不在交互时才应用自动波动
                if (!this._isUserInteracting) {
                    gsap.to(this.planeMaterial.uniforms.uMouse.value, {
                        x: x,
                        y: y,
                        duration: 4,
                        ease: 'sine.inOut'
                    });
                    
                    gsap.to(this.planeMaterial.uniforms.uHoverState, {
                        value: 0.2 + Math.sin(time * 0.4) * 0.15 * this.params.strength,
                        duration: 4,
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
    }

    // 为第一屏添加网格变形效果
    const heroSection = document.querySelector('.hero');
    const heroBgImage = document.querySelector('.hero-bg-img');
    if (heroSection && heroBgImage) {
        // 获取背景图像的URL
        const imageUrl = heroBgImage.src;
        console.log("加载网格效果，图片URL:", imageUrl);
        
        // 创建效果
        setTimeout(() => {
            try {
                console.log("正在创建第一屏网格效果...");
                
                // 设置原图样式，确保图片居中
                heroBgImage.style.position = 'absolute';
                heroBgImage.style.top = '50%';
                heroBgImage.style.left = '50%';
                heroBgImage.style.transform = 'translate(-50%, -50%)';
                heroBgImage.style.maxWidth = '100%';
                heroBgImage.style.maxHeight = '100%';
                heroBgImage.style.width = 'auto';
                heroBgImage.style.height = 'auto';
                heroBgImage.style.objectFit = 'contain';
                
                // 提前准备Three.js效果的配置
                const canvasContainer = document.createElement('div');
                canvasContainer.className = 'canvas-container';
                canvasContainer.style.position = 'absolute';
                canvasContainer.style.top = '0';
                canvasContainer.style.left = '0';
                canvasContainer.style.width = '100%';
                canvasContainer.style.height = '100%';
                canvasContainer.style.display = 'flex';
                canvasContainer.style.justifyContent = 'center';
                canvasContainer.style.alignItems = 'center';
                canvasContainer.style.zIndex = '2';
                
                heroSection.appendChild(canvasContainer);
                
                // 创建网格效果
                const heroGridEffect = new GridEffect(canvasContainer, imageUrl);
                
                // 确保Three.js Canvas在正确的层级
                const heroCanvas = canvasContainer.querySelector('canvas');
                if (heroCanvas) {
                    console.log("Canvas元素已创建，应用样式");
                    
                    // 设置Canvas样式，确保内容居中且不失真
                    heroCanvas.style.position = 'absolute';
                    heroCanvas.style.top = '50%';
                    heroCanvas.style.left = '50%';
                    heroCanvas.style.transform = 'translate(-50%, -50%)';
                    heroCanvas.style.maxWidth = '100%';
                    heroCanvas.style.maxHeight = '100%';
                    heroCanvas.style.width = 'auto';
                    heroCanvas.style.height = 'auto';
                    heroCanvas.style.objectFit = 'contain';
                    
                    // 将原始图片设为完全透明
                    heroBgImage.style.opacity = '0';
                } else {
                    console.log("找不到Canvas元素");
                    heroBgImage.style.opacity = '1'; // 恢复原始图片
                }
            } catch(error) {
                console.error("创建网格效果时出错:", error);
                // 如果网格效果失败，显示原始图片
                heroBgImage.style.opacity = '1';
            }
        }, 300); // 增加延迟时间确保DOM已完全加载
    } else {
        console.error("找不到hero部分或背景图片元素");
    }
}); 