const modalBtn = document.querySelector('.modal__button');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
const body = document.querySelector('body');

modalBtn.addEventListener('click', () => {
    modal.style.display = 'flex'
})

modal.addEventListener('click', (event) => {
    const modalContent = event.target.closest('.modal__inner')

    if(!modalContent) {
        modal.style.display = 'none';
    }
})