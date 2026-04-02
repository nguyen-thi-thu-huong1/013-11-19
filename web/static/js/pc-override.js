// 电脑端脚本覆盖

// 覆盖原有移动端检测
const originalIsMobile = window.isMobile;
window.isMobile = function() {
    return window.innerWidth < 1200;
};

// 覆盖原有响应式处理
const overrideResponsive = () => {
    // 覆盖原有响应式类
    document.body.classList.remove('mobile-device');
    document.body.classList.add('pc-device');

    // 覆盖原有事件处理
    const originalEvents = window._pcEvents || {};
    window._pcEvents = {
        ...originalEvents,
        // 添加电脑端特定事件处理
        handleResize: function() {
            if (window.innerWidth >= 1200) {
                document.body.classList.add('pc-device');
                document.body.classList.remove('mobile-device');
            }
        }
    };
};

// 覆盖原有导航处理
const overrideNavigation = () => {
    const nav = document.querySelector('.navbar');
    if (nav) {
        // 移除移动端导航类
        nav.classList.remove('mobile-nav');
        // 添加电脑端导航类
        nav.classList.add('pc-nav');
    }
};

// 覆盖原有布局处理
const overrideLayout = () => {
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        container.classList.remove('mobile-container');
        container.classList.add('pc-container');
    });
};

// 初始化覆盖
document.addEventListener('DOMContentLoaded', () => {
    overrideResponsive();
    overrideNavigation();
    overrideLayout();

    // 监听窗口大小变化
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1200) {
            overrideResponsive();
            overrideNavigation();
            overrideLayout();
        }
    });
}); 