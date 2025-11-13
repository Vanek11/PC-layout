const sendForm = () => {
  const form = document.querySelector('.modal')

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const text  = form.querySelector('input[type=text]')
    const tel   = form.querySelector('input[type=tel]')
    const email = form.querySelector('input[type=email]')
    const submitBtn = form.querySelector('button[type=submit]')

    const nameVal  = (text?.value || '').trim()
    const phoneVal = (tel?.value || '').trim()
    const emailVal = (email?.value || '').trim()

    if (!nameVal || !phoneVal || !emailVal) {
      alert('Пожалуйста, заполните все поля: Имя, Телефон и E-mail.')
      return
    }
    const phoneOk = /^[\d\s()+-]{10,}$/.test(phoneVal)      
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)

    if (!phoneOk) {
      alert('Проверьте номер телефона: допустимы цифры, пробелы, (), +, - (минимум 10 знаков).')
      return
    }
    if (!emailOk) {
      alert('Проверьте адрес электронной почты: формат должен быть вида name@example.com.')
      return
    }

    const payload = {
      name:  nameVal,
      phone: phoneVal,
      email: emailVal,
    }

    if (submitBtn) submitBtn.disabled = true

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Сервер вернул статус ${response.status}`)
        }
        return response.json()
      })
      .then(() => {
        alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.')
        form.reset()
      })
      .catch((err) => {
        alert(`Ошибка отправки формы: ${err.message}`)
      })
      .finally(() => {
        if (submitBtn) submitBtn.disabled = false
      })
  })
}
sendForm()
