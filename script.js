// ==========================================
// إعداد الصفحة
// ==========================================
if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
}

window.scrollTo(0, 0);


// ==========================================
// التنقل السلس وشريط التنقل
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");

            if (targetId && targetId.startsWith("#")) {
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();

                    targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                    navLinks.forEach(item => item.classList.remove("active"));
                    this.classList.add("active");
                }
            }
        });
    });

    window.addEventListener("scroll", function () {
        let currentSection = "";

        document.querySelectorAll("section[id], header[id], div[id]")
            .forEach(section => {
                const sectionTop = section.offsetTop - 120;

                if (window.scrollY >= sectionTop) {
                    currentSection = "#" + section.getAttribute("id");
                }
            });

        if (currentSection) {
            navLinks.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === currentSection
                );
            });
        }
    });
});


// ==========================================
// نظام الشواهد والتنقل بين الصفحات
// ==========================================
document.addEventListener("DOMContentLoaded", function () {

    const DOMAINS_DATABASE = {
        domain1: {
            title: "المجال الأول: الإدارة المدرسية",
            levels: [
                { code: "1-1-1-1", desc: "تضع المدرسة خطة تشغيلية مكتملة العناصر وفق أهداف تطويرية محددة." },
                { code: "2-1-1-1", desc: "تتابع المدرسة تنفيذ خطتها وتطورها بما يضمن تحقيق أهدافها." },
                { code: "1-1-2-1", desc: "تعزز المدرسة القيم الإسلامية والهوية الوطنية." },
                { code: "2-1-2-1", desc: "تلتزم المدرسة بقيم مهنة التعليم وأخلاقياتها." },
                { code: "3-1-2-1", desc: "توفر المدرسة مناخاً آمناً للتعلم والنمو نفسيّاً واجتماعيّاً." },
                { code: "4-1-2-1", desc: "تنشر المدرسة قواعد السلوك والمواظبة، وتتابع تطبيقها." },
                { code: "5-1-2-1", desc: "توفر المدرسة برامج وأنشطة تربوية داعمة للسلوك الإيجابي." },
                { code: "6-1-2-1", desc: "توفر المدرسة برامج وأنشطة إثرائية غير صفية؛ لتطوير مواهب المتعلمين." },
                { code: "1-1-3-1", desc: "تعزز المدرسة بناء العلاقات الإيجابية والتعاون في المجتمع المدرسي." },
                { code: "2-1-3-1", desc: "تعزز المدرسة مشاركة الأسرة في تعلم أبنائهم، والتحضير لمستقبلهم." },
                { code: "3-1-3-1", desc: "تعزز المدرسة الشراكة المجتمعية لدعم التعلم والتأثير الإيجابي." },
                { code: "1-1-4-1", desc: "تشجع المدرسة منسوبيها للحصول على الرخصة المهنية." },
                { code: "2-1-4-1", desc: "تدعم المدرسة التطوير المهني لمنسوبيها وفقاً لنتائج تقويم الأداء." },
                { code: "3-1-4-1", desc: "تطبق المدرسة التقويم الذاتيّ المبنيّ على المعايير المعتمدة من الهيئة." },
                { code: "4-1-4-1", desc: "تنفذ المدرسة خطة للتحسين بناء على نتائج التقويم المدرسي." }
            ]
        },

        domain2: {
            title: "المجال الثاني: التعليم والتعلم",
            levels: [
                { code: "1-1-1-2", desc: "توفر المدرسة فرصاً متكافئة للتعلم تلبي احتياجات المتعلمين." },
                { code: "2-1-1-2", desc: "تدعم المدرسة تنفيذ المناهج لتحقيق نواتج التعلم المستهدفة." },
                { code: "3-1-1-2", desc: "تنوع المدرسة في إستراتيجيات التدريس لتلبية احتياجات المتعلمين." },
                { code: "4-1-1-2", desc: "تفعل المدرسة التعلم الإلكتروني لتلبية احتياجات المتعلمين." },
                { code: "5-1-1-2", desc: "توفر المدرسة أنشطة تعلم تطبيقية ترتبط بحياة المتعلمين." },
                { code: "6-1-1-2", desc: "تنمي المدرسة المهارات القرائية والعددية الأساسية لدى المتعلمين." },
                { code: "7-1-1-2", desc: "تنمي المدرسة مهارات التفكير العليا لدى المتعلمين." },
                { code: "8-1-1-2", desc: "تنمي المدرسة المهارات العاطفية والاجتماعية لدى المتعلمين." },
                { code: "9-1-1-2", desc: "تنمي المدرسة المهارات الرقمية لدى المتعلمين." },
                { code: "10-1-1-2", desc: "تعزز المدرسة دافعية المتعلمين للتعلم والاستمتاع به." },
                { code: "1-1-2-2", desc: "تقوّم المدرسة أداء المتعلمين باستخدام أساليب وأدوات تقويم متنوعة." },
                { code: "2-1-2-2", desc: "تحلل المدرسة نتائج التقويم، وتوظفها في تحسين نواتج التعلم." },
                { code: "3-1-2-2", desc: "تقدم المدرسة التغذية الراجعة للمتعلمين بانتظام." }
            ]
        },

        domain3: {
            title: "المجال الثالث: نواتج التعلم",
            levels: [
                { code: "1-1-1-3", desc: "يحقق المتعلمون نتائج متقدمة في مجال القراءة وفقاً للاختبارات الوطنية." },
                { code: "2-1-1-3", desc: "يحقق المتعلمون نتائج متقدمة في مجال الرياضيات وفقاً للاختبارات الوطنية." },
                { code: "3-1-1-3", desc: "يحقق المتعلمون نتائج متقدمة في مجال العلوم وفقاً للاختبارات الوطنية." },
                { code: "1-1-2-3", desc: "يظهر المتعلمون الاعتزاز بالقيم والهوية الوطنية." },
                { code: "2-1-2-3", desc: "يظهر المتعلمون اتجاهات إيجابية نحو ذواتهم." },
                { code: "3-1-2-3", desc: "يظهر المتعلمون التزاماً بالممارسات الصحية السليمة." },
                { code: "4-1-2-3", desc: "يشارك المتعلمون في الأنشطة المجتمعية والأعمال التطوعية." },
                { code: "5-1-2-3", desc: "يلتزم المتعلمون بقواعد السلوك والانضباط المدرسي." },
                { code: "6-1-2-3", desc: "يظهر المتعلمون القدرة على البحث والتعلم الذاتي." },
                { code: "7-1-2-3", desc: "يظهر المتعلمون اعتزازاً بثقافتهم واحتراماً للتنوع الثقافي." }
            ]
        },

        domain4: {
            title: "المجال الرابع: البيئة المدرسية",
            levels: [
                { code: "1-1-1-4", desc: "تنظيم مبنى المدرسة ملائم لعدد المتعلمين والمرحلة العمرية." },
                { code: "2-1-1-4", desc: "تتوافر فصول ومعامل ملائمة للعملية التعليمية." },
                { code: "3-1-1-4", desc: "تلبي المرافق والخدمات المساندة احتياجات المتعلمين." },
                { code: "1-1-2-4", desc: "تتوافر في فصول المدرسة ومعاملها متطلبات الأمن والسلامة." },
                { code: "2-1-2-4", desc: "تعمل المدرسة على صيانة جميع مرافق المبنى بانتظام." },
                { code: "3-1-2-4", desc: "تعمل المدرسة على نظافة المبنى المدرسي وجميع مرافقه بانتظام." }
            ]
        }
    };


    // ==========================================
    // حالة النظام
    // ==========================================
    let activeUserRole = "guest";
    let activeFilter = "all";
    let globalCurrentLevelCode = null;
    let globalCurrentDomainKey = null;


    // تحديد المجال الصحيح للمستوى
    function getDomainKeyForLevel(levelCode) {
        for (const domainKey of Object.keys(DOMAINS_DATABASE)) {
            const levelExists = DOMAINS_DATABASE[domainKey].levels
                .some(level => level.code === levelCode);

            if (levelExists) {
                return domainKey;
            }
        }

        return null;
    }


    // التحقق من صلاحية المسؤولة على مجال المستوى المحدد
    function canManageLevel(levelCode) {
        const domainKey = getDomainKeyForLevel(levelCode);

        return Boolean(
            domainKey &&
            activeUserRole !== "guest" &&
            activeUserRole === domainKey
        );
    }


    updateAuthUI();


    // ==========================================
    // استعادة جلسة تسجيل الدخول
    // ==========================================
    async function restoreAdminSession() {
        try {
            const { data, error } = await supabaseClient.auth.getUser();

            if (error || !data.user) {
                activeUserRole = "guest";
                localStorage.removeItem("active_user_role");
                updateAuthUI();
                refreshCurrentPage();
                return;
            }

            const { data: profile, error: profileError } =
                await supabaseClient
                    .from("admin_profiles")
                    .select("domain_key, display_name")
                    .eq("user_id", data.user.id)
                    .maybeSingle();

            if (profileError || !profile) {
                await supabaseClient.auth.signOut();

                activeUserRole = "guest";
                localStorage.removeItem("active_user_role");

                updateAuthUI();
                refreshCurrentPage();
                return;
            }

            activeUserRole = profile.domain_key;

            localStorage.setItem(
                "active_user_role",
                profile.domain_key
            );

            updateAuthUI();
            refreshCurrentPage();

        } catch (error) {
            console.error("Session restore error:", error);

            activeUserRole = "guest";
            localStorage.removeItem("active_user_role");

            updateAuthUI();
            refreshCurrentPage();
        }
    }


    function refreshCurrentPage() {
        if (
            globalCurrentDomainKey &&
            window.location.pathname.includes("levels.html")
        ) {
            initLevelsPage(globalCurrentDomainKey);
        }

        if (
            globalCurrentLevelCode &&
            window.location.pathname.includes("evidence.html")
        ) {
            renderEvidenceFiltersAndGrid(globalCurrentLevelCode);
        }
    }


    // ==========================================
    // تحديد الصفحة الحالية
    // ==========================================
    const path = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);

    if (path.includes("levels.html")) {
        const domainKey = urlParams.get("domain");

        if (DOMAINS_DATABASE[domainKey]) {
            globalCurrentDomainKey = domainKey;
            initLevelsPage(domainKey);
        } else {
            window.location.href = "index.html";
        }

    } else if (path.includes("evidence.html")) {
        const levelCode = urlParams.get("level");

        if (levelCode && getDomainKeyForLevel(levelCode)) {
            initEvidencePage(levelCode);
        } else {
            window.location.href = "index.html";
        }
    }

    restoreAdminSession();


    // ==========================================
    // صفحة المستويات
    // ==========================================
    async function initLevelsPage(domainKey) {
        const domain = DOMAINS_DATABASE[domainKey];

        if (!domain) return;

        const titleEl = document.getElementById("currentSelectedDomainTitle");
        if (titleEl) titleEl.textContent = domain.title;

        const breadcrumbDomainName =
            document.getElementById("breadcrumbDomainName");

        if (breadcrumbDomainName) {
            breadcrumbDomainName.textContent = domain.title;
        }

        const grid = document.getElementById("levelsGridContainer");
        if (!grid) return;

        grid.innerHTML = "";

        let evidenceCounts;

        try {
            const results = await Promise.all(
                domain.levels.map(async level => {
                    const evidence = await getEvidenceData(level.code);

                    return {
                        code: level.code,
                        count: evidence.length
                    };
                })
            );

            evidenceCounts = Object.fromEntries(
                results.map(item => [item.code, item.count])
            );

        } catch (error) {
            console.error("Error loading level counts:", error);

            evidenceCounts = Object.fromEntries(
                domain.levels.map(level => [level.code, 0])
            );
        }

        domain.levels.forEach(level => {
            const actualCount = evidenceCounts[level.code] ?? 0;
            const canEdit = canManageLevel(level.code);

            const card = document.createElement("div");
            card.className = "level-card-item";

            card.innerHTML = `
                <div>
                    <div class="level-card-top">
                        <span class="level-code-tag">${level.code}</span>

                        ${canEdit ? `
                            <button
                                class="quick-plus-add-btn"
                                data-level-code="${level.code}"
                                title="رفع شاهد جديد"
                            >+</button>
                        ` : ""}
                    </div>

                    <p class="level-card-text">${level.desc}</p>
                </div>

                <div>
                    <div class="evidence-count-badge">
                        عدد الشواهد: ${actualCount}
                    </div>

                    <button
                        class="browse-evidence-btn"
                        data-level-code="${level.code}"
                    >
                        تصفح الشواهد (${actualCount})
                    </button>
                </div>
            `;

            const addButton = card.querySelector(".quick-plus-add-btn");

            if (addButton) {
                addButton.addEventListener("click", function () {
                    openAddEvidenceModalForCode(level.code);
                });
            }

            const browseButton = card.querySelector(".browse-evidence-btn");

            browseButton.addEventListener("click", function () {
                location.href = `evidence.html?level=${encodeURIComponent(level.code)}`;
            });

            grid.appendChild(card);
        });
    }


    // ==========================================
    // صفحة الشواهد
    // ==========================================
    function initEvidencePage(levelCode) {
        const domainKey = getDomainKeyForLevel(levelCode);

        if (!domainKey) {
            window.location.href = "index.html";
            return;
        }

        const domain = DOMAINS_DATABASE[domainKey];
        const level = domain.levels.find(item => item.code === levelCode);

        globalCurrentLevelCode = levelCode;
        globalCurrentDomainKey = domainKey;

        const badgeEl = document.getElementById("currentLevelCodeBadge");

        if (badgeEl) {
            badgeEl.textContent = level.code;
        }

        const headingEl =
            document.getElementById("currentLevelDescHeading");

        if (headingEl) {
            headingEl.textContent = level.desc;
        }

        const domLink = document.getElementById("breadcrumbDomainLink");

        if (domLink) {
            domLink.textContent = domain.title;
            domLink.href = `levels.html?domain=${domainKey}`;
        }

        const levelCodeEl = document.getElementById("breadcrumbLevelCode");

        if (levelCodeEl) {
            levelCodeEl.textContent = `المستوى (${level.code})`;
        }

        const backBtn = document.getElementById("backToLevelsBtn");

        if (backBtn) {
            backBtn.onclick = function () {
                location.href = `levels.html?domain=${domainKey}`;
            };
        }

        renderEvidenceFiltersAndGrid(levelCode);
    }


    window.setEvidenceFilter = function (filterType) {
        activeFilter = filterType;

        if (globalCurrentLevelCode) {
            renderEvidenceFiltersAndGrid(globalCurrentLevelCode);
        }
    };


    // ==========================================
    // عرض الشواهد ومساحة الرفع
    // ==========================================
    async function renderEvidenceFiltersAndGrid(levelCode) {
        let list;

        try {
            list = await getEvidenceData(levelCode);

        } catch (error) {
            console.error("Error loading evidence:", error);
            alert("تعذر تحميل الشواهد. حاولي مرة ثانية.");
            return;
        }

        const cAll = document.getElementById("countFilterAll");
        const cImg = document.getElementById("countFilterImage");
        const cVid = document.getElementById("countFilterVideo");
        const cDoc = document.getElementById("countFilterDoc");

        if (cAll) cAll.textContent = list.length;
        if (cImg) cImg.textContent = list.filter(item => item.type === "image").length;
        if (cVid) cVid.textContent = list.filter(item => item.type === "video").length;
        if (cDoc) cDoc.textContent = list.filter(item => item.type === "doc").length;

        document.querySelectorAll(".filter-tab-btn").forEach(button => {
            button.classList.toggle(
                "active",
                button.getAttribute("data-filter") === activeFilter
            );
        });

        const grid = document.getElementById("evidenceDisplayGrid");
        if (!grid) return;

        grid.innerHTML = "";

        const items = activeFilter === "all"
            ? list
            : list.filter(item => item.type === activeFilter);

        const canEdit = canManageLevel(levelCode);

        if (canEdit) {
            const dropzoneCard = document.createElement("div");
            dropzoneCard.className = "upload-dropzone-card";

            dropzoneCard.innerHTML = `
                <div class="upload-dropzone-icon">
                    <svg viewBox="0 0 24 24" width="42" height="42"
                        stroke="currentColor" stroke-width="2" fill="none">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                </div>

                <h4 class="upload-dropzone-title">إضافة شاهد</h4>

                <p class="upload-dropzone-desc">
                    اسحب الملف هنا أو اضغط للاختيار
                </p>

                <input
                    type="file"
                    class="hidden-direct-file-input"
                    style="display:none"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.mov"
                />
            `;

            const fileInput =
                dropzoneCard.querySelector(".hidden-direct-file-input");

            dropzoneCard.addEventListener("click", function (event) {
                if (event.target === fileInput) return;

                if (event.target.closest("button, a")) return;

                fileInput.click();
            });

            fileInput.addEventListener("click", function (event) {
                event.stopPropagation();
            });

            function preventDefaults(event) {
                event.preventDefault();
                event.stopPropagation();
            }

            ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
                dropzoneCard.addEventListener(eventName, preventDefaults);
            });

            ["dragenter", "dragover"].forEach(eventName => {
                dropzoneCard.addEventListener(eventName, function () {
                    dropzoneCard.style.borderColor = "var(--color-light-pink)";
                    dropzoneCard.style.background = "rgba(43, 18, 76, 0.7)";
                });
            });

            ["dragleave", "drop"].forEach(eventName => {
                dropzoneCard.addEventListener(eventName, function () {
                    dropzoneCard.style.borderColor = "rgba(223, 182, 178, 0.4)";
                    dropzoneCard.style.background = "rgba(43, 18, 76, 0.4)";
                });
            });

            dropzoneCard.addEventListener("drop", async function (event) {
                const file = event.dataTransfer?.files?.[0];

                if (file) {
                    await handleSelectedFile(file, levelCode);
                }
            });

            fileInput.addEventListener("change", async function () {
                const file = this.files?.[0];

                if (!file) return;

                const description =
                    dropzoneCard.querySelector(".upload-dropzone-desc");

                const previousText = description?.textContent;

                try {
                    if (description) {
                        description.textContent = "جارٍ رفع الشاهد وحفظه...";
                    }

                    await handleSelectedFile(file, levelCode);

                } catch (error) {
                    console.error("File selection error:", error);

                    alert(
                        "تعذّر إكمال العملية: " +
                        (error.message || "خطأ غير معروف")
                    );

                } finally {
                    this.value = "";

                    if (description && previousText) {
                        description.textContent = previousText;
                    }
                }
            });

            grid.appendChild(dropzoneCard);
        }

        if (items.length === 0 && !canEdit) {
            grid.innerHTML = `
                <div class="empty-state-container" style="grid-column:1/-1">
                    <div class="empty-state-icon">📂</div>
                    <h4 class="empty-state-title">لا توجد شواهد مرفوعة</h4>
                    <p class="empty-state-text">
                        لم يتم توثيق أي شواهد لهذا المستوى المختار حالياً.
                    </p>
                </div>
            `;

            return;
        }

        items.forEach(item => {
            const card = document.createElement("div");
            card.className = "evidence-card-box";

            let mediaPreviewHtml = "";

            if (item.type === "image") {
                mediaPreviewHtml = `
                    <div class="media-preview-container">
                        <img
                            src="${item.fileData}"
                            alt="${escapeHtml(item.title)}"
                            loading="lazy"
                        />
                    </div>
                `;

            } else if (item.type === "video") {
                mediaPreviewHtml = `
                    <div class="media-preview-container">
                        <video src="${item.fileData}" controls></video>
                    </div>
                `;

            } else {
                mediaPreviewHtml = `
                    <div class="doc-file-icon-box">
                        📄
                        <span style="font-size:.85rem;margin-top:.4rem">
                            مستند
                        </span>
                    </div>
                `;
            }

            card.innerHTML = `
                <div>
                    ${mediaPreviewHtml}

                    <h4 class="ev-card-title">
                        ${escapeHtml(item.title)}
                    </h4>

                    ${item.comment ? `
                        <div class="ev-card-comment">
                            💬 ${escapeHtml(item.comment)}
                        </div>
                    ` : ""}
                </div>

                <div class="ev-card-actions"
                    style="display:flex;justify-content:space-between;align-items:center;margin-top:1rem;gap:6px">

                    <a
                        href="${item.fileData}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="ev-action-btn"
                    >
                        فتح / معاينة الشاهد
                    </a>

                    ${canEdit ? `
                        <div style="display:flex;gap:6px">
                            <button
                                class="ev-edit-icon-btn"
                                data-edit-id="${item.id}"
                                title="تعديل الشاهد"
                            >
                                تعديل
                            </button>

                            <button
                                class="ev-edit-icon-btn"
                                data-delete-id="${item.id}"
                                title="حذف الشاهد"
                                style="background:rgba(220,53,69,.2);border-color:rgba(220,53,69,.4);color:#ff6b6b"
                            >
                                حذف
                            </button>
                        </div>
                    ` : ""}
                </div>
            `;

            const editButton = card.querySelector("[data-edit-id]");

            if (editButton) {
                editButton.addEventListener("click", function () {
                    openEditModalDirect(levelCode, item.id);
                });
            }

const deleteButton = card.querySelector("[data-delete-id]");

if (deleteButton) {
    deleteButton.addEventListener("click", async function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (typeof window.confirmDeleteEvidence !== "function") {
            alert("دالة الحذف غير متاحة. أعيدي تحميل الصفحة.");
            return;
        }

        deleteButton.disabled = true;

        try {
            await window.confirmDeleteEvidence(levelCode, item.id);
        } finally {
            deleteButton.disabled = false;
        }
    });
}

            grid.appendChild(card);
        });
    }


    // حماية النصوص المعروضة في HTML
    function escapeHtml(value) {
        return String(value ?? "").replace(/[&<>"']/g, character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        })[character]);
    }


    // ==========================================
    // رفع الملف وحفظ بياناته في Supabase
    // ==========================================
    async function handleSelectedFile(file, levelCode) {
        if (!canManageLevel(levelCode)) {
            alert("ليس لديكِ صلاحية رفع شاهد لهذا المستوى.");
            return;
        }

        if (!file) {
            alert("اختاري ملفًا أولًا.");
            return;
        }

        const allowedExtensions = {
            pdf: {
                type: "doc",
                mime: "application/pdf"
            },
            doc: {
                type: "doc",
                mime: "application/msword"
            },
            docx: {
                type: "doc",
                mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            },
            jpg: {
                type: "image",
                mime: "image/jpeg"
            },
            jpeg: {
                type: "image",
                mime: "image/jpeg"
            },
            png: {
                type: "image",
                mime: "image/png"
            },
            mp4: {
                type: "video",
                mime: "video/mp4"
            },
            mov: {
                type: "video",
                mime: "video/quicktime"
            }
        };

        const extension = file.name.split(".").pop().toLowerCase();
        const fileInfo = allowedExtensions[extension];

        if (!fileInfo) {
            alert("نوع الملف غير مدعوم. الأنواع المسموحة: PDF وDOC وDOCX والصور JPG وPNG والفيديو MP4 وMOV.");
            return;
        }

        if (file.size === 0) {
            alert("الملف فارغ، اختاري ملفًا آخر.");
            return;
        }

        if (file.size > 15 * 1024 * 1024) {
            alert("حجم الملف يجب ألا يتجاوز 15 ميجابايت.");
            return;
        }

        // استخدام MIME المعروف للامتداد إذا كان المتصفح لا يحدده
const contentType = fileInfo.mime;
        // رفض الملفات التي لا يتوافق نوعها المعلن مع امتدادها
        const compatibleMimeTypes = {
            pdf: ["application/pdf"],
            doc: ["application/msword", "application/octet-stream"],
            docx: [
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "application/octet-stream"
            ],
            jpg: ["image/jpeg", "image/jpg", "application/octet-stream"],
            jpeg: ["image/jpeg", "image/jpg", "application/octet-stream"],
            png: ["image/png", "application/octet-stream"],
            mp4: ["video/mp4", "application/octet-stream"],
            mov: ["video/quicktime", "application/octet-stream"]
        };

        if (
            file.type &&
            !compatibleMimeTypes[extension].includes(file.type)
        ) {
            alert("نوع الملف لا يتوافق مع امتداده.");
            return;
        }

        try {
            const { data: userData, error: userError } =
                await supabaseClient.auth.getUser();

            if (userError) throw userError;

            if (!userData?.user) {
                alert("انتهت جلسة تسجيل الدخول. سجّلي الدخول مرة أخرى.");
                return;
            }

            // التحقق من صلاحية الحساب مرة أخرى قبل الرفع
            if (!canManageLevel(levelCode)) {
                alert("ليس لديكِ صلاحية رفع شاهد لهذا المستوى.");
                return;
            }

            const domainKey = getDomainKeyForLevel(levelCode);

            if (!domainKey) {
                throw new Error("تعذر تحديد المجال المرتبط بهذا المستوى.");
            }

            const fileName = `${crypto.randomUUID()}.${extension}`;
            const filePath = `${domainKey}/${levelCode}/${fileName}`;

            // رفع الملف إلى Storage
            const { error: uploadError } = await supabaseClient
                .storage
                .from("evidence-files")
                .upload(filePath, file, {
                    contentType,
                    upsert: false
                });

            if (uploadError) throw uploadError;

            // حفظ بيانات الشاهد في قاعدة البيانات
            const { error: insertError } = await supabaseClient
                .from("evidence")
                .insert({
                    level_code: levelCode,
                    title: file.name.replace(/\.[^.]+$/, ""),
                    type: fileInfo.type,
                    comment: "",
                    file_path: filePath,
                    file_name: file.name,
                    mime_type: contentType,
                    file_size: file.size,
                    created_by: userData.user.id
                });

            if (insertError) {
                // محاولة إزالة الملف إذا فشل حفظ سجل قاعدة البيانات
                const { error: cleanupError } = await supabaseClient
                    .storage
                    .from("evidence-files")
                    .remove([filePath]);

                if (cleanupError) {
                    console.error("Uploaded file cleanup error:", cleanupError);
                }

                throw insertError;
            }

            await renderEvidenceFiltersAndGrid(levelCode);

            alert("تم رفع الشاهد وحفظه بنجاح.");

        } catch (error) {
            console.error("Upload error details:", error);

            alert(
                "فشل رفع الشاهد وحفظه:\n" +
                (error?.message || "خطأ غير معروف")
            );
        }
    }


    // ==========================================
    // تعديل الشاهد
    // ==========================================
    window.openEditModalDirect = async function (levelCode, itemId) {
        if (!canManageLevel(levelCode)) {
            alert("ليس لديكِ صلاحية تعديل هذا الشاهد.");
            return;
        }

        let list;

        try {
            list = await getEvidenceData(levelCode);

        } catch (error) {
            console.error("Error loading evidence:", error);
            alert("تعذر تحميل بيانات الشاهد.");
            return;
        }

        const item = list.find(evidence => String(evidence.id) === String(itemId));

        if (!item) {
            alert("لم يتم العثور على الشاهد.");
            return;
        }

        const titleField = document.getElementById("evTitleField");
        const typeField = document.getElementById("evTypeField");
        const commentField = document.getElementById("evCommentField");
        const idField = document.getElementById("formEditingEvidenceId");
        const modalTitle = document.getElementById("formModalTitle");

        if (idField) idField.value = item.id;
        if (titleField) titleField.value = item.title;
        if (typeField) typeField.value = item.type;
        if (commentField) commentField.value = item.comment || "";

        if (modalTitle) {
            modalTitle.textContent = `تعديل وتسمية الشاهد (${levelCode})`;
        }

        const modal = document.getElementById("evidenceFormModal");

        if (modal) {
            modal.classList.add("active");
        }
    };


    // ==========================================
    // حذف الشاهد من Supabase
    // ==========================================
    window.confirmDeleteEvidence = async function (levelCode, itemId) {
        if (!canManageLevel(levelCode)) {
            alert("ليس لديكِ صلاحية حذف هذا الشاهد.");
            return;
        }

        const confirmed = confirm(
            "هل أنتِ متأكدة من حذف هذا الشاهد نهائياً؟\n\nاضغطي موافق للحذف، أو إلغاء للتراجع."
        );

        if (!confirmed) return;

        try {
            const { data: item, error: fetchError } = await supabaseClient
                .from("evidence")
                .select("id, file_path")
                .eq("id", itemId)
                .eq("level_code", levelCode)
                .single();

            if (fetchError) throw fetchError;

            const { error: deleteError } = await supabaseClient
                .from("evidence")
                .delete()
                .eq("id", itemId)
                .eq("level_code", levelCode);

            if (deleteError) throw deleteError;

            if (item.file_path) {
                const { error: storageError } = await supabaseClient
                    .storage
                    .from("evidence-files")
                    .remove([item.file_path]);

                if (storageError) {
                    console.error("Storage deletion error:", storageError);

                    alert(
                        "حُذف سجل الشاهد من قاعدة البيانات، لكن تعذر حذف الملف من Storage."
                    );
                }
            }

            await renderEvidenceFiltersAndGrid(levelCode);

        } catch (error) {
            console.error("Error deleting evidence:", error);
            alert(
                "تعذّر حذف الشاهد: " +
                (error?.message || "تحققي من الصلاحيات والاتصال.")
            );
        }
    };


    // ==========================================
    // جلب الشواهد من قاعدة البيانات
    // ==========================================
    async function getEvidenceData(levelCode) {
        const { data, error } = await supabaseClient
            .from("evidence")
            .select("id, level_code, title, type, comment, file_path, file_name, created_at")
            .eq("level_code", levelCode)
            .order("created_at", { ascending: false });

        if (error) throw error;

        return (data || []).map(item => {
            const { data: urlData } = supabaseClient
                .storage
                .from("evidence-files")
                .getPublicUrl(item.file_path);

            return {
                ...item,
                fileData: urlData.publicUrl
            };
        });
    }


    function saveEvidenceData(code, list) {
        localStorage.setItem(`ev_data_${code}`, JSON.stringify(list));
    }


    window.openAddEvidenceModalForCode = function (code) {
        if (!canManageLevel(code)) {
            alert("ليس لديكِ صلاحية رفع شاهد لهذا المستوى.");
            return;
        }

        location.href = `evidence.html?level=${encodeURIComponent(code)}`;
    };


    // ==========================================
    // حفظ تعديل بيانات الشاهد
    // ==========================================
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeEvidenceFormModal();
        }
    });

    const evidenceForm = document.getElementById("appEvidenceForm");

    if (evidenceForm) {
        evidenceForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const code = globalCurrentLevelCode;
            const editId =
                document.getElementById("formEditingEvidenceId")?.value;

            const title =
                document.getElementById("evTitleField")?.value.trim();

            const type =
                document.getElementById("evTypeField")?.value;

            const comment =
                document.getElementById("evCommentField")?.value.trim();

            if (!editId || !code) return;

            if (!canManageLevel(code)) {
                alert("ليس لديكِ صلاحية تعديل هذا الشاهد.");
                return;
            }

            if (!["image", "video", "doc"].includes(type)) {
                alert("نوع الشاهد غير صحيح.");
                return;
            }

            try {
                const { error } = await supabaseClient
                    .from("evidence")
                    .update({
                        title,
                        type,
                        comment
                    })
                    .eq("id", editId)
                    .eq("level_code", code);

                if (error) throw error;

                closeEvidenceFormModal();

                await renderEvidenceFiltersAndGrid(code);

            } catch (error) {
                console.error("Error updating evidence:", error);

                alert(
                    "تعذّر حفظ التعديلات: " +
                    (error?.message || "تحققي من الاتصال والصلاحيات.")
                );
            }
        });
    }


    // ==========================================
    // تسجيل الدخول والخروج
    // ==========================================
    const triggerBtn = document.getElementById("authModalTriggerBtn");

    if (triggerBtn) {
        triggerBtn.addEventListener("click", async function () {
            if (activeUserRole !== "guest") {
                const { error } = await supabaseClient.auth.signOut();

                if (error) {
                    alert("تعذر تسجيل الخروج. حاولي مرة أخرى.");
                    console.error(error);
                    return;
                }

                activeUserRole = "guest";
                localStorage.removeItem("active_user_role");

                location.reload();

            } else {
                const loginModal = document.getElementById("loginAuthModal");

                if (loginModal) {
                    loginModal.classList.add("active");
                }
            }
        });
    }


    const loginForm = document.getElementById("appLoginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const username =
                document.getElementById("usernameField").value.trim();

            const password =
                document.getElementById("passCodeField").value;

            const errorMessage =
                document.getElementById("loginErrorMessage");

            const usernameEmails = {
                admin1: "admin1@archive.example.com",
                admin2: "admin2@archive.example.com",
                admin3: "admin3@archive.example.com",
                admin4: "admin4@archive.example.com"
            };

            const email = usernameEmails[username.toLowerCase()];

            if (errorMessage) {
                errorMessage.hidden = true;
                errorMessage.textContent = "";
            }

            if (!email) {
                if (errorMessage) {
                    errorMessage.textContent = "اسم المستخدم غير صحيح.";
                    errorMessage.hidden = false;
                }

                return;
            }

            const submitButton = loginForm.querySelector(
                'button[type="submit"]'
            );

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "جارٍ تسجيل الدخول...";
            }

            try {
                const { data, error } =
                    await supabaseClient.auth.signInWithPassword({
                        email,
                        password
                    });

                if (error) throw error;

                const { data: profile, error: profileError } =
                    await supabaseClient
                        .from("admin_profiles")
                        .select("domain_key, display_name")
                        .eq("user_id", data.user.id)
                        .maybeSingle();

                if (profileError) throw profileError;

                if (!profile) {
                    await supabaseClient.auth.signOut();
                    throw new Error("الحساب غير مرتبط بقسم في النظام.");
                }

                activeUserRole = profile.domain_key;

                localStorage.setItem(
                    "active_user_role",
                    profile.domain_key
                );

                alert("تم تسجيل الدخول بنجاح.");

                closeLoginAuthModal();
                location.reload();

            } catch (error) {
                console.error("Login error:", error);

                if (errorMessage) {
                    errorMessage.textContent =
                        error.message === "الحساب غير مرتبط بقسم في النظام."
                            ? error.message
                            : "تعذر تسجيل الدخول. تأكدي من اسم المستخدم وكلمة المرور.";

                    errorMessage.hidden = false;
                }

            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = "تسجيل الدخول";
                }
            }
        });
    }


    // ==========================================
    // تحديث واجهة تسجيل الدخول
    // ==========================================
    function updateAuthUI() {
        const roleText = document.getElementById("userRoleTitleText");
        const button = document.getElementById("authModalTriggerBtn");

        if (!roleText || !button) return;

        if (activeUserRole !== "guest") {
            const names = {
                domain1: "مسؤولة الإدارة المدرسية",
                domain2: "مسؤولة التعليم والتعلم",
                domain3: "مسؤولة نواتج التعلم",
                domain4: "مسؤولة البيئة المدرسية"
            };

            roleText.textContent =
                `حساب: ${names[activeUserRole] || "مسؤولة"}`;

            button.textContent = "تسجيل الخروج";

        } else {
            roleText.textContent = "وضع التصفح العام (زائر)";
            button.textContent = "تسجيل دخول المسؤولة 🔑";
        }
    }


    window.closeLoginAuthModal = function () {
        const modal = document.getElementById("loginAuthModal");

        if (modal) {
            modal.classList.remove("active");
        }
    };


    window.closeEvidenceFormModal = function () {
        const modal = document.getElementById("evidenceFormModal");

        if (modal) {
            modal.classList.remove("active");
        }
    };

});


// ==========================================
// عدادات الإحصائيات والمؤهلات
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    const allCounters = document.querySelectorAll(".stat-number, .qual-num");
    let hasAnimated = false;

    function animateAllCounters() {
        allCounters.forEach(counter => {
            const target = Number(counter.getAttribute("data-target"));

            if (!Number.isFinite(target)) return;

            const duration = 3000;
            const stepTime = 30;
            const totalSteps = duration / stepTime;
            const increment = target / totalSteps;

            let current = 0;

            const timer = setInterval(() => {
                current += increment;

                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.ceil(current);
                }
            }, stepTime);
        });
    }

    const statsSection =
        document.querySelector(".stats-grid") ||
        document.querySelector(".qualifications-box");

    if (statsSection) {
        window.addEventListener("scroll", function () {
            const sectionPos = statsSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.2;

            if (sectionPos < screenPos && !hasAnimated) {
                hasAnimated = true;
                animateAllCounters();
            }
        });
    }
});