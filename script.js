document.addEventListener('DOMContentLoaded', function() {
    // 获取页面元素
    const categoryBtns = document.querySelectorAll('.category-btn');
    const toolCards = document.querySelectorAll('.tool-card');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    // 分类筛选功能
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有按钮的active样式
            categoryBtns.forEach(b => b.classList.remove('active'));
            // 给当前按钮加active
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            // 筛选卡片
            toolCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 搜索功能
    function searchTools() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        // 搜索为空，显示所有卡片
        if (searchTerm === '') {
            toolCards.forEach(card => card.style.display = 'block');
            categoryBtns.forEach(b => b.classList.remove('active'));
            categoryBtns[0].classList.add('active');
            return;
        }

        // 按关键词筛选
        toolCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const desc = card.querySelector('p').textContent.toLowerCase();
            if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // 搜索按钮点击+回车触发
    searchBtn.addEventListener('click', searchTools);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') searchTools();
    });
});
