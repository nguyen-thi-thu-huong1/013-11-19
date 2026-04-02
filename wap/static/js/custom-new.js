/**
 * custom-new.js
 * 创建时间：2024年
 * 描述：新的自定义JavaScript文件
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    console.log('页面初始化完成');
    // 开始检查分类内容
    waitForContent();
});

// 等待分类内容加载完成
function waitForContent() {
    console.log('等待分类内容加载...');
    const checkContent = () => {
        const containers = document.querySelectorAll('.rigts');
        if (containers.length > 0) {
            console.log('分类内容已加载，找到容器数量:', containers.length);
            // 内容已加载，添加热度标签
            addHotTagToRigtsImages();
            // 设置分类切换监听
            setupCategoryListeners();
        } else {
            console.log('分类内容未加载，继续等待...');
            // 继续等待
            setTimeout(checkContent, 100);
        }
    };
    checkContent();
}

// 设置分类切换监听
function setupCategoryListeners() {
    // 监听分类切换
    document.body.addEventListener('click', function(e) {
        const target = e.target;
        if (target.classList.contains('ls') || target.closest('.ls')) {
            console.log('分类被点击');
            // 等待分类切换动画完成
            setTimeout(() => {
                console.log('分类切换完成，更新热度标签');
                addHotTagToRigtsImages();
            }, 300);
        }
    });

    // 监听滚动和调整大小
    window.addEventListener('scroll', throttle(updateTagPositions, 100));
    window.addEventListener('resize', throttle(updateTagPositions, 100));
}

function addHotTagToRigtsImages() {
    console.log('开始添加热度标签');
    const containers = document.querySelectorAll('.rigts');
    console.log('找到容器数量:', containers.length);
    
    containers.forEach(function(container, containerIndex) {
        console.log(`处理第 ${containerIndex + 1} 个容器`);
        
        // 移除旧的标签
        const oldTags = container.querySelectorAll('.hot-tag');
        console.log(`移除 ${oldTags.length} 个旧标签`);
        oldTags.forEach(tag => tag.remove());

        // 添加新标签
        const imgs = container.querySelectorAll('img');
        console.log(`找到 ${imgs.length} 个图片元素`);
        
        imgs.forEach(function(img, imgIndex) {
            console.log(`处理第 ${imgIndex + 1} 个图片`);
            console.log('图片尺寸:', img.offsetWidth, 'x', img.offsetHeight);
            console.log('图片位置:', img.getBoundingClientRect());
            
            const rand = Math.floor(Math.random() * (1555 - 155 + 1)) + 155;
            const tag = document.createElement('div');
            tag.className = 'hot-tag';
            tag.innerHTML = `<span class="hot-num">${rand}</span><span class="hot-text">热度</span>`;
            
            // 设置标签样式
            const imgRect = img.getBoundingClientRect();
            const parentRect = container.getBoundingClientRect();
            const left = imgRect.left - parentRect.left + 30;
            const top = imgRect.top - parentRect.top + img.offsetHeight * 0.6;
            
            console.log('标签位置:', { left, top });
            
            Object.assign(tag.style, {
                position: 'absolute',
                left: left + 'px',
                top: top + 'px',
                transform: 'translateY(-50%)',
                background: 'none',
                color: '#303442',
                fontFamily: "'AkrobatBold', 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif",
                fontWeight: 'bold',
                padding: '0',
                borderRadius: '0',
                zIndex: '2',
                pointerEvents: 'none',
                boxShadow: 'none',
                display: 'flex',
                alignItems: 'flex-end',
                gap: '2px'
            });
            
            container.appendChild(tag);
            console.log('标签已添加到容器');
        });
    });
}

function updateTagPositions() {
    const containers = document.querySelectorAll('.rigts');
    containers.forEach(function(container) {
        const imgs = container.querySelectorAll('img');
        const tags = container.querySelectorAll('.hot-tag');
        
        imgs.forEach(function(img, index) {
            if (tags[index]) {
                const imgRect = img.getBoundingClientRect();
                const parentRect = container.getBoundingClientRect();
                const left = imgRect.left - parentRect.left + 30;
                const top = imgRect.top - parentRect.top + img.offsetHeight * 0.6;
                
                tags[index].style.left = left + 'px';
                tags[index].style.top = top + 'px';
            }
        });
    });
}

/**
 * 工具函数：节流
 * @param {Function} func 要执行的函数
 * @param {number} limit 时间限制（毫秒）
 * @returns {Function} 节流后的函数
 */
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 导出工具函数
window.utils = {
    throttle
}; 