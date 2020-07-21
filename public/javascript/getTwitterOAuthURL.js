fetch(`${window.location.origin}/twitter/oauth`,{
    method: 'POST'
})
    .then(res => res.json())
    .then(data => {
        if(data.status == 404) throw err;
        const SignInContainer = document.querySelector('.button');
        SignInContainer.innerHTML = `<a href="${data.url}" class="btn">اضغط هنا للإشتراك</a>`;
    })
    .catch(err => {
        console.log(err);
        const SignInContainer = document.querySelector('.button');
        SignInContainer.innerHTML = `<p style="color: #ff3535">الرجاء المحاولة لاحقاً</p>`;
    })
