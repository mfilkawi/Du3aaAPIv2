const showBtn = document.getElementById('show');
const cancelBtn = document.getElementById('cancelBtn');
const confirmEle = document.querySelector('.confirm');

showBtn.addEventListener('click', e => {
    confirmEle.style.visibility = 'visible';
})

cancelBtn.addEventListener('click', e => {
    location.reload();
})