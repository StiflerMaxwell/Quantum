# Vertu Quantum 登录页

这是一个展示 Vertu Quantum 奢华手机的响应式网页。该页面基于设计原型精确还原，不包含header和footer部分，以便于集成到WordPress和Elementor中。

## 文件结构

- `index.html` - 主要HTML文件
- `styles.css` - 样式表
- `scripts.js` - JavaScript交互脚本
- `images/` - 存放所有图片的文件夹

## 图片替换

您需要自行添加以下图片到`images/`文件夹中：

1. `phone-hero.png` - 第一部分的手机图片
2. `phone-display.png` - 第二部分的手机展示图
3. `icon-screen.png` - 屏幕图标
4. `icon-battery.png` - 电池图标
5. `icon-camera.png` - 摄像头图标
6. `icon-design.png` - 设计图标
7. `snapdragon.png` - 骁龙处理器图片
8. `phone-detail.png` - 手机细节展示图
9. `phone-security.png` - 安全功能展示图

您可以根据需要替换这些图片，确保使用相同的文件名或更新HTML文件中的引用。

## WordPress集成

要将此页面集成到WordPress中：

1. 创建一个新页面模板或使用Elementor的空白模板
2. 将HTML内容复制到模板中
3. 将CSS添加到主题的样式表或通过自定义CSS功能
4. 将JavaScript添加到主题的脚本或通过自定义脚本功能
5. 上传所有图片到WordPress媒体库，并更新路径

## 自定义

- **颜色方案**: 修改CSS文件中的颜色值
- **字体**: 当前使用Google Fonts的Roboto字体，您可以在HTML的`<head>`部分和CSS中修改
- **交互效果**: 在`scripts.js`中修改动画和交互行为

## 响应式设计

该页面已完全响应式设计，适配桌面、平板和移动设备。响应式断点设置在：

- 桌面: >1200px
- 平板: 768px - 1200px
- 移动: <768px

## 浏览器兼容性

此页面兼容所有现代浏览器，包括：

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 注意事项

1. 页面不含header和footer，方便集成到现有网站中
2. 所有文本和图片都可以根据需要更改
3. 视差滚动效果可能在某些老旧浏览器中不支持 