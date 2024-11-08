let clavePrivada; 
let clavePublica; 

function generarClaves() { 
    const rsa = new JSEncrypt(); 
    rsa.getKey(); 
    clavePublica = rsa.getPublicKey(); 
    clavePrivada = rsa.getPrivateKey(); 
     
    document.getElementById("clavePublica").value = clavePublica; 
    document.getElementById("clavePrivada").value = clavePrivada; 
} 

function cifrarMensaje() { 
    const mensaje = document.getElementById("mensaje").value; 
    const rsa = new JSEncrypt(); 
    rsa.setPublicKey(clavePublica); 
    const mensajeCifrado = rsa.encrypt(mensaje); 
    document.getElementById("mensajeCifrado").value = mensajeCifrado; 
} 

function descifrarMensaje() { 
    const mensajeCifrado = document.getElementById("mensajeCifrado").value; 
    const rsa = new JSEncrypt(); 
    rsa.setPrivateKey(clavePrivada); 
    const mensajeDescifrado = rsa.decrypt(mensajeCifrado); 
    document.getElementById("mensajeDescifrado").value = mensajeDescifrado; 
} 