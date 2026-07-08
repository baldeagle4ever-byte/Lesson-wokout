document.addEventListener("DOMContentLoaded", function() {
    // 1. معالجة وحفظ اسم المستخدم عبر الذاكرة المحلية LocalStorage
    let userName = localStorage.getItem("academy_user_name");
    const welcomeDiv = document.querySelector(".welcome-text");

    // إذا لم يكن الاسم مسجلاً من قبل، نطلبه عبر نافذة أنيقة
    if (!userName) {
        // ننتظر قليلاً بعد تحميل الصفحة لإظهار الطلب بمرونة
        setTimeout(() => {
            let promptedName = prompt("مرحباً بك في أكاديمية النسر! يرجى إدخال اسمك الكريم لتخصيص تجربتك التعليمية:");
            if (promptedName && promptedName.trim() !== "") {
                localStorage.setItem("academy_user_name", promptedName.trim());
                userName = promptedName.trim();
                updateWelcomeMessage(userName, welcomeDiv);
            } else {
                // اسم افتراضي في حال تخطي الطالب النافذة
                updateWelcomeMessage("أيها الأستاذ الكريم", welcomeDiv);
            }
        }, 800);
    } else {
        updateWelcomeMessage(userName, welcomeDiv);
    }
});

// 2. دالة قراءة بيانات المتصفح وصياغة الترحيب الذكي
function updateWelcomeMessage(name, element) {
    if (!element) return;

    // استخراج معلومات المتصفح والنظام المبسطة
    const userAgent = navigator.userAgent;
    let browserName = "المتصفح الخاص بك";
    let osName = "نظامك الحالي";

    // تحديد نظام التشغيل بخفة
    if (userAgent.indexOf("Win") !== -1) osName = "نظام Windows";
    if (userAgent.indexOf("Mac") !== -1) osName = "نظام MacOS";
    if (userAgent.indexOf("X11") !== -1) osName = "نظام UNIX";
    if (userAgent.indexOf("Linux") !== -1) osName = "نظام Linux";
    if (userAgent.indexOf("Android") !== -1) osName = "هاتف Android";
    if (userAgent.indexOf("iPhone") !== -1 || userAgent.indexOf("iPad") !== -1) osName = "جهاز iOS";

    // تحديد المتصفح بخفة
    if (userAgent.indexOf("Chrome") !== -1) browserName = "Google Chrome";
    else if (userAgent.indexOf("Safari") !== -1) browserName = "Safari";
    else if (userAgent.indexOf("Firefox") !== -1) browserName = "Mozilla Firefox";
    else if (userAgent.indexOf("Edge") !== -1) browserName = "Microsoft Edge";

    // صياغة نص الترحيب الاحترافي والديناميكي
    element.innerHTML = `مرحباً بك، <strong>${name}</strong> في منصة الاختبارات والمراجعات الذكية المتقدمة. 
    <br><span style="font-size: 11.5px; color: #a4b0be; font-weight: normal;">
    ⚙️ متصل الآن عبر <span style="color:#ff9f43">${browserName}</span> على <span style="color:#ff9f43">${osName}</span>
    </span>`;
      }
