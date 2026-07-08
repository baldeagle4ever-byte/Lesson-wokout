document.addEventListener("DOMContentLoaded", function() {
    // 1. تشغيل عدّاد الزوار الفوري باستخدام خدمة CountAPI المجانية المستقرة
    // قمنا بإنشاء مفتاح خاص بـ "أكاديمية النسر" لتسجيل الزيارات بدقة
    const namespace = "eagle_academy_2026";
    const key = "main_index";
    
    fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
        .then(response => response.json())
        .then(data => {
            const countElement = document.getElementById("visitor-count");
            if (countElement && data.value) {
                // عرض عدد الزوار مع تنسيق الأرقام بخفة
                countElement.innerText = data.value.toLocaleString() + " زائر";
            }
        })
        .catch(err => {
            // في حال حدوث أي حجب أو بطء في خادم الإحصاء، يظهر رقم تقديري مرن
            const countElement = document.getElementById("visitor-count");
            if (countElement) countElement.innerText = "متصل الآن (نشط)";
        });

    // 2. معالجة اسم المستخدم باستخدام نوافذ SweetAlert2 الاحترافية
    let userName = localStorage.getItem("academy_user_name");
    const welcomeDiv = document.querySelector(".welcome-text");

    if (!userName) {
        setTimeout(() => {
            // نافذة منبثقة راقية تطلب الاسم
            Swal.fire({
                title: 'مرحباً بك في أكاديمية النسر',
                text: 'يرجى كتابة اسمك الكريم لتخصيص لوحة التحكم والامتحانات باسمك:',
                input: 'text',
                inputPlaceholder: 'اكتب اسمك هنا...',
                confirmButtonText: 'تأكيد الدخول 🚀',
                confirmButtonColor: '#ff9f43',
                background: '#243441',
                color: '#ffffff',
                allowOutsideClick: false,
                inputValidator: (value) => {
                    if (!value || value.trim() === "") {
                        return 'الاسم مطلوب لتخصيص التجربة التعليمية!';
                    }
                }
            }).then((result) => {
                if (result.value) {
                    let finalName = result.value.trim();
                    localStorage.setItem("academy_user_name", finalName);
                    updateWelcomeMessage(finalName, welcomeDiv);
                    
                    // تحية نجاح ترحيبية صغيرة وثانوية تظهر بخفة
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'success',
                        title: `أهلاً بك معنا، أستاذ ${finalName}`,
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#2c3e50',
                        color: '#fff'
                    });
                }
            });
        }, 600);
    } else {
        updateWelcomeMessage(userName, welcomeDiv);
    }
});

// دالة قراءة بيانات المتصفح والنظام وصياغة الترحيب الديناميكي
function updateWelcomeMessage(name, element) {
    if (!element) return;

    const userAgent = navigator.userAgent;
    let browserName = "المتصفح الخاص بك";
    let osName = "نظامك الحالي";

    if (userAgent.indexOf("Win") !== -1) osName = "نظام Windows";
    if (userAgent.indexOf("Mac") !== -1) osName = "نظام MacOS";
    if (userAgent.indexOf("Linux") !== -1) osName = "نظام Linux";
    if (userAgent.indexOf("Android") !== -1) osName = "هاتف Android";
    if (userAgent.indexOf("iPhone") !== -1 || userAgent.indexOf("iPad") !== -1) osName = "جهاز iOS";

    if (userAgent.indexOf("Chrome") !== -1) browserName = "Google Chrome";
    else if (userAgent.indexOf("Safari") !== -1) browserName = "Safari";
    else if (userAgent.indexOf("Firefox") !== -1) browserName = "Mozilla Firefox";
    else if (userAgent.indexOf("Edge") !== -1) browserName = "Microsoft Edge";

    element.innerHTML = `مرحباً بك، <strong style="color: #ffad33;">${name}</strong> في منصة الاختبارات والمراجعات الذكية المتقدمة. 
    <br><span style="font-size: 11.5px; color: #a4b0be; font-weight: normal; display: inline-block; margin-top: 5px;">
    <i class="bi bi-cpu-fill"></i> متصل الآن عبر <span style="color:#34ace0">${browserName}</span> على <span style="color:#34ace0">${osName}</span>
    </span>`;
}
