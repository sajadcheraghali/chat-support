document.addEventListener('DOMContentLoaded', function () {
    const chatButton = document.getElementById('chatButton');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    // const sendButton = document.getElementById('sendButton');
    // const messageInput = document.getElementById('messageInput');
    const chatBody = document.getElementById('chatBody');
    const closebutton = document.getElementById('closebutton');


    // باز کردن پنجره چت
    chatButton.addEventListener('click', function () {
        chatWindow.style.display = 'flex';
        chatButton.style.display = 'none';
        messageInput.focus();
        closebutton.classList.remove("hidden");
    });

    // بستن پنجره چت
    closeChat.addEventListener('click', function () {
        chatWindow.style.display = 'none';
        chatButton.style.display = 'block';
        closebutton.classList.add("hidden");
    });


    // Auto scroll to bottom
    const chatMessages = document.querySelector('.chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Handle send message
    const messageInput = document.querySelector('.message-input input');
    const sendButton = document.querySelector('.message-input button:last-child');

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {  // فقط وقتی پیام غیرخالی است
            const messageElement = document.createElement('div');
            messageElement.className = 'message sent';
            messageElement.innerHTML = `
                    <div class="message-bubble">
                        <p>${message}</p>
                    </div>
                    <span class="message-time">Just now</span>
                `;

            document.querySelector('.chat-messages').appendChild(messageElement);
            messageInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // شبیه‌سازی پاسخ پس از 1 ثانیه
            setTimeout(function () {
                const replyDiv = document.createElement('div');
                replyDiv.className = 'message received';
                replyDiv.innerHTML = `
                        <div class="message-bubble">
                            <p>پیام شما دریافت شد. پشتیبان به زودی پاسخ می‌دهد.</p>
                        </div>
                        <span class="message-time">Just now</span>
                    `;
                chatMessages.appendChild(replyDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }

    sendButton.addEventListener('click', sendMessage);

    messageInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Simulate typing indicator
    setInterval(() => {
        const lastMessage = document.querySelector('.message.received:last-child');
        if (lastMessage && lastMessage.querySelector('.status-indicator')) {
            lastMessage.querySelector('.status-indicator').classList.toggle('offline');
        }
    }, 3000);



    // ارسال پیام
    // function sendMessage() {
    //     const messageText = messageInput.value.trim();
    //     if (messageText === '') return;

    //     // ایجاد عنصر پیام ارسالی
    //     const messageDiv = document.createElement('div');
    //     messageDiv.className = 'message sent';
    //     messageDiv.innerHTML = `<p>${messageText}</p>`;
    //     chatBody.appendChild(messageDiv);

    //     // پاک کردن فیلد ورودی
    //     messageInput.value = '';

    //     // اسکرول به پایین
    // chatBody.scrollTop = chatBody.scrollHeight;

    //     // شبیه‌سازی پاسخ پس از 1 ثانیه
    //     setTimeout(function () {
    //         const replyDiv = document.createElement('div');
    //         replyDiv.className = 'message received';
    //         replyDiv.innerHTML = '<p>پیام شما دریافت شد. پشتیبان به زودی پاسخ می‌دهد.</p>';
    //         chatBody.appendChild(replyDiv);
    //         chatBody.scrollTop = chatBody.scrollHeight;
    //     }, 1000);
    // }

    // // ارسال با کلیک دکمه
    // sendButton.addEventListener('click', sendMessage);

    // // ارسال با کلید Enter
    // messageInput.addEventListener('keypress', function (e) {
    //     if (e.key === 'Enter') {
    //         sendMessage();
    //     }
    // });

    // بستن پنجره با کلیک خارج از آن (اختیاری)
    document.addEventListener('click', function (event) {
        if (!chatWindow.contains(event.target) && !chatButton.contains(event.target) && chatWindow.style.display === 'flex') {
            chatWindow.style.display = 'none';
            chatButton.style.display = 'block';
            closebutton.classList.add("hidden");
        }
    });
});



// داده‌های FAQ به صورت درختی
const faqData = {
    accounting: {
        title: "حسابداری",
        questions: [
            {
                id: 1,
                question: "برای دریافت فاکتور رسمی چه اطلاعاتی نیاز خواهد بود؟",
                answer: `
                    <h4>برای دریافت فایل فاکتور رسمی باید موارد زیر را برای تیم ما ارسال کنید:</h4>
                    
                    <h5>برای اشخاص حقیقی:</h5>
                    <ul>
                        <li>نام کامل شرکت</li>
                        <li>کدملی</li>
                        <li>آدرس کامل: استان- شهر- کدپستی</li>
                        <li>تلفن ثابت</li>
                        <li>موبایل</li>
                        <li>ایمیل و آدرس سایت</li>
                        <li>نوع پکیج</li>
                    </ul>
                    
                    <h5>برای اشخاص حقوقی:</h5>
                    <ul>
                        <li>نام کامل شرکت</li>
                        <li>شناسه ملی</li>
                        <li>کد اقتصادی</li>
                        <li>شماره ثبت</li>
                        <li>آدرس کامل: استان- شهر- کدپستی</li>
                        <li>تلفن ثابت</li>
                        <li>موبایل</li>
                        <li>ایمیل و آدرس سایت</li>
                        <li>نوع پکیج</li>
                    </ul>
                `
            },
            {
                id: 2,
                question: "نحوه واریز و خرید رایچت به چند روش انجام می‌شود؟",
                answer: `
                    <p>شما می‌توانید از طریق روش‌های زیر اقدام به خرید رایچت کنید:</p>
                    <ul>
                        <li>درگاه پرداخت آنلاین</li>
                        <li>کارت به کارت</li>
                        <li>واریز به شماره حساب</li>
                        <li>پرداخت از طریق کیف پول‌های الکترونیکی</li>
                    </ul>
                    <p>شماره حساب: <strong>8888-8888-5664-4004</strong></p>
                `
            },
            {
                id: 3,
                question: "امکان ارتقا پکیج بعد از خرید وجود دارد؟",
                answer: `
                    <p>بله، امکان ارتقا پکیج بعد از خرید وجود دارد. برای این کار:</p>
                    <ol>
                        <li>وارد پنل کاربری خود شوید</li>
                        <li>به بخش "ارتقا پکیج" مراجعه کنید</li>
                        <li>پکیج مورد نظر خود را انتخاب کنید</li>
                        <li>مابه‌تفاوت قیمت را پرداخت نمایید</li>
                    </ol>
                    <p>پس از پرداخت، پکیج شما به صورت خودکار ارتقا خواهد یافت.</p>
                `
            }
        ]
    },
    general: {
        title: "عمومی",
        questions: [
            {
                id: 4,
                question: "چگونه تنظیمات عمومی را تغییر دهم؟",
                answer: `
                    <p>برای تغییر تنظیمات عمومی:</p>
                    <ol>
                        <li>وارد پنل کاربری شوید</li>
                        <li>به بخش "تنظیمات" مراجعه کنید</li>
                        <li>تغییرات مورد نظر را اعمال کنید</li>
                        <li>در انتها روی دکمه "ذخیره تغییرات" کلیک کنید</li>
                    </ol>
                `
            }
        ]
    },
    installation: {
        title: "نصب و راه‌اندازی",
        questions: [
            {
                id: 5,
                question: "چگونه رایچت را نصب کنم؟",
                answer: `
                    <p>مراحل نصب رایچت:</p>
                    <ol>
                        <li>از سایت رسمی raychat.io نسخه مناسب را دانلود کنید</li>
                        <li>فایل نصبی را اجرا کنید</li>
                        <li>مراحل نصب را طی کنید</li>
                        <li>پس از نصب، نرم‌افزار را اجرا و با حساب کاربری خود وارد شوید</li>
                    </ol>
                    <p>در صورت بروز مشکل، با پشتیبانی تماس بگیرید.</p>
                `
            }
        ]
    },
    solutions: {
        title: "راه حل‌های رایچت",
        questions: [
            {
                id: 6,
                question: "رایچت چگونه به بهبود پشتیبانی کمک می‌کند؟",
                answer: `
                    <p>رایچت با ارائه امکانات زیر به بهبود پشتیبانی کمک می‌کند:</p>
                    <ul>
                        <li>چت آنلاین با مشتریان</li>
                        <li>سیستم تیکتینگ پیشرفته</li>
                        <li>پایگاه دانش هوشمند</li>
                        <li>آنالیز و گزارش‌گیری</li>
                        <li>اتوماسیون پاسخ‌دهی</li>
                    </ul>
                `
            }
        ]
    },
    ai: {
        title: "چت بات هوش مصنوعی",
        questions: [
            {
                id: 7,
                question: "چت بات هوش مصنوعی چه قابلیت‌هایی دارد؟",
                answer: `
                    <p>چت بات هوش مصنوعی رایچت دارای قابلیت‌های زیر است:</p>
                    <ul>
                        <li>پاسخ‌دهی خودکار به سوالات متداول</li>
                        <li>یادگیری از مکالمات گذشته</li>
                        <li>پشتیبانی 24 ساعته</li>
                        <li>یکپارچه‌سازی با سیستم‌های موجود</li>
                        <li>پشتیبانی از چندین زبان</li>
                    </ul>
                `
            }
        ]
    }
};

// متغیرهای مربوط به FAQ
let currentCategory = null;
let currentQuestion = null;
let levelHistory = [];

// عناصر DOM مربوط به FAQ
const faqPanel = document.getElementById('faqPanel');
const openFaqFromChat = document.getElementById('openFaqFromChat');
const faqCloseBtn = document.getElementById('faqCloseBtn');
const faqBackBtn = document.getElementById('faqBackBtn');
const faqPanelTitle = document.getElementById('faqPanelTitle');
const faqLevel1 = document.getElementById('faqLevel1');
const faqLevel2 = document.getElementById('faqLevel2');
const faqLevel3 = document.getElementById('faqLevel3');
const questionsList = document.getElementById('questionsList');
const answerContent = document.getElementById('answerContent');

// باز کردن پنل FAQ از چت
openFaqFromChat.addEventListener('click', function () {
    openFaqPanel();
    resetToLevel1();
});

// بستن پنل FAQ
faqCloseBtn.addEventListener('click', closeFaqPanel);

// دکمه بازگشت
faqBackBtn.addEventListener('click', goBack);

// باز کردن پنل FAQ
function openFaqPanel() {
    faqPanel.classList.add('active');
}

// بستن پنل FAQ
function closeFaqPanel() {
    faqPanel.classList.remove('active');
    setTimeout(resetToLevel1, 400);
}

// بازگشت به سطح قبلی
function goBack() {
    if (levelHistory.length > 0) {
        const prevLevel = levelHistory.pop();
        showLevel(prevLevel.level, prevLevel.category, prevLevel.question);
    } else {
        resetToLevel1();
    }
}

// نمایش سطح مشخص شده
function showLevel(level, category = null, question = null) {
    // مخفی کردن همه سطوح
    [faqLevel1, faqLevel2, faqLevel3].forEach(lvl => lvl.classList.remove('active'));

    // نمایش دکمه بازگشت
    faqBackBtn.style.display = level === 1 ? 'none' : 'flex';

    if (level === 1) {
        faqLevel1.classList.add('active');
        faqPanelTitle.textContent = "سوالات متداول";
        currentCategory = null;
        currentQuestion = null;
    }
    else if (level === 2 && category) {
        faqLevel2.classList.add('active');
        faqPanelTitle.textContent = faqData[category].title;
        currentCategory = category;
        loadQuestions(category);
    }
    else if (level === 3 && category && question) {
        faqLevel3.classList.add('active');
        faqPanelTitle.textContent = "پاسخ سوال";
        currentQuestion = question;
        loadAnswer(category, question);
    }
}

// بازنشانی به سطح اول
function resetToLevel1() {
    levelHistory = [];
    showLevel(1);
}

// بارگذاری سوالات یک دسته
function loadQuestions(category) {
    questionsList.innerHTML = '';
    const categoryData = faqData[category];

    categoryData.questions.forEach(item => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'faq-question-item';
        questionDiv.innerHTML = `
            <h5>${item.question}</h5>
            <p>برای مشاهده پاسخ کلیک کنید</p>
        `;

        questionDiv.addEventListener('click', function () {
            levelHistory.push({
                level: 2,
                category: currentCategory,
                question: null
            });
            showLevel(3, category, item.id);
        });

        questionsList.appendChild(questionDiv);
    });
}

// بارگذاری پاسخ یک سوال
function loadAnswer(category, questionId) {
    answerContent.innerHTML = '';
    const categoryData = faqData[category];
    const question = categoryData.questions.find(q => q.id === questionId);

    if (question) {
        answerContent.innerHTML = `
            <h4>${question.question}</h4>
            <div class="answer-text">${question.answer}</div>
            <button class="faq-chat-button" onclick="sendQuestionToChat('${category}', ${questionId})">
                <i class="fas fa-paper-plane"></i>
                <span>ارسال این سوال به چت</span>
            </button>
        `;
    }
}

// ارسال سوال به چت
function sendQuestionToChat(category, questionId) {
    const categoryData = faqData[category];
    const question = categoryData.questions.find(q => q.id === questionId);

    if (question) {
        // بستن پنل FAQ
        closeFaqPanel();

        // ارسال سوال به چت
        const questionDiv = document.createElement('div');
        questionDiv.className = 'message sent';
        questionDiv.innerHTML = `<p>${question.question}</p>`;
        chatBody.appendChild(questionDiv);

        // اسکرول به پایین
        chatBody.scrollTop = chatBody.scrollHeight;

        // شبیه‌سازی پاسخ
        setTimeout(function () {
            const replyDiv = document.createElement('div');
            replyDiv.className = 'message received';
            replyDiv.innerHTML = `<p>پاسخ: ${question.answer.replace(/<[^>]*>/g, '').substring(0, 100)}...</p>`;
            chatBody.appendChild(replyDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1000);
    }
}

// رویداد کلیک روی دسته‌بندی‌ها
document.querySelectorAll('.faq-category-item').forEach(item => {
    item.addEventListener('click', function () {
        const category = this.getAttribute('data-category');
        levelHistory.push({
            level: 1,
            category: null,
            question: null
        });
        showLevel(2, category);
    });
});

// بستن پنل FAQ با کلیک خارج از آن
document.addEventListener('click', function (event) {
    if (faqPanel.classList.contains('active') &&
        !faqPanel.contains(event.target) &&
        !openFaqFromChat.contains(event.target)) {
        closeFaqPanel();
    }
});

// همگام‌سازی با باز و بسته شدن پنجره چت
const originalChatButtonClick = chatButton.onclick;
chatButton.onclick = function () {
    originalChatButtonClick();
    // مخفی کردن دکمه FAQ اگر چت باز نیست
    if (chatWindow.style.display !== 'flex') {
        document.querySelector('.faq-chat-button-container').style.display = 'none';
    } else {
        document.querySelector('.faq-chat-button-container').style.display = 'block';
    }
};

const originalCloseChatClick = closeChat.onclick;
closeChat.onclick = function () {
    originalCloseChatClick();
    document.querySelector('.faq-chat-button-container').style.display = 'none';
};
