fetch(`${window.location.origin}/twitter/oauth`,{
    method: 'POST'
})
    .then(res => res.json())
    .then(data => {
        if(data.status == 404) throw err;
        const SignInContainer = document.querySelector('.sign-in-btn');
        SignInContainer.innerHTML = `<a href="${data.url}"><img src="./style/img/sign-in-with-twitter-gray.png" alt="sign in with twitter"></a>`;
    })
    .catch(err => {
        console.log(err);
        const SignInContainer = document.querySelector('.sign-in-btn');
        SignInContainer.innerHTML = "الرجاء المحاولة لاحقاً";
    })
