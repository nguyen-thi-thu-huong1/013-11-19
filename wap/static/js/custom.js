// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function() {

   
    // 添加永久网址显示
    function addPermanentUrl() {
        const rbox = document.querySelector('.rbox');
        if (!rbox) {
            
            setTimeout(addPermanentUrl, 1000);
            return;
        }

        // 创建永久网址显示元素
        const urlDiv = document.createElement('div');
        urlDiv.className = 'permanent-url';
        urlDiv.innerHTML = `<span>永久网址：${window.location.host}🔍</span>`;
        
        // 将元素插入到rbox之前
        rbox.parentNode.insertBefore(urlDiv, rbox);
    }

    // 确保在页面完全加载后执行
    window.addEventListener('load', function() {
        setTimeout(addPermanentUrl, 1000);
    });

    // 动态添加样式
    function addStyle(styleString) {
        const style = document.createElement('style');
        style.textContent = styleString;
        document.head.append(style);
    }

    // 添加自定义样式
    addStyle(`
        /* 自定义样式 */
        #redPacket {
            transition: all 0.3s ease;
        }
        
        #redPacket:hover {
            transform: scale(1.1);
        }
        
        /* 添加阴影效果 */
        #redPacket {
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        /* 添加点击效果 */
        #redPacket:active {
            transform: scale(0.95);
        }
    `);

    // 动态修改红包位置
    const redPacket = document.getElementById('redPacket');
    if (redPacket) {
        // 监听窗口大小变化
        window.addEventListener('resize', function() {
            const windowWidth = window.innerWidth;
            if (windowWidth < 768) {
                redPacket.style.right = '10px';
                redPacket.style.bottom = '50px';
            } else {
                redPacket.style.right = '20px';
                redPacket.style.bottom = '80px';
            }
        });
    }

    // 轮播自动播放和特效
    function autoSwipe() {
        var swipe = document.querySelector('.van-swipe__track');
        var items = document.querySelectorAll('.van-swipe-item');
        if (!swipe || items.length === 0) return;
        
        let current = 0;
        const total = items.length;
        
        function updateDots() {
            const dots = document.querySelector('.swiper-dots');
            if (dots) {
                const num = dots.querySelector('.num:first-child');
                if (num) {
                    num.textContent = current + 1;
                }
            }
        }

        function nextSlide() {
            current = (current + 1) % total;
            const itemWidth = items[0].offsetWidth;
            
            // 添加过渡动画
            swipe.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            swipe.style.transform = `translateX(${-itemWidth * current}px)`;
            
            // 更新激活状态
            items.forEach((item, idx) => {
                if (idx === current) {
                    item.classList.add('swipe-active');
                } else {
                    item.classList.remove('swipe-active');
                }
            });
            
            updateDots();
        }

        // 初始化第一个slide
        items[0].classList.add('swipe-active');
        updateDots();

        // 自动播放
        setInterval(nextSlide, 3000);
    }

    // 延迟执行，确保DOM完全加载
    setTimeout(autoSwipe, 1000);
}); 