function rsaEncrypt() {
    const text = document.getElementById("rsaInput").value.trim();
    const publicKey = document.getElementById("rsaPublicKey").value.trim();
    if (!text || !publicKey) {
        alert("Por favor, completa todos los campos para RSA.");
        return;
    }
    try {
        const encrypt = new RSAKey();
        encrypt.setPublic(publicKey, "10001");
        const encrypted = encrypt.encrypt(text);
        document.getElementById("rsaEncryptedText").value = encrypted;
    } catch (error) {
        alert("Error en el cifrado RSA: " + error.message);
    }
}

function rsaDecrypt() {
    const encryptedText = document.getElementById("rsaEncryptedText").value.trim();
    const privateKey = document.getElementById("rsaPrivateKey").value.trim();
    if (!encryptedText || !privateKey) {
        alert("Por favor, completa todos los campos para RSA.");
        return;
    }
    try {
        const decrypt = new RSAKey();
        decrypt.setPrivateEx(privateKey, "10001");
        const decrypted = decrypt.decrypt(encryptedText);
        document.getElementById("rsaDecryptedText").value = decrypted || "Error: Clave incorrecta o contenido no válido.";
    } catch (error) {
        alert("Error en el descifrado RSA: " + error.message);
    }
}
