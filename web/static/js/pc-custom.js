// 电脑端自定义脚本
(function() {
    'use strict';

    // 检测设备类型
    const isPC = () => {
        return window.innerWidth >= 1200;
    };

    // 初始化电脑端功能
    const initPCFeatures = () => {
        if (!isPC()) return;

        // 添加电脑端特定类名
        document.body.classList.add('pc-device');
        
        // 初始化导航菜单
        initNavigation();
        
        // 初始化页面布局
        initLayout();
        
        // 初始化事件监听
        initEventListeners();
    };

    // 初始化导航菜单
    const initNavigation = () => {
        // 导航菜单逻辑
        const nav = document.querySelector('.navbar');
        if (nav) {
            // 添加电脑端导航样式
            nav.classList.add('pc-nav');
        }
    };

    // 初始化页面布局
    const initLayout = () => {
        // 调整页面布局
        const container = document.querySelector('.container');
        if (container) {
            container.classList.add('pc-container');
        }
    };

    // 初始化事件监听
    const initEventListeners = () => {
        // 窗口大小改变事件
        window.addEventListener('resize', () => {
            if (isPC()) {
                document.body.classList.add('pc-device');
            } else {
                document.body.classList.remove('pc-device');
            }
        });
    };

    // 页面加载完成后初始化
    document.addEventListener('DOMContentLoaded', initPCFeatures);
})(); 