let fileContent = '';
let encryptedContent = '';
let decryptedContent = '';

function readFile(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            fileContent = e.target.result;
        };
        reader.readAsText(file);
    }
}

function encryptFile() {
    const encryptionKey = document.getElementById("encryptionKey").value.trim();
    if (!fileContent || !encryptionKey) {
        alert("Por favor, adjunta un archivo y completa la clave.");
        return;
    }
    encryptedContent = CryptoJS.AES.encrypt(fileContent, encryptionKey).toString();
    document.getElementById("encryptedText").value = encryptedContent;
}

function decryptFile() {
    const encryptionKey = document.getElementById("encryptionKey").value.trim();
    if (!encryptedContent || !encryptionKey) {
        alert("Por favor, completa todos los campos.");
        return;
    }
    const decrypted = CryptoJS.AES.decrypt(encryptedContent, encryptionKey);
    decryptedContent = decrypted.toString(CryptoJS.enc.Utf8);
    document.getElementById("decryptedText").value = decryptedContent || "Error: Clave incorrecta o contenido no válido.";
}

function downloadEncryptedFile() {
    if (!encryptedContent) {
        alert("No hay contenido cifrado para descargar.");
        return;
    }
    const blob = new Blob([encryptedContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "archivo_cifrado.txt";
    link.click();
}

function downloadDecryptedFile() {
    if (!decryptedContent) {
        alert("No hay contenido descifrado para descargar.");
        return;
    }
    const blob = new Blob([decryptedContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "archivo_descifrado.txt";
    link.click();
}
