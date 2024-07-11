AOS.init();

function validarFormulario(event) {
    event.preventDefault(); // Prevenir la sumisión del formulario por defecto

    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let fechaNacimiento = document.getElementById('fechaNacimiento').value;
    let pais = document.getElementById('pais').value;
    let terminos = document.getElementById('terminos').checked;

    let valid = true;

    // Validar nombre
    if (nombre.trim() === "") {
        document.getElementById('error-nombre').innerText = "El nombre es obligatorio.";
        valid = false;
    } else {
        document.getElementById('error-nombre').innerText = "";
    }

    // Validar apellido
    if (apellido.trim() === "") {
        document.getElementById('error-apellido').innerText = "El apellido es obligatorio.";
        valid = false;
    } else {
        document.getElementById('error-apellido').innerText = "";
    }

    // Validar email
    if (email.trim() === "") {
        document.getElementById('error-email').innerText = "El email es obligatorio.";
        valid = false;
    } else {
        document.getElementById('error-email').innerText = "";
    }

    // Validar contraseña
    if (password.trim() === "") {
        document.getElementById('error-password').innerText = "La contraseña es obligatoria.";
        valid = false;
    } else {
        document.getElementById('error-password').innerText = "";
    }

    // Validar fecha de nacimiento
    if (fechaNacimiento.trim() === "") {
        document.getElementById('error-fechaNacimiento').innerText = "La fecha de nacimiento es obligatoria.";
        valid = false;
    } else {
        document.getElementById('error-fechaNacimiento').innerText = "";
    }

    // Validar país
    if (pais === "") {
        document.getElementById('error-pais').innerText = "El país es obligatorio.";
        valid = false;
    } else {
        document.getElementById('error-pais').innerText = "";
    }

    // Validar términos y condiciones
    if (!terminos) {
        document.getElementById('error-terminos').innerText = "Debes aceptar los términos y condiciones.";
        valid = false;
    } else {
        document.getElementById('error-terminos').innerText = "";
    }

    if (valid) {
        // Si el formulario es válido, envía los datos con fetch
        let formData = new FormData(document.getElementById('form1'));
        fetch(document.getElementById('form1').action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                Swal.fire({
                    title: 'Éxito!',
                    text: 'Su registro se ha realizado correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then(() => {
                    location.reload();
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema con su registro, intente mas tarde.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        }).catch(error => {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema con su registro, intente mas tarde.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        });
    }
    return false;
}
