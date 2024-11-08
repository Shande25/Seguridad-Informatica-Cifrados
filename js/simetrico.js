// Validación de contraseña 
function validarPassword(password) { 
    if (password.length < 8) { 
        alert("La contraseña debe tener al menos 8 caracteres."); 
        return false; 
    } 
    return true; 
}

// Mostrar barra de progreso
function mostrarProgreso() {
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    progressContainer.style.display = 'block';
    progressBar.style.width = '0%';

    let progreso = 0;
    const intervalo = setInterval(() => {
        progreso += 20;
        progressBar.style.width = `${progreso}%`;

        if (progreso >= 100) {
            clearInterval(intervalo);
        }
    }, 200);
}

function ocultarProgreso() {
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    progressContainer.style.display = 'none';
    progressBar.style.width = '0%';
}
// Función para cifrar archivos 
function cifrarArchivo() { 
    var fileInput = document.getElementById("fileInput").files[0]; 
    var password = document.getElementById("password").value; 

    if (!validarPassword(password)) return; 

    if (fileInput) { 
        mostrarProgreso();
        
        var reader = new FileReader(); 
        reader.readAsDataURL(fileInput);  // Leer el archivo como base64 
        reader.onload = function(e) { 
            var fileData = e.target.result; 
            var fileCifrado = CryptoJS.AES.encrypt(fileData, password).toString(); 

            ocultarProgreso();

            // Crear un enlace para descargar el archivo cifrado 
            var enlace = document.createElement('a'); 
            enlace.href = 'data:application/octet-stream,' + encodeURIComponent(fileCifrado); 
            enlace.download = fileInput.name + ".cifrado"; 
            enlace.textContent = "Descargar Archivo Cifrado"; 
            document.getElementById("archivoResultado").innerHTML = "";
            document.getElementById("archivoResultado").appendChild(enlace); 
        }; 
    } else { 
        alert("Por favor, selecciona un archivo para cifrar."); 
    } 
} 

// Función para descifrar archivos 
function descifrarArchivo() { 
    var fileInput = document.getElementById("fileInput").files[0]; 
    var password = document.getElementById("password").value; 

    if (!validarPassword(password)) return; 

    if (fileInput) { 
        mostrarProgreso();
        
        var reader = new FileReader(); 
        reader.readAsText(fileInput);  // Leer el archivo cifrado como texto 
        reader.onload = function(e) { 
            var fileCifrado = e.target.result; 
            try { 
                var bytesDescifrados = CryptoJS.AES.decrypt(fileCifrado, password); 
                var fileDescifrado = bytesDescifrados.toString(CryptoJS.enc.Utf8); 

                ocultarProgreso();

                if (!fileDescifrado) { 
                    throw new Error("Error al descifrar"); 
                } 

                // Crear un Blob para el archivo descifrado y descargarlo 
                var enlace = document.createElement('a'); 
                enlace.href = 'data:application/octet-stream,' + encodeURIComponent(fileDescifrado); 
                enlace.download = fileInput.name.replace(".cifrado", ""); 
                enlace.textContent = "Descargar Archivo Descifrado"; 
                document.getElementById("archivoResultado").innerHTML = ""; 
                document.getElementById("archivoResultado").appendChild(enlace); 
            } catch (error) { 
                ocultarProgreso();
                alert("Error al descifrar el archivo. Verifica la contraseña y el archivo."); 
            } 
        }; 
    } else { 
        alert("Por favor, selecciona un archivo para descifrar."); 
    } 
}
