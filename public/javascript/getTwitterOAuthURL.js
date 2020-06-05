fetch(`${window.location.origin}/twitter/oauth`,{
    method: 'POST'
})
    .then(res => res.json())
    .then(data => {
        if(data.status == 404) throw err;
        const SignInContainer = document.querySelector('.sign-in-btn');
        // SignInContainer.innerHTML = `<a href="${data.url}"><img src="./style/img/sign-in-with-twitter-gray.png" alt="sign in with twitter"></a>`;
        SignInContainer.innerHTML = `<a href="${data.url}" id="signin">اضغط هنا للإشتراك</a>`;
    })
    .catch(err => {
        console.log(err);
        const SignInContainer = document.querySelector('#errMSG');
        const showBtn = document.getElementById('show');
        const confirmEle = document.querySelector('.confirm');
        showBtn.style.visibility = 'hidden';
        confirmEle.style.visibility = 'hidden';
        SignInContainer.innerHTML = `<span style="color:red; font-weight: 600;">الرجاء المحاولة لاحقاً</span>`;
    })
