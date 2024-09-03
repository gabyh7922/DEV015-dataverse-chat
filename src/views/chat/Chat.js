import { communicateWithOpenAI } from "/lib/openAIApi.js";
import { getApiKey } from '/lib/setapiKey.js';

function getContext(names, allCharacters) {
  if (!allCharacters) {
    return "Eres " + names + " y responderás según su historia y como si fueras ella";
  } else {
    return "Eres una conferencia de mujeres históricamente importante donde estarían " + names + ", responde personificando a las mujeres como una voz en conjunto y solo en español";
  }
}

//... (código para crear elementos de la interfaz de usuario y manejar eventos)

export const renderChat = (data, allCharacters = false) => {
  getApiKey();
  const view = document.createElement('div');
  view.classList.add('chat-container');

  const right = document.createElement('div');
  right.classList.add('chat-box');

  const title = document.createElement('h2');
  title.textContent = allCharacters ? "Chatea con nosotras:" : "Chatea Conmigo:";
  right.appendChild(title);

  const chatBox = document.createElement('ul');
  chatBox.classList.add('messages');
  right.appendChild(chatBox);

  const writeDiv = document.createElement('div');
  writeDiv.classList.add('write');

  const textarea = document.createElement('textarea');
  textarea.setAttribute('name', 'message');
  textarea.setAttribute('rows', 4);
  textarea.classList.add('message-input');
  writeDiv.appendChild(textarea);

  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.setAttribute('id', 'send');
  button.textContent = 'ENVIAR';
  button.classList.add('send-button');
  writeDiv.appendChild(button);

  button.addEventListener('click', async function () {
    const messageBox = document.querySelector('textarea[name="message"]');
    const names = allCharacters ? data.map(data => data.name).join(', ') : data['name'];

    // Agregar el mensaje del usuario en el chat
    const me_ask = document.createElement('li');
    me_ask.classList.add('me');
    me_ask.appendChild(document.createTextNode(messageBox.value));
    chatBox.appendChild(me_ask);



    // Llamar a la función communicateWithOpenAI
    const response = await communicateWithOpenAI([
      { role: "system", content: getContext(names, allCharacters) },
      { role: 'user', content: messageBox.value }
    ]);

    // Mostrar la respuesta en la interfaz de usuario
    if (response && response.choices) {
      const respond = document.createElement('li');
      respond.classList.add('her');
      respond.appendChild(document.createTextNode(response.choices[0].message.content));
      chatBox.appendChild(respond);
    }

    // Limpiar y enfocar el textarea
    messageBox.value = "";
    messageBox.focus();
  });

  right.appendChild(writeDiv);
  view.appendChild(right);

  return view;
};
