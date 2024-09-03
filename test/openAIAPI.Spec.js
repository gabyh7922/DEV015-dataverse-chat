import { communicateWithOpenAI } from './openAIApi.js';
window.fetch = jest.fn();// Mock de la función fetch
describe('communicateWithOpenAI', () => {
  beforeEach(() => {
    fetch.mockClear();// Reinicia el mock antes de cada test
  }); //it es una función que define un caso de prueba. Es equivalente a test
  it('debe entregar la respuesta de OpenAI cuando la petición sería exitosa', async () => {
    const mockResponse = { choices: [{ text: "respuesta" }] };
    fetch.mockResolvedValueOnce({ // Simula la respuesta de fetch con éxito
      ok: true, //indica que la respuesta HTTP tuvo exito (200-299).
      json: jest.fn().mockResolvedValueOnce(mockResponse) //mockResolvedValueOnce(mockResponse): Simula que la llamada al método
    }); // json: jest.fn(): convierte la respuesta en un json
    const content = [{ role: "user", content: "Hola, IA" }];
    const result = await communicateWithOpenAI(content);
    expect(fetch).toHaveBeenCalledTimes(1);// Asegúrate de que fetch fue llamado una vez
    expect(result).toEqual(mockResponse); // Verifica que la respuesta sea la esperada
  }); // Verifica que la respuesta sea la esperada
  it('debe manejar errores cuando la API key no está presente', async () => {
    const mockGetApiKey = jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValueOnce(null);// Simula que no hay API Key
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    const content = [{ role: "user", content: "Hola, IA" }];
    const result = await communicateWithOpenAI(content);
    expect(consoleSpy).toHaveBeenCalledWith("API Key no encontrada o inválida");// Verifica que el error fue impreso en la consola
    expect(result).toBeNull();// Verifica que el resultado sea nulo debido a la falta de API key
    mockGetApiKey.mockRestore(); // Limpia el mock de la API key
    consoleSpy.mockRestore();
  });
  it('debe manejar errores cuando la respuesta de la API falla', async () => {// Simula una respuesta fallida de la API
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Error de servidor'
    });
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    const content = [{ role: "user", content: "Hola, IA" }];
    const result = await communicateWithOpenAI(content);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Falló este proceso muy lento:'));// Verifica que el error fue impreso en la consola
    expect(result).toBeNull();// Verifica que el resultado sea nulo debido al error en la API
    consoleSpy.mockRestore();
  });
});
