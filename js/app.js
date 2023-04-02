// INFO: VARIABLES
const array = [
  ["a", "e", "i", "o", "u"],
  ["ai", "enter", "imes", "ober", "ufat"],
];

const cryptButton = document.querySelector(".crypt-button");
const decryptButton = document.querySelector(".decrypt-button");
const inputText = document.querySelector(".txt-input");
const rightArea = document.querySelector(".right-area");

let outputText, copyButton;

// INFO: FUNCTIONS

const createOutputText = () => {
  const delectable = document.querySelector(".delectable");
  rightArea.removeChild(delectable);

  const textArea = document.createElement("textarea");
  textArea.classList.add("txt-output");
  textArea.placeholder = "Texto encriptado";
  textArea.disabled = true;

  const button = document.createElement("button");
  button.classList.add("copy-button");
  button.classList.add("btn");
  button.textContent = "Copiar";
  button.addEventListener("click", copyToClipboard);

  rightArea.appendChild(textArea);
  rightArea.appendChild(button);

  outputText = document.querySelector(".txt-output");
  copyButton = document.querySelector(".copy-button .btn");
};

const cryptText = () => {
  const text = inputText.value.trim().toLowerCase();

  if (text) {
    !outputText ? createOutputText() : false;

    const chars = [...text];

    const cryptedChars = chars.map((char) => {
      const index = array[0].indexOf(char);
      if (index !== -1) {
        return array[1][index];
      } else {
        return char;
      }
    });

    const cryptedText = cryptedChars.join("");
    outputText.value = cryptedText;
  } else {
    popupAlert("No hay texto que procesar");
  }
};

const decryptText = () => {
  const text = outputText.value.trim().toLowerCase();

  if (text) {
    !outputText ? createOutputText() : false;

    const regex = new RegExp(array[1].join("|"), "g");
    const decryptedText = text.replace(
      regex,
      (match) => array[0][array[1].indexOf(match)]
    );

    outputText.value = decryptedText;
  } else {
    popupAlert("No hay texto que procesar");
  }
};

const popupAlert = (message) => {
  const divAlert = document.createElement("div");
  divAlert.classList.add("alert");
  divAlert.textContent = message;
  const mainContainer = document.querySelector(".main-container");
  mainContainer.appendChild(divAlert);

  setTimeout(() => {
    mainContainer.removeChild(divAlert);
  }, 3000);
};

const copyToClipboard = () => {
  if (outputText.value) {
    navigator.clipboard.writeText(outputText.value).then(() => {
      popupAlert("Mensaje copiado al portapapeles");
    });
  }
};

// INFO: EVENTS
document.addEventListener("DOMContentLoaded", () => {
  inputText.value = "";
});

cryptButton.addEventListener("click", cryptText);
decryptButton.addEventListener("click", decryptText);
