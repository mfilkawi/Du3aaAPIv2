var status = readCookie('status');
if (status !== 'null') {
    const alert = document.querySelector('.msg');
    if(status == 'canceled') alert.innerHTML = `<div class="alert danger"><p>لقد لغيت العملية</p></div>`;
    if(status == 'userexsists') alert.innerHTML = `<div class="alert warning"><p>انت مشترك مسبقاً</p></div>`;
    if(status == 'error') alert.innerHTML = `<div class="alert danger"><p>الرجاء معاودة المحاولة في وقت لاحق</p></div>`;
    if(status == 'useradded') alert.innerHTML = `<div class="alert success"><p>تم الاشتراك</p></div>`;
    eraseCookie('status');
}
