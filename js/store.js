
    /* ==========================================================================
       1. WOODMART HERO 3-SLIDE SLIDESHOW WITH AUTOPLAY & DOTS
       ========================================================================== */
    var currentHeroSlide = 0;
    var totalHeroSlides = 3;
    var heroAutoPlayTimer = null;
    var heroDurationMs = 5000;

    function updateHeroSlide() {
        var track = document.getElementById('heroTrack');
        if (!track) return;
        var offset = currentHeroSlide * 33.333333;
        track.style.transform = 'translateX(' + offset + '%)';

        // Update WoodMart Dots
        for (var d = 0; d < totalHeroSlides; d++) {
            var dot = document.getElementById('pcDot' + d);
            if (dot) {
                if (d === currentHeroSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            }
        }
    }

    function nextHeroSlide() {
        if (currentHeroSlide < totalHeroSlides - 1) {
            currentHeroSlide = currentHeroSlide + 1;
        } else {
            currentHeroSlide = 0;
        }
        updateHeroSlide();
    }

    function prevHeroSlide() {
        if (currentHeroSlide > 0) {
            currentHeroSlide = currentHeroSlide - 1;
        } else {
            currentHeroSlide = totalHeroSlides - 1;
        }
        updateHeroSlide();
    }

    function goToHeroSlide(index) {
        currentHeroSlide = index;
        updateHeroSlide();
        startHeroAutoPlay();
    }

    function startHeroAutoPlay() {
        stopHeroAutoPlay();
        heroAutoPlayTimer = setInterval(function() {
            nextHeroSlide();
        }, heroDurationMs);
    }

    function stopHeroAutoPlay() {
        if (heroAutoPlayTimer) {
            clearInterval(heroAutoPlayTimer);
            heroAutoPlayTimer = null;
        }
    }

    var heroSection = document.getElementById('heroSlider');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopHeroAutoPlay);
        heroSection.addEventListener('mouseleave', startHeroAutoPlay);
    }

    // Start hero slideshow on load
    startHeroAutoPlay();

    /* ==========================================================================
       2. FLASH DEALS 4-CARD SLIDESHOW WITH RTL PHYSICS
       ========================================================================== */
    var pcSliderCurrentIndex = 0;
    var pcSliderTotalItems = 6;
    var pcSliderAutoPlayTimer = null;

    function getPcVisibleCards() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 4; // Exactly 4 cards on desktop!
    }

    function updatePcSlider() {
        var track = document.getElementById('pcSliderTrack');
        if (!track) return;
        var visible = getPcVisibleCards();
        var maxIndex = Math.max(0, pcSliderTotalItems - visible);
        if (pcSliderCurrentIndex > maxIndex) pcSliderCurrentIndex = maxIndex;
        if (pcSliderCurrentIndex < 0) pcSliderCurrentIndex = 0;

        var pctPerCard = 100 / visible;
        var offset = pcSliderCurrentIndex * pctPerCard;
        track.style.transform = 'translateX(' + offset + '%)';
    }

    function slidePcNext() {
        var visible = getPcVisibleCards();
        var maxIndex = Math.max(0, pcSliderTotalItems - visible);
        if (pcSliderCurrentIndex < maxIndex) {
            pcSliderCurrentIndex = pcSliderCurrentIndex + 1;
        } else {
            pcSliderCurrentIndex = 0;
        }
        updatePcSlider();
    }

    function slidePcPrev() {
        var visible = getPcVisibleCards();
        var maxIndex = Math.max(0, pcSliderTotalItems - visible);
        if (pcSliderCurrentIndex > 0) {
            pcSliderCurrentIndex = pcSliderCurrentIndex - 1;
        } else {
            pcSliderCurrentIndex = maxIndex;
        }
        updatePcSlider();
    }

    function startPcSliderAutoPlay() {
        stopPcSliderAutoPlay();
        pcSliderAutoPlayTimer = setInterval(function() {
            slidePcNext();
        }, 3800);
    }

    function stopPcSliderAutoPlay() {
        if (pcSliderAutoPlayTimer) {
            clearInterval(pcSliderAutoPlayTimer);
            pcSliderAutoPlayTimer = null;
        }
    }

    var pcSliderViewport = document.querySelector('.pc-slider-viewport');
    if (pcSliderViewport) {
        pcSliderViewport.addEventListener('mouseenter', stopPcSliderAutoPlay);
        pcSliderViewport.addEventListener('mouseleave', startPcSliderAutoPlay);
    }

    /* ==========================================================================
       3. INTERACTIVE PC BUILDER CALCULATOR
       ========================================================================== */
    function calculatePcBuild() {
        var purposeEl = document.getElementById('buildPurpose');
        var cpuEl = document.getElementById('buildCpu');
        var gpuEl = document.getElementById('buildGpu');
        var ramCoolEl = document.getElementById('buildRamCool');

        var basePrice = 2800; // Case, Motherboard, Power Supply 850W, Cable Management
        var pPrice = parseInt(purposeEl.options[purposeEl.selectedIndex].getAttribute('data-price') || '0', 10);
        var cPrice = parseInt(cpuEl.options[cpuEl.selectedIndex].getAttribute('data-price') || '0', 10);
        var gPrice = parseInt(gpuEl.options[gpuEl.selectedIndex].getAttribute('data-price') || '0', 10);
        var rPrice = parseInt(ramCoolEl.options[ramCoolEl.selectedIndex].getAttribute('data-price') || '0', 10);

        var total = basePrice + pPrice + cPrice + gPrice + rPrice;
        if (total < 3500) total = 3500;

        var priceDisp = document.getElementById('buildTotalPrice');
        if (priceDisp) {
            priceDisp.textContent = total.toLocaleString('en-US') + ' ر.س';
        }

        // Calculate FPS score
        var pFps = parseInt(purposeEl.options[purposeEl.selectedIndex].getAttribute('data-fps') || '200', 10);
        var gFps = parseInt(gpuEl.options[gpuEl.selectedIndex].getAttribute('data-fps') || '80', 10);
        var cFps = parseInt(cpuEl.options[cpuEl.selectedIndex].getAttribute('data-fps') || '40', 10);
        var totalFps = Math.round((pFps + gFps + cFps) / 1.5);
        if (totalFps > 320) totalFps = 320;

        var fpsDisp = document.getElementById('buildFpsDisplay');
        if (fpsDisp) {
            fpsDisp.textContent = totalFps + '+';
        }
    }

    function orderCustomBuild() {
        var price = document.getElementById('buildTotalPrice').textContent;
        addPcToCart('تجميعة احترافية مخصصة (Custom Rig Build)', parseInt(price.replace(/[^0-9]/g, ''), 10), 'images/pc_prod_white_rig.jpg');
    }

    /* ==========================================================================
       4. CATALOG PRODUCTS DATABASE & DYNAMIC FILTERING
       ========================================================================== */
    var pcProducts = [
        {
            id: 1,
            title: 'تجميعة ألترا وايت ريج مائية RTX 4080 Super',
            category: 'rigs',
            price: 12600,
            oldPrice: 14000,
            img: 'images/pc_prod_white_rig.jpg',
            specs: ['Core i9-14900KS', 'RTX 4080 Super', '64GB DDR5'],
            stock: 'باقي 2 فقط في المستودع',
            stockPct: 25,
            tag: 'وفر 1,400 ر.س'
        },
        {
            id: 2,
            title: 'لابتوب إيثر برو ستوديو 16 إنش OLED 240Hz',
            category: 'laptops',
            price: 9850,
            oldPrice: 10800,
            img: 'images/pc_prod_laptop_pro.jpg',
            specs: ['Intel Core i9', 'RTX 4080 12GB', '4K OLED 120Hz'],
            stock: 'باقي 4 أجهزة فقط',
            stockPct: 40,
            tag: 'وفر 950 ر.س'
        },
        {
            id: 3,
            title: 'شاشة قيمنق منحنية 34 بوصة QD-OLED 240Hz',
            category: 'monitors',
            price: 3890,
            oldPrice: 4490,
            img: 'images/pc_hero_monitor_white.jpg',
            specs: ['0.03ms Response', 'True Black HDR', 'Curved 1800R'],
            stock: 'متاح 6 شاشات',
            stockPct: 60,
            tag: 'وفر 600 ر.س'
        },
        {
            id: 4,
            title: 'كمبيوتر ألترا ماستر تبريد صلب مخصص RTX 4090',
            category: 'rigs',
            price: 18500,
            oldPrice: 21000,
            img: 'images/pc_hero_rig_white.jpg',
            specs: ['Ryzen 9 7950X3D', 'RTX 4090 24GB', 'Hardline Liquid'],
            stock: 'قطعة واحدة فقط متوفرة',
            stockPct: 15,
            tag: 'الإصدار الرائد'
        },
        {
            id: 5,
            title: 'كرت شاشة Asus ROG Strix GeForce RTX 4090 24GB',
            category: 'gpus',
            price: 8490,
            oldPrice: 9200,
            img: 'images/pc_hero_rig_white.jpg',
            specs: ['24GB GDDR6X', 'DLSS 3.5 AI', 'تبريد ثلاثي Axial-tech'],
            stock: 'متاح 3 قطع',
            stockPct: 30,
            tag: 'وفر 710 ر.س'
        },
        {
            id: 6,
            title: 'معالج إنتل الخارق Intel Core i9-14900KS 6.2GHz',
            category: 'cpus',
            price: 2690,
            oldPrice: 2950,
            img: 'images/pc_prod_white_rig.jpg',
            specs: ['24 Cores / 32 Threads', '6.2GHz Turbo', 'LGA1700'],
            stock: 'متوفر 8 معالجات',
            stockPct: 70,
            tag: 'وفر 260 ر.س'
        },
        {
            id: 7,
            title: 'مبرد مائي ذكي Corsair iCUE LINK LCD 360mm RGB',
            category: 'cooling',
            price: 1390,
            oldPrice: 1580,
            img: 'images/pc_prod_white_rig.jpg',
            specs: ['شاشة IPS LCD 2.1"', 'مضخة هادئة جداً', '3x 120mm Fans'],
            stock: 'متوفر 5 قطع',
            stockPct: 50,
            tag: 'وفر 190 ر.س'
        },
        {
            id: 8,
            title: 'ذواكر كورسير دومينيتور تيتانيوم 64GB DDR5 6600MHz',
            category: 'storage',
            price: 1450,
            oldPrice: 1690,
            img: 'images/pc_prod_white_rig.jpg',
            specs: ['2x32GB Kit', 'CL32 فائقة السرعة', 'ألمنيوم مفرز'],
            stock: 'متوفر 7 قطع',
            stockPct: 65,
            tag: 'وفر 240 ر.س'
        },
        {
            id: 9,
            title: 'كيس ليان لي Lian Li O11 Dynamic EVO RGB أبيض',
            category: 'cases',
            price: 890,
            oldPrice: 1050,
            img: 'images/pc_hero_rig_white.jpg',
            specs: ['زجاج بانورامي مقسى', 'دعم مشتت 420mm', 'إضاءة ARGB'],
            stock: 'متوفر 6 قطع',
            stockPct: 55,
            tag: 'وفر 160 ر.س'
        },
        {
            id: 10,
            title: 'سماعات رأس محيطية بدقة 7.1 صوت استوديو',
            category: 'accessories',
            price: 950,
            oldPrice: 1250,
            img: 'images/prod_silver_headphones.jpg',
            specs: ['Hi-Res Audio', 'عزل ضوضاء ANC', 'ميكروفون احترافي'],
            stock: 'متوفر بالمستودع',
            stockPct: 80,
            tag: 'وفر 300 ر.س'
        },
        {
            id: 11,
            title: 'محطة شحن مكتبية MagSafe 3 في 1 ألمنيوم',
            category: 'accessories',
            price: 290,
            oldPrice: 390,
            img: 'images/prod_wireless_charger.jpg',
            specs: ['25W Fast Charge', 'ألمنيوم مفرز CNC', 'مغناطيس N52'],
            stock: 'متوفر 5 قطع',
            stockPct: 50,
            tag: 'وفر 100 ر.س'
        }
    ];

    var currentPcCategory = 'all';
    var currentPcSort = 'featured';
    var maxPcPrice = 20000;

    function renderPcCatalog(items) {
        var grid = document.getElementById('pcProductsGrid');
        if (!grid) return;
        grid.innerHTML = '';

        var countEl = document.getElementById('pcProductCount');
        if (countEl) countEl.textContent = items.length;

        if (items.length === 0) {
            grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:60px 20px; color:var(--color-muted);"><i class="fa-solid fa-magnifying-glass" style="font-size:42px; margin-bottom:14px; color:var(--color-border); display:block;"></i><h3>لم يتم العثور على أجهزة مطابقة للمحددات</h3><p style="font-size:13.5px; margin-top:6px;">يرجى توسيع نطاق السعر أو اختيار قسم عتاد آخر.</p></div>';
            return;
        }

        items.forEach(function(p) {
            var card = document.createElement('div');
            card.className = 'pc-card';
            var specsHtml = '';
            p.specs.forEach(function(s) {
                specsHtml += '<span class="pc-spec-tag">' + s + '</span>';
            });

            card.innerHTML = 
                '<span class="pc-card-badge">' + p.tag + '</span>' +
                '<div class="pc-card-img-box">' +
                    '<img decoding="async" src="' + p.img + '" alt="' + p.title + '">' +
                '</div>' +
                '<div class="pc-card-body">' +
                    '<div>' +
                        '<div class="pc-card-cat">' + (p.category === 'rigs' ? 'تجميعات النخبة 4K' : (p.category === 'laptops' ? 'لابتوبات المحترفين' : (p.category === 'monitors' ? 'شاشات العرض' : (p.category === 'gpus' ? 'كروت الشاشة RTX' : (p.category === 'cpus' ? 'المعالجات المركزية' : (p.category === 'cooling' ? 'التبريد المائي السائل' : (p.category === 'storage' ? 'الذواكر ووحدات التخزين' : (p.category === 'cases' ? 'صناديق الكيس ومزودات الطاقة' : 'ملحقات العتاد')))))))) + '</div>' +
                        '<h4 class="pc-card-title">' + p.title + '</h4>' +
                        '<div class="pc-card-specs">' + specsHtml + '</div>' +
                        '<div class="pc-card-stock">' +
                            '<div class="pc-stock-bar"><div class="pc-stock-fill" style="width: ' + p.stockPct + '%;"></div></div>' +
                            '<span>' + p.stock + '</span>' +
                        '</div>' +
                    '</div>' +
                    '<div>' +
                        '<div class="pc-card-pricing">' +
                            '<span class="pc-price-current">' + p.price.toLocaleString('en-US') + ' ر.س</span>' +
                            '<span class="pc-price-old">' + p.oldPrice.toLocaleString('en-US') + ' ر.س</span>' +
                        '</div>' +
                        '<button class="pc-btn-add" onclick="addPcToCart(\'' + p.title + '\', ' + p.price + ', \'' + p.img + '\')">' +
                            '<i class="fa-solid fa-cart-plus"></i>' +
                            '<span>إضافة للسلة</span>' +
                        '</button>' +
                    '</div>' +
                '</div>';
            grid.appendChild(card);
        });
    }

    function applyPcFilters() {
        var filtered = pcProducts.filter(function(p) {
            var matchCategory = true;
            if (currentPcCategory !== 'all') {
                if (p.category !== currentPcCategory) {
                    matchCategory = false;
                }
            }
            var matchPrice = p.price <= maxPcPrice;
            return matchCategory && matchPrice;
        });

        // Sorting
        if (currentPcSort === 'price-asc') {
            filtered.sort(function(a, b) { return a.price - b.price; });
        } else if (currentPcSort === 'price-desc') {
            filtered.sort(function(a, b) { return b.price - a.price; });
        } else if (currentPcSort === 'bestseller') {
            filtered.sort(function(a, b) { return a.id - b.id; });
        }

        renderPcCatalog(filtered);
    }

    function getCatArabicName(c) {
        if (c === 'rigs') return 'ØªØ¬Ù…ÙŠØ¹Ø§Øª Ø§Ù„Ø¬ÙŠÙ…Ù†Ø¬ 4K Ø§Ù„Ø§Ø­ØªØ±Ø§ÙÙŠØ©';
        if (c === 'laptops') return 'Ù„Ø§Ø¨ØªÙˆØ¨Ø§Øª Ø§Ù„Ø§Ø³ØªÙˆØ¯ÙŠÙˆ ÙˆØ§Ù„Ù…ÙˆÙ†ØªØ§Ø¬';
        if (c === 'monitors') return 'Ø´Ø§Ø´Ø§Øª QD-OLED Ø§Ù„Ù…Ù†Ø­Ù†ÙŠØ© 240Hz';
        if (c === 'gpus') return 'ÙƒØ±ÙˆØª Ø§Ù„Ø´Ø§Ø´Ø© RTX 40 & 50 Series';
        if (c === 'cpus') return 'Ø§Ù„Ù…Ø¹Ø§Ù„Ø¬Ø§Øª Ø§Ù„Ù…Ø±ÙƒØ²ÙŠØ© Intel & AMD';
        if (c === 'cooling') return 'Ø£Ù†Ø¸Ù…Ø© Ø§Ù„ØªØ¨Ø±ÙŠØ¯ Ø§Ù„Ù…Ø§Ø¦ÙŠ Ø§Ù„Ø³Ø§Ø¦Ù„ Custom';
        if (c === 'storage') return 'Ø°ÙˆØ§ÙƒØ± DDR5 ÙˆÙˆØ­Ø¯Ø§Øª NVMe Gen5';
        if (c === 'cases') return 'ØµÙ†Ø§Ø¯ÙŠÙ‚ Ø§Ù„ÙƒÙŠØ³ ÙˆÙ…Ø²ÙˆØ¯Ø§Øª Ø§Ù„Ø·Ø§Ù‚Ø© Gold';
        if (c === 'accessories') return 'Ù…Ù„Ø­Ù‚Ø§Øª ÙˆØ§ÙƒØ³Ø³ÙˆØ§Ø±Ø§Øª Ø§Ù„Ø£Ù„Ø¹Ø§Ø¨ Ø§Ù„Ø§Ø­ØªØ±Ø§ÙÙŠØ©';
        return 'ÙƒØ§ÙØ© Ø§Ù„Ø£Ø¬Ù‡Ø²Ø© ÙˆÙ‚Ø·Ø¹ Ø§Ù„Ø¹ØªØ§Ø¯';
    }

    function filterPcCategory(cat, btn) {
        currentPcCategory = cat;

        // Highlight sidebar buttons in catalog
        var sideBtns = document.querySelectorAll('.pc-filter-cat-btn');
        sideBtns.forEach(function(b) {
            b.classList.remove('active');
            var onclickAttr = b.getAttribute('onclick') || '';
            if (onclickAttr.indexOf("'" + cat + "'") !== -1) {
                b.classList.add('active');
            }
        });

        // Highlight WoodMart sidebar items
        var wmLtems = document.querySelectorAll('.pc-wm-cat-link');
        wmLtems.forEach(function(lk) {
            var onclickAttr = lk.getAttribute('onclick') || '';
            if (onclickAttr.indexOf("'" + cat + "'") !== -1) {
                lk.style.background = '#eef2ff';
                lk.style.color = '#4f46e5';
            } else {
                lk.style.background = '';
                lk.style.color = '';
            }
        });

        // Update Catalog active category title display
        var titleDisplay = document.getElementById('pcActiveCategoryTitle');
        if (titleDisplay) {
            titleDisplay.textContent = getCatArabicName(cat);
        }

        applyPcFilters();

        var catalogEl = document.getElementById('catalog');
        if (catalogEl) {
            catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function sortPcProducts(sortType, btn) {
        currentPcSort = sortType;
        var sortBtns = document.querySelectorAll('.pc-sort-btn');
        sortBtns.forEach(function(b) { b.classList.remove('active'); });
        if (btn) btn.classList.add('active');
        applyPcFilters();
    }

    function filterPcByPrice(val) {
        maxPcPrice = parseInt(val, 10);
        var disp = document.getElementById('pcPriceDisplay');
        if (disp) {
            disp.textContent = maxPcPrice.toLocaleString('en-US') + ' ر.س';
        }
        applyPcFilters();
    }

    function searchPcProducts() {
        var query = (document.getElementById('pcSearchInput').value || '').trim().toLowerCase();
        if (query.length === 0) {
            applyPcFilters();
            return;
        }
        var filtered = pcProducts.filter(function(p) {
            return p.title.toLowerCase().indexOf(query) !== -1 || p.category.toLowerCase().indexOf(query) !== -1;
        });
        renderPcCatalog(filtered);
    }

    /* ==========================================================================
       5. SLIDE-OUT CART CONTROLLER
       ========================================================================== */
    var pcCart = [];

    function togglePcCartDrawer() {
        var drawer = document.getElementById('pcCartDrawer');
        var overlay = document.getElementById('pcCartOverlay');
        if (drawer && overlay) {
            drawer.classList.toggle('active');
            overlay.classList.toggle('active');
        }
    }

    function addPcToCart(title, price, img) {
        pcCart.push({ title: title, price: price, img: img });
        updatePcCartUI();
        showToast('تمت إضافة ' + title + ' إلى سلة العتاد بنجاح! 🚀');
        togglePcCartDrawer();
    }

    function removePcCartItem(idx) {
        pcCart.splice(idx, 1);
        updatePcCartUI();
    }

    function updatePcCartUI() {
        var badge = document.getElementById('pcCartBadge');
        var headerCount = document.getElementById('pcCartCountHeader');
        if (badge) badge.textContent = pcCart.length;
        if (headerCount) headerCount.textContent = pcCart.length;

        var container = document.getElementById('pcCartItemsContainer');
        var totalEl = document.getElementById('pcCartTotalSum');
        if (!container || !totalEl) return;

        if (pcCart.length === 0) {
            container.innerHTML = 
                '<div class="pc-cart-empty">' +
                    '<i class="fa-solid fa-cart-shopping"></i>' +
                    '<h4 style="font-weight:900; margin-bottom:6px; color:var(--color-navy);">سلتك فارغة حالياً</h4>' +
                    '<p>تصفح أحدث أجهزة الكمبيوتر والتجميعات وأضفها لسلتك بسهولة</p>' +
                '</div>';
            totalEl.textContent = '0 ر.س';
            return;
        }

        var total = 0;
        var html = '';
        pcCart.forEach(function(item, index) {
            total = total + item.price;
            html += 
                '<div class="pc-cart-item">' +
                    '<img decoding="async" src="' + item.img + '" class="pc-cart-item-img" alt="' + item.title + '">' +
                    '<div class="pc-cart-item-info">' +
                        '<div class="pc-cart-item-title">' + item.title + '</div>' +
                        '<div class="pc-cart-item-price">' + item.price.toLocaleString('en-US') + ' ر.س</div>' +
                    '</div>' +
                    '<button class="pc-cart-remove" onclick="removePcCartItem(' + index + ')" title="حذف">' +
                        '<i class="fa-solid fa-trash-can"></i>' +
                    '</button>' +
                '</div>';
        });

        container.innerHTML = html;
        totalEl.textContent = total.toLocaleString('en-US') + ' ر.س';
    }

    function proceedPcCheckout() {
        if (!pcCart || pcCart.length === 0) {
            showToast('سلة المشتريات فارغة حالياً!');
            return;
        }

        let total = 0;
        let itemsList = "";
        pcCart.forEach((item, index) => {
            let itemTotal = item.price * (item.quantity || 1);
            total += itemTotal;
            itemsList += `\n${index + 1}) *${item.name || item.title}*\n   الكمية: ${item.quantity || 1} × ${item.price} = ${itemTotal} ر.س`;
        });

        let orderNum = "PC-" + Math.floor(100000 + Math.random() * 900000);
        let msg = `*طلب شراء وتجميع جديد من سايبر تك PC* 🖥️\n`;
        msg += `*رقم الطلب:* ${orderNum}\n`;
        msg += `--------------------------------\n`;
        msg += `*القطع المطلوبة:*${itemsList}\n`;
        msg += `--------------------------------\n`;
        msg += `💰 *الإجمالي الكلي:* *${total} ر.س*\n\n`;
        msg += `أود تأكيد الطلب واختبار التجميعة قبل الشحن.`;

        // Log order to localStorage for Admin Orders Tab
        try {
            let orders = JSON.parse(localStorage.getItem('techno_orders') || '[]');
            let summary = pcCart.map(i => `${i.name || i.title} (x${i.quantity || 1})`).join(', ');
            orders.unshift({
                orderNum: orderNum,
                date: new Date().toLocaleDateString('ar-SA') + ' ' + new Date().toLocaleTimeString('ar-SA'),
                summary: summary,
                total: total,
                fullText: msg
            });
            localStorage.setItem('techno_orders', JSON.stringify(orders.slice(0, 50)));
        } catch(e) {}

        // Dynamic WhatsApp Number from Settings
        let waPhone = "201027093535";
        try {
            let store = JSON.parse(localStorage.getItem('techno_store_data') || '{}');
            if (store && store.settings && store.settings.whatsappFormatted) {
                waPhone = store.settings.whatsappFormatted;
            }
        } catch(e) {}

        let waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(msg)}`;
        showToast('جاري توجيهك إلى واتساب لإتمام تأكيد الطلب والشحن... 🚀');
        setTimeout(function() {
            window.open(waUrl, "_blank");
        }, 900);
    }

    /* ==========================================================================
       6. MODALS & TOAST NOTIFICATIONS
       ========================================================================== */
    function showToast(msg) {
        var toast = document.getElementById('pcToast');
        var msgEl = document.getElementById('pcToastMsg');
        if (toast && msgEl) {
            msgEl.textContent = msg;
            toast.classList.add('show');
            setTimeout(function() {
                toast.classList.remove('show');
            }, 3500);
        }
    }

    function openCompatibilityModal() {
        var m = document.getElementById('compatModal');
        var o = document.getElementById('compatOverlay');
        if (m && o) {
            m.style.display = 'block';
            o.classList.add('active');
        }
    }

    function closeCompatibilityModal() {
        var m = document.getElementById('compatModal');
        var o = document.getElementById('compatOverlay');
        if (m && o) {
            m.style.display = 'none';
            o.classList.remove('active');
            var res = document.getElementById('compatResult');
            if (res) res.style.display = 'none';
        }
    }

    function checkCompatibility() {
        var input = document.getElementById('compatInput');
        var res = document.getElementById('compatResult');
        if (input && res) {
            var val = (input.value || '').trim();
            if (val.length < 2) {
                showToast('يرجى كتابة موديل القطعة أولاً!');
                return;
            }
            res.style.display = 'block';
        }
    }

    function openPcSupportModal() {
        var m = document.getElementById('pcSupportModal');
        var o = document.getElementById('pcSupportOverlay');
        if (m && o) {
            m.style.display = 'block';
            o.classList.add('active');
        }
    }

    function closePcSupportModal() {
        var m = document.getElementById('pcSupportModal');
        var o = document.getElementById('pcSupportOverlay');
        if (m && o) {
            m.style.display = 'none';
            o.classList.remove('active');
        }
    }

    // Countdown Timer Loop
    setInterval(function() {
        var secEl = document.getElementById('pccd-seconds');
        if (!secEl) return;
        var s = parseInt(secEl.textContent, 10);
        if (s > 0) {
            s = s - 1;
        } else {
            s = 59;
        }
        secEl.textContent = (s < 10 ? '0' : '') + s;
    }, 1000);

    // Initializations
    window.addEventListener('DOMContentLoaded', function() {
        startHeroAutoPlay();
        startPcSliderAutoPlay();
        calculatePcBuild();
        applyPcFilters();
    });

    window.addEventListener('resize', function() {
        updatePcSlider();
    });
    

// Global Frontend Live Sync from Admin CMS
function applyLiveStoreData() {
    let data = null;
    try {
        let raw = localStorage.getItem('techno_store_data');
        if (raw) data = JSON.parse(raw);
    } catch(e) {}

    if (!data) return;

    // 1. Global Settings
    if (data.settings) {
        let s = data.settings;
        let topAnnounce = document.querySelector('.pc-topbar-text span');
        if (topAnnounce && s.topbarAnnouncement) {
            topAnnounce.textContent = s.topbarAnnouncement;
        }
        let waFloat = document.querySelector('.tech-floating-whatsapp');
        if (waFloat && s.whatsappFormatted) {
            waFloat.href = `https://wa.me/${s.whatsappFormatted}`;
        }
        let hotlines = document.querySelectorAll('.pc-nav-hotline span strong');
        hotlines.forEach(h => {
            if (s.phone) h.textContent = s.phone;
        });
    }

    // 2. Home Page CMS
    if (data.pages && data.pages.home) {
        let h = data.pages.home;
        let heroTitle = document.querySelector('.pc-wm-slide-title');
        if (heroTitle && h.heroTitle) {
            heroTitle.innerHTML = h.heroTitle;
        }
        let heroTag = document.querySelector('.pc-wm-badge');
        if (heroTag && h.heroBadge) {
            heroTag.innerHTML = `<i class="fa-solid fa-bolt"></i> ${h.heroBadge}`;
        }
        let heroDesc = document.querySelector('.pc-wm-slide-desc');
        if (heroDesc && h.heroSubtitle) {
            heroDesc.textContent = h.heroSubtitle;
        }
        let heroImg = document.querySelector('.pc-wm-slide-img img');
        if (heroImg && h.heroImage) {
            heroImg.src = h.heroImage;
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    applyLiveStoreData();
});
