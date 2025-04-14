/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2025 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2025 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
//

window.addEventListener('DOMContentLoaded', event => {

    // ✅ 导航栏收缩功能
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) return;
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    navbarShrink();
    document.addEventListener('scroll', navbarShrink);

    // ✅ 激活 ScrollSpy
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // ✅ 点击菜单项自动收起移动端菜单
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // ✅ 视频播放逻辑 + 控制轮播行为
    const video = document.getElementById('heroVideo');
    const carousel = document.getElementById('videoCarousel');

    if (video && carousel) {
        // 初始静音并尝试播放（适配大部分浏览器自动播放策略）
        video.muted = true;
        video.play().catch(error => {
            console.warn('视频自动播放失败：', error);
        });

        // 用户点击：切换静音状态 + 播放/暂停
        video.addEventListener('click', () => {
            // 第一次点击：开启声音
            if (video.muted) {
                video.muted = false;
            }

            // 切换播放状态
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });

        // 播放中：暂停轮播切换
        video.addEventListener('play', () => {
            bootstrap.Carousel.getInstance(carousel)?.pause();
        });

        // 暂停后：恢复轮播自动切换
        video.addEventListener('pause', () => {
            bootstrap.Carousel.getInstance(carousel)?.cycle();
        });

        // 播放结束时也恢复轮播（虽然设置了 loop，这是一种防止意外情况的补充）
        video.addEventListener('ended', () => {
            bootstrap.Carousel.getInstance(carousel)?.cycle();
        });
    }

});
