AOS.init();

        function validarFormulario() {
            var nombre = document.getElementById("nombre").value;
            var apellido = document.getElementById("apellido").value;
            var email = document.getElementById("email").value;
            var password = document.getElementById("password").value;
            var fechaNacimiento = document.getElementById("fechaNacimiento").value;
            var pais = document.getElementById("pais").value;
            var terminos = document.getElementById("terminos").checked;

            var errores = false;

            if (nombre === "") {
                document.getElementById("error-nombre").innerText = "Por favor, ingresa tu nombre.";
                errores = true;
            } else {
                document.getElementById("error-nombre").innerText = "";
            }

            if (apellido === "") {
                document.getElementById("error-apellido").innerText = "Por favor, ingresa tu apellido.";
                errores = true;
            } else {
                document.getElementById("error-apellido").innerText = "";
            }

            if (email === "") {
                document.getElementById("error-email").innerText = "Por favor, ingresa tu email.";
                errores = true;
            } else {
                document.getElementById("error-email").innerText = "";
            }

            if (password === "") {
                document.getElementById("error-password").innerText = "Por favor, ingresa tu contraseña.";
                errores = true;
            } else {
                document.getElementById("error-password").innerText = "";
            }

            if (fechaNacimiento === "") {
                document.getElementById("error-fechaNacimiento").innerText = "Por favor, ingresa tu fecha de nacimiento.";
                errores = true;
            } else {
                document.getElementById("error-fechaNacimiento").innerText = "";
            }

            if (pais === "") {
                document.getElementById("error-pais").innerText = "Por favor, selecciona tu país.";
                errores = true;
            } else {
                document.getElementById("error-pais").innerText = "";
            }

            if (!terminos) {
                document.getElementById("error-terminos").innerText = "Por favor, acepta los términos y condiciones.";
                errores = true;
            } else {
                document.getElementById("error-terminos").innerText = "";
            }

            return !errores;
        }