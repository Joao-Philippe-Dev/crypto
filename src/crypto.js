async function generateKeyPair() {
    try {
        return await window.crypto.subtle.generateKey(
            {
                name: "RSA-OAEP",
                modulusLength: 2048,
                publicExponent: new Uint8Array([1, 0, 1]),
                hash: "SHA-256",
            },
            true,
            ["encrypt", "decrypt"]
        );
    } catch (error) {
        console.error("Erro ao gerar o par de chaves:", error);
        throw new Error("Falha ao gerar o par de chaves.");
    }
}

async function encryptMessage(publicKey, message) {
    try {
        const encoder = new TextEncoder();
        const encodedMessage = encoder.encode(message);
        return await window.crypto.subtle.encrypt(
            { name: "RSA-OAEP" },
            publicKey,
            encodedMessage
        );
    } catch (error) {
        console.error("Erro ao criptografar a mensagem:", error);
        throw new Error("Falha ao criptografar a mensagem.");
    }
}

async function decryptMessage(privateKey, encryptedMessage) {
    try {
        const decryptedMessage = await window.crypto.subtle.decrypt(
            { name: "RSA-OAEP" },
            privateKey,
            encryptedMessage
        );
        const decoder = new TextDecoder();
        return decoder.decode(decryptedMessage);
    } catch (error) {
        console.error("Erro ao descriptografar a mensagem:", error);
        throw new Error("Falha ao descriptografar a mensagem.");
    }
}

function arrayBufferToBase64(buffer) {
    try {
        const binary = String.fromCharCode(...new Uint8Array(buffer));
        return window.btoa(binary);
    } catch (error) {
        console.error("Erro ao converter ArrayBuffer para base64:", error);
        throw new Error("Falha na conversão para base64.");
    }
}

function base64ToArrayBuffer(base64) {
    try {
        const binary = window.atob(base64);
        const buffer = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            buffer[i] = binary.charCodeAt(i);
        }
        return buffer;
    } catch (error) {
        console.error("Erro ao converter base64 para ArrayBuffer:", error);
        throw new Error("Falha na conversão de base64.");
    }
}
