// Función para obtener la API Key desde Local Storage
export const getApiKey = () => {
    return localStorage.getItem('apiKey'); // Obtiene el valor almacenado bajo la clave 'apiKey'
  };
  
  // Función para guardar la API Key en Local Storage
  export const setApiKey = (key) => {
    localStorage.setItem('apiKey', key); // Almacena la API Key bajo la clave 'apiKey'
  };