document.addEventListener('DOMContentLoaded', function () {
    const chatButton = document.getElementById('chatButton');
    const chatWindow = document.getElementById('chatWindow');
    const chatWindow2 = document.getElementById('chatWindow2');
    const faqPanel = document.getElementById('faqPanel');

    const closeChat = document.getElementById('closeChat');
    // const sendButton = document.getElementById('sendButton');
    // const messageInput = document.getElementById('messageInput');
    const chatBody = document.getElementById('chatBody');
    // const closebutton = document.getElementById('closebutton');


    // باز کردن پنجره چت
    chatButton.addEventListener('click', function () {
        chatWindow.style.display = 'flex';
        chatWindow2.style.display = 'none';
        faqPanel.style.display = 'flex';

        chatButton.style.display = 'none';
        messageInput.focus();
        // closebutton.classList.remove("hidden");
    });

    // بستن پنجره چت
    closeChat.addEventListener('click', function () {
        chatWindow2.style.display = 'none';
        // chatButton.style.display = 'block';
        faqPanel.style.display = 'flex';
        // closebutton.classList.add("hidden");
    });


    // Auto scroll to bottom
    const chatMessages = document.querySelector('.chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Handle send message
    const messageInput = document.querySelector('.message-input textarea');
    const sendButton = document.querySelector('.message-input button:last-child');

    //تغییر رنگ دکمه ارسال

    messageInput.addEventListener('input', () => {
  if (messageInput.value.trim() !== '') {
    sendButton.classList.add('active');
    sendButton.disabled = false;
  } else {
    sendButton.classList.remove('active');
    sendButton.disabled = true;
  }
});

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
                       <div class="message-actions">
                            <button class="like-btn">👍</button>
                           

                            <button class="dislike-btn">👎</button>
                            

                            <button class="copy-btn">📋</button>
                            
                        </div>
                        <span class="message-time">Just now</span>
                    `;
                chatMessages.appendChild(replyDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
            sendButton.classList.remove('active');
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



    // // بستن پنجره با کلیک خارج از آن (اختیاری)
    // document.addEventListener('click', function (event) {
    //     if (!chatWindow.contains(event.target) && !chatButton.contains(event.target) && chatWindow.style.display === 'flex') {
    //         chatWindow.style.display = 'none';
    //         chatButton.style.display = 'block';
    //         // closebutton.classList.add("hidden");
    //     }
    // });

const userInfoForm = document.getElementById('userInfoForm');
const saveUserInfoBtn = document.getElementById('saveUserInfo');
const lastNameInput = document.getElementById('userLastName');
const emailInput = document.getElementById('userEmail');

const messageInputWrapper = document.getElementById('messageInputWrapper');

// بررسی اینکه قبلاً اطلاعات ذخیره شده یا نه
const savedUser = JSON.parse(localStorage.getItem('chat_user'));

if (savedUser && savedUser.lastName && savedUser.email) {
    enableChat();
} else {
    disableChat();
}

saveUserInfoBtn.addEventListener('click', function () {
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();

    if (!lastName || !email) {
        alert('لطفاً نام خانوادگی و ایمیل را وارد کنید');
        return;
    }

    const userData = { lastName, email };
    // localStorage.setItem('chat_user', JSON.stringify(userData));

    enableChat();
});

function enableChat() {
    userInfoForm.style.display = 'none';
    messageInputWrapper.style.display= 'block'
    messageInputWrapper.style.display= 'flex'
    // messageInputWrapper.classList.remove('disabled');
    // messageInputWrapper.querySelector('#messageInput').disabled = false;
    // messageInputWrapper.querySelector('#sendButton').disabled = false;
}

function disableChat() {
    // userInfoForm.style.display = 'flex';
    // messageInputWrapper.classList.add('disabled');
    // messageInputWrapper.querySelector('#messageInput').disabled = true;
    // messageInputWrapper.querySelector('#sendButton').disabled = true;
     userInfoForm.style.display = 'flex';
    messageInputWrapper.style.display= 'none'
    
}

});


//ذخیره و لود لایک/دیسلایک از localStorage
function saveFeedback(id, data) {
    localStorage.setItem('feedback_' + id, JSON.stringify(data));
}

function loadFeedback(id, messageEl) {
    const saved = localStorage.getItem('feedback_' + id);
    if (!saved) return;

    const data = JSON.parse(saved);

    messageEl.querySelector('.like-count').innerText = data.likes;
    messageEl.querySelector('.dislike-count').innerText = data.dislikes;

    if (data.userAction === 'like') {
        messageEl.querySelector('.like-btn').classList.add('active');
    }

    if (data.userAction === 'dislike') {
        messageEl.querySelector('.dislike-btn').classList.add('active');
    }
}

//ارسال بازخورد به سرور (با fetch)
function sendFeedbackToServer(messageId, type) {
    fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            messageId,
            feedback: type
        })
    }).catch(() => {
        console.log('خطا در ارسال بازخورد به سرور');
    });
}

//هندل کامل Like / Dislike / Copy (همه با هم
chatBody.addEventListener('click', function (e) {
    const btn = e.target;
    const messageEl = btn.closest('.message');
    if (!messageEl) return;

    // 👍 Like
    if (btn.classList.contains('like-btn')) {
        const dislikeBtn = messageEl.querySelector('.dislike-btn');

        btn.classList.toggle('active');
        dislikeBtn.classList.remove('active');
    }

    // 👎 Dislike
    if (btn.classList.contains('dislike-btn')) {
        const likeBtn = messageEl.querySelector('.like-btn');

        btn.classList.toggle('active');
        likeBtn.classList.remove('active');
    }

    // 📋 Copy to clipboard
    if (btn.classList.contains('copy-btn')) {
        const text = messageEl.querySelector('.message-bubble p').innerText;

        navigator.clipboard.writeText(text).then(() => {
            btn.innerText = '✅ Copy to clipboard';
            setTimeout(() => btn.innerText = '📋', 1000);
        });
    }

    
// if (btn.classList.contains('copy-btn')) {
//     const text = messageEl.querySelector('.message-bubble p').innerText;

//     navigator.clipboard.writeText(text).then(() => {
//         btn.classList.add('copied');          // رنگ سبز شود
//         setTimeout(() => btn.classList.remove('copied'), 1000); // بعد ۱ ثانیه برگردد
//     });
// }
});

const attachBtn = document.getElementById('attachBtn');
const fileInput = document.getElementById('fileInput');

// با کلیک روی دکمه، پنجره انتخاب فایل باز شود
// attachBtn.addEventListener('click', () => {
//     fileInput.click();
// });

// وقتی فایل انتخاب شد
// fileInput.addEventListener('change', () => {
//     const files = fileInput.files;

//     if (files.length > 0) {
//         console.log(files);

//         // مثال: نمایش نام فایل‌ها در کنسول
//         for (let i = 0; i < files.length; i++) {
//             console.log('Selected file:', files[i].name);
//         }

//         // اینجا می‌تونی فایل‌ها رو به سرور بفرستی
//         // uploadFiles(files);
//     }
// });


//////////////////////////////////////////////////////////////////////////////
// داده‌های FAQ به صورت درختی
const faqData = {
    accounting: {
        title: "حسابداری",
        levels: [
            {
                id: 1,
                title: "امور مالی پایه",
                levels: [
                    {
                        id: 2,
                        title: "صورتحساب‌ها",
                        levels: [
                            {
                                id: 3,
                                title: "فاکتور رسمی",
                                levels: [
                                    {
                                        id: 4,
                                        title: "مدارک مورد نیاز",
                                        levels: [
                                            {
                                                id: 5,
                                                title: "اشخاص حقیقی و حقوقی",
                                                levels: [
                                                    {
                                                        id: 6,
                                                        title: "نکات تکمیلی",
                                                        questions: [
                                                            {
                                                                id: 1,
                                                                question: "برای دریافت فاکتور رسمی چه اطلاعاتی نیاز خواهد بود؟",
                                                                answer: `
                                <p>برای دریافت فاکتور رسمی، اطلاعات هویتی و اطلاعات تماس شما مورد نیاز است.</p>
                              `
                                                            },
                                                            {
                                                                id: 2,
                                                                question: "نحوه واریز و خرید رایچت به چند روش انجام می‌شود؟",
                                                                answer: `
                                <p>خرید رایچت از طریق درگاه آنلاین و روش‌های پرداخت دیگر امکان‌پذیر است.</p>
                              `
                                                            },
                                                            {
                                                                id: 3,
                                                                question: "امکان ارتقا پکیج بعد از خرید وجود دارد؟",
                                                                answer: `
                                <p>بله، ارتقا پکیج از داخل پنل کاربری انجام می‌شود.</p>
                              `
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
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


const faqCloseBtn = document.getElementById('faqCloseBtn');
// const chatoOpenButton = document.getElementById('chat-open-button');
const faqFooter = document.getElementById('faq-footer');


faqFooter.addEventListener('click' , function () {
    chatWindow2.style.display = "block"
    faqPanel.style.display = "none"
})


// باز کردن پنل FAQ از چت
openFaqFromChat.addEventListener('click', function () {
    openFaqPanel();
    resetToLevel1();
});

// بستن پنل FAQ
faqCloseBtn.addEventListener('click', closeFaqPanel);

// // // دکمه بازگشت
// // faqBackBtn.addEventListener('click', goBack);

// باز کردن پنل FAQ
function openFaqPanel() {
    faqPanel.classList.add('active');
}

// بستن پنل FAQ
function closeFaqPanel() {
    faqPanel.classList.remove('active');
    chatWindow.style.display = 'none'
    chatButton.style.display = 'block'
    // faqPanel.style.display='none'
    faqSearchInput.value = "";   // پاک شدن جستجو
    setTimeout(resetToLevel1, 400);
   
    // chatWindow.classList.add('open-chat')


}


// بازنشانی به سطح اول
function resetToLevel1() {
    levelHistory = [];
    showLevel1(faqData, 1);
}

const faqPanel = document.getElementById("faqPanel");
const faqTitle = document.getElementById("faqPanelTitle");
const backBtn = document.getElementById("faqBackBtn");

let levelHistory = [];

// نمایش سطح اول (دسته‌ها – همون HTML استاتیک خودت)
function showLevel1() {
    faqTitle.innerText = "سوالات متداول";

    [faqLevel1, faqLevel2, faqLevel3].forEach(lvl => lvl.classList.remove("active"));
    faqLevel1.classList.add("active");

    backBtn.style.display = "none";
    levelHistory = [];
}

// نمایش زیرسطح‌ها یا سوال‌ها
function showLevel(data) {
    [faqLevel1, faqLevel2, faqLevel3].forEach(lvl => lvl.classList.remove("active"));
    faqLevel2.classList.add("active");

    faqTitle.innerText = data.title;
    backBtn.style.display = "flex";

    questionsList.innerHTML = "";

    if (data.levels && data.levels.length) {
        data.levels.forEach(level => {
            const div = document.createElement("div");
            div.className = "faq-question-item";
            div.innerHTML = `
                <h5>${level.title}</h5>
                <p>برای مشاهده زیرمجموعه کلیک کنید</p>
            `;
            div.onclick = () => {
                levelHistory.push(data); // همون چیزی که خودت اصلاح کردی
                showLevel(level);
            };
            questionsList.appendChild(div);
        });
    }
    else if (data.questions && data.questions.length) {
        data.questions.forEach(q => {
            const div = document.createElement("div");
            div.className = "faq-question-item";
            div.innerHTML = `
                <h5>${q.question}</h5>
                <p>برای مشاهده پاسخ کلیک کنید</p>
            `;
            div.onclick = () => {
                levelHistory.push(data);
                showAnswer(q);
            };
            questionsList.appendChild(div);
        });
    }
}

// نمایش جواب
function showAnswer(q) {
    [faqLevel1, faqLevel2, faqLevel3].forEach(lvl => lvl.classList.remove("active"));
    faqLevel3.classList.add("active");

    faqTitle.innerText = "پاسخ سوال";
    backBtn.style.display = "flex";

    answerContent.innerHTML = `
        <h4>${q.question}</h4>
        <div class="answer-text">${q.answer}</div>
    `;
}

// بازگشت
backBtn.onclick = () => {
    if (levelHistory.length === 0) {
        showLevel1();
        return;
    }

    const prev = levelHistory.pop();

    if (!prev || prev.type === "root") {
        showLevel1();
    } else {
        showLevel(prev);
    }
};

// کلیک روی دسته‌بندی‌های سطح اول (HTML استاتیک)
document.querySelectorAll(".faq-category-item").forEach(item => {
    item.addEventListener("click", function () {
        const category = this.getAttribute("data-category");
        levelHistory.push({ type: "root" });
        showLevel(faqData[category]);
    });
});

// اجرای اولیه
showLevel1();

//////////////////////////////////////////////////////////////قابلیت جستجو

const faqSearchInput = document.getElementById("faqSearchInput");

function searchInFaq(data, keyword, results = []) {
    // جستجو در سوال‌ها
    if (data.questions && data.questions.length) {
        data.questions.forEach(q => {
            if (
                q.question.toLowerCase().includes(keyword) ||
                q.answer.toLowerCase().includes(keyword)
            ) {
                results.push(q);
            }
        });
    }

    // جستجو در زیرسطح‌ها
    if (data.levels && data.levels.length) {
        data.levels.forEach(level => {
            searchInFaq(level, keyword, results);
        });
    }

    return results;
}

function showSearchResults(results, keyword) {
    [faqLevel1, faqLevel2, faqLevel3].forEach(lvl => lvl.classList.remove("active"));
    faqLevel2.classList.add("active");

    faqTitle.innerText = `نتایج جستجو برای: "${keyword}"`;
    backBtn.style.display = "flex";

    questionsList.innerHTML = "";

    if (results.length === 0) {
        questionsList.innerHTML = `
            <div class="faq-empty">
                نتیجه‌ای پیدا نشد 😕
            </div>
        `;
        return;
    }

    results.forEach(q => {
        const div = document.createElement("div");
        div.className = "faq-question-item";
        div.innerHTML = `
            <h5>${q.question}</h5>
            <p>مشاهده پاسخ</p>
        `;
        div.onclick = () => {
            showAnswer(q);
        };
        questionsList.appendChild(div);
    });
}

faqSearchInput.addEventListener("input", function () {
    const keyword = this.value.trim().toLowerCase();

    if (keyword.length < 2) {
        resetToLevel1();
        return;
    }

    let allResults = [];

    Object.values(faqData).forEach(category => {
        searchInFaq(category, keyword, allResults);
    });

    showSearchResults(allResults, keyword);
});
