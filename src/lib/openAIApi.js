import { getApiKey } from './setapiKey.js';

export const communicateWithOpenAI = async () => {
  const apiKey = getApiKey();// Obtiene la API Key del localStorage
  const apiOpenAI = "https://api.openai.com/v1/chat/completions";
  if (!apiKey) {// Verifica si la API Key es válida
    alert("API Key no encontrada o inválida");
    return;
  } //fetch es una función que permite hacer solicitudes HTTP desde JavaScript. Es muy utilizada para interactuar con APIs.
  try { //El bloque try intenta ejecutar el código dentro de él. Si ocurre un error, ese error será capturado en el bloque catch.
    const headers = { //Aquí se configuran las cabeceras de la solicitud callback
      'Content-Type': 'application/json', //especifica que el formato usado sera JSON
      'Authorization': `Bearer ${apiKey}` // Usa la API Key en la cabecera
    }
    const response = await fetch(apiOpenAI, {//La función fetch envía una solicitud HTTP a la URL especificada (en este caso, la API de OpenAI para completar chats)
      method: 'POST', //especifica el tipo de solicitud HTTP
      headers: headers,
      body: JSON.stringify({
        model: "gpt-4", // Especifica el modelo de la IAel para metro messages
      })
    });// Manejo de errores si la respuesta no es correcta
    if (!response.ok) {// ok trabaja con el rango 200-299 respuesta exitosa
      throw new Error(`Error en la petición: ${response.statusText}`)//throw esta palabra clave se utiliza para lanzar un error
    }//wait provoca que la ejecución de una función async sea pausada hasta que una Promise sea terminada o rechazada,
    const data = await response.json(); // Parsear la respuesta JSON ,
    return data; // Devuelve la respuesta de OpenAI
  } catch (error) {
    alert('Falló este proceso proceso lento:', error);
    return null;
  }
};
//statusText Almacena el texto de la petición HTTP enviado por el servidor.
//La API Fetch proporciona una interfaz JavaScript para acceder y manipular partes del canal HTTP, tales como peticiones y respuestas.
//*Parsear (o "parsear" del inglés parse) es el
//*proceso de analizar y convertir una cadena de texto
//*en un formato más estructurado o comprensible para un
//*programa. Generalmente, esto implica convertir datos de
//*una representación en texto (como JSON , XML o CSV)