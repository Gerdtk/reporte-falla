//telefono.ts

const encoder = new TextEncoder();

/**
 * Convierte bytes a Base64 para poder guardar o enviar
 * fácilmente el resultado cifrado.
 */
function convertirABase64(datos: ArrayBuffer | Uint8Array): string {
    const bytes =
        datos instanceof Uint8Array
            ? datos
            : new Uint8Array(datos);

    return btoa(String.fromCharCode(...bytes));
}

/**
 * Convierte una contraseña de texto en una clave AES.
 *
 * Esto es suficiente para una demostración.
 * Para producción conviene usar PBKDF2 y mantener
 * la contraseña exclusivamente en el backend.
 */
async function crearClave(secreto: string): Promise<CryptoKey> {
    const secretoCodificado = encoder.encode(secreto);

    const hash = await crypto.subtle.digest(
        "SHA-256",
        secretoCodificado
    );

    return crypto.subtle.importKey(
        "raw",
        hash,
        {
            name: "AES-GCM",
        },
        false,
        ["encrypt"]
    );
}

export async function cifrarTelefono(
    telefono: string,
    secreto: string
): Promise<string> {
    if (!telefono.trim()) {
        throw new Error("No se proporcionó un número telefónico.");
    }

    const clave = await crearClave(secreto);

    // AES-GCM normalmente utiliza un IV aleatorio de 12 bytes.
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const telefonoCodificado = encoder.encode(telefono);

    const telefonoCifrado = await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv,
        },
        clave,
        telefonoCodificado
    );

    // Guardamos IV y contenido cifrado juntos.
    return `${convertirABase64(iv)}.${convertirABase64(telefonoCifrado)}`;
}