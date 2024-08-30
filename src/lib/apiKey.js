export const getApiKey = () => {
  // Obtener la API KEY desde Local Storage
  try {
    const api_key = localStorage.getItem('apiKey');
    if (!api_key) {
      throw new Error('Api Key not defined!');
    }
    return api_key;
  } catch (error) {
    const api_key = prompt("Por favor ingresa una Open AI Key");
    
    // Validar que la clave tiene la longitud correcta
    if (!api_key || api_key.length <= 160) {
      alert("Api Key invalida, por favor ingresa una Open AI api key");
      return null; // Detener la recursión si la clave no es válida
    }

    setApiKey(api_key);
    return api_key; // Retornar la clave válida
  }
};

export const setApiKey = (key) => {
  // Guardar la API KEY en Local Storage
  try {
    localStorage.setItem('apiKey', key);//permite almacenar datos de forma persistente en el navegador.
  } catch (error) {
    alert('Error al guardar la API KEY:', error);
  }
};
