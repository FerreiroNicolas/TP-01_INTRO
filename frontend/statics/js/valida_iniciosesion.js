document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();

        if (emailValue === '') {
            showError(email, 'El email es obligatorio.');
        } else if (!isValidEmail(emailValue)) {
            showError(email, 'El email no es válido.');
        } else {
            showSuccess(email);
        }

        if (passwordValue === '') {
            showError(password, 'La contraseña es obligatoria.');
        } else {
            showSuccess(password);
        }

        // Aquí puedes agregar más validaciones si es necesario

        // Si todos los campos son válidos, puedes enviar el formulario
        if (emailValue !== '' && passwordValue !== '') {
            form.submit();
        }
    });

    function showError(input, message) {
        const formControl = input.parentElement;
        formControl.className = 'error';
        const errorText = formControl.querySelector('.error-text');
        errorText.innerText = message;
    }

    function showSuccess(input) {
        const formControl = input.parentElement;
        formControl.className = 'success';
    }

    function isValidEmail(email) {
        // Expresión regular para validar el formato del email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
