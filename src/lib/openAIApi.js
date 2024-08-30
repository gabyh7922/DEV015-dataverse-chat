// Importa la función para obtener la API KEY desde apiKey.js
import { getApiKey } from './apiKey.js';

export const communicateWithOpenAI = async (messages) => {
  const apiKey = getApiKey(); // Obtiene la API Key del localStorage

  // Verifica si la API Key es válida
  if (!apiKey) {
    console.error("API Key no encontrada o inválida");
    return;
  }
  //fetch es una función que permite hacer solicitudes HTTP desde JavaScript. Es muy utilizada para interactuar con APIs.
  try { //El bloque try intenta ejecutar el código dentro de él. Si ocurre un error, ese error será capturado en el bloque catch.
    const response = await fetch('https://api.openai.com/v1/chat/completions', {//La función fetch envía una solicitud HTTP a la URL especificada (en este caso, la API de OpenAI para completar chats)
      method: 'POST', //especifica el tipo de solicitud HTTP
      headers: { //Aquí se configuran las cabeceras de la solicitud
        'Content-Type': 'application/json', //especifica que el formato usado sera JSON
        'Authorization': `Bearer ${apiKey}` // Usa la API Key en la cabecera
      },
      body: JSON.stringify({
        model: "gpt-4", // Especifica el modelo de ka IA
        messages: messages // Incluye los mensajes de la brbuja del chat
      })
    });

    // Manejo de errores si la respuesta no es correcta
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.statusText}`);
    }

    const data = await response.json(); // Parsear la respuesta JSON
    return data; // Devuelve la respuesta de OpenAI
  } catch (error) {
    console.error('Error al comunicarse con OpenAI:', error);
    return null;
  }
};
//*Parsear (o "parsear" del inglés parse) es el
 //*proceso de analizar y convertir una cadena de texto 
 //*en un formato más estructurado o comprensible para un 
 //*programa. Generalmente, esto implica convertir datos de 
 //*una representación en texto (como JSON , XML o CSV)