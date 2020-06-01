var status = readCookie('status');
if (status !== 'null') {
    const alert = document.querySelector('#alert');
    if(status == 'canceled') alert.innerHTML = `<div class="warning">لقد لغيت العملية</div>`;
    if(status == 'userexsists') alert.innerHTML = `<div class="warning">انت مشترك مسبقاً</div>`;
    if(status == 'error') alert.innerHTML = `<div class="danger">الرجاء معاودة المحاولة في وقت لاحق</div>`;
    if(status == 'useradded') alert.innerHTML = `<div class="success">تمت إضافتك</div>`;
    eraseCookie('status');
}
