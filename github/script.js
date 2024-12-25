document.addEventListener('DOMContentLoaded', function() {
    // 处理"了解更多"按钮点击
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.onclick = function(e) {
            e.preventDefault();
            document.querySelector('#about').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        };
    }

    // 处理导航链接点击
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.onclick = function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        };
    });

    // AI助手模态框
    const aiModal = document.getElementById('aiModal');
    const aiStartBtn = document.querySelector('.ai-start-btn');
    const closeModal = document.querySelector('.close-modal');

    // 打开模态框
    if (aiStartBtn) {
        aiStartBtn.onclick = function() {
            aiModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        };
    }

    // 关闭模态框
    if (closeModal) {
        closeModal.onclick = function() {
            aiModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };
    }

    // 点击模态框外部关闭
    window.onclick = function(event) {
        if (event.target == aiModal) {
            aiModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    // 处理消息发送
    const sendBtn = document.querySelector('.send-btn');
    const chatInput = document.querySelector('.chat-input textarea');
    const chatMessages = document.querySelector('.chat-messages');

    if (sendBtn && chatInput) {
        sendBtn.onclick = function() {
            const message = chatInput.value.trim();
            if (message) {
                addMessage('user', message);
                chatInput.value = '';
                // 模拟AI回复
                setTimeout(() => {
                    addMessage('ai', '你好！我是AI小鸭助手，很高兴为您服务！');
                }, 1000);
            }
        };

        chatInput.onkeypress = function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendBtn.click();
            }
        };
    }

    function addMessage(type, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.innerHTML = `<div class="message-content">${content}</div>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // 淡入动画
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in-section').forEach(el => {
        observer.observe(el);
    });

    // 导航栏滚动效果
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // 向下滚动
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动
            navbar.style.transform = 'translateY(0)';
        }
        
        if (scrollTop === 0) {
            // 回到顶部
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            // 滚动时
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
        
        lastScrollTop = scrollTop;
    });

    // 作品集图片加载动画
    document.querySelectorAll('.portfolio-image img').forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });

    // 表单提交处理
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.onsubmit = function(e) {
            e.preventDefault();
            // 这里可以添加表单提交逻辑
            alert('消息已发送！我会尽快回复您。');
            this.reset();
        };
    }
});