import { r as reactExports, j as jsxRuntimeExports, a as addHmrIntoView, c as createRoot } from "./_virtual_reload-on-update-in-view.js";
const App = () => {
  const documentRef = reactExports.useRef(document);
  const clipboard = navigator.clipboard;
  const getUserData = () => {
    const profileOwnersName = document.querySelector(
      ".text-heading-xlarge"
    ).innerHTML;
    let expirience = document.getElementsByClassName(
      "artdeco-list__item RCeBvjYvqskYYBxdZSAOWvEHlvOIdfoJE TdxKUFEMxYzrDGZbEBaCAvkTydRJpcfIceTow"
    );
    let expirience1 = expirience[0].getElementsByClassName(
      "display-flex align-items-center mr1 t-bold"
    )[0];
    let lastPosition = expirience1.querySelector('span[aria-hidden="true"], span.visually-hidden').textContent.trim();
    let exp = expirience[0].getElementsByClassName("t-14 t-normal");
    const bufInfo = [];
    for (let i = 0; i < exp.length; i++) {
      bufInfo.push(
        exp[i].querySelector('span[aria-hidden="true"], span.visually-hidden').textContent.trim()
      );
    }
    const lastWord = {
      name: profileOwnersName,
      position: lastPosition,
      company: bufInfo[0],
      expirience: bufInfo[1],
      place: bufInfo[2],
      about: bufInfo[3],
      skills: bufInfo[4],
      link: window.location.href
    };
    clipboard.writeText(String(JSON.stringify(lastWord))).then(() => {
      console.log("Текст скопирован в буфер обмена");
    }).catch((err) => {
      console.error("Не удалось скопировать текст в буфер обмена: ", err);
    });
    return lastWord;
  };
  function waitForElementToExist(selector, callback) {
    const element = document.getElementsByClassName(selector);
    if (element && element.length > 0) {
      callback(element);
    } else {
      setTimeout(function() {
        waitForElementToExist(selector, callback);
      }, 1e3);
    }
  }
  function waitForTextAreaToExist(selector, callback) {
    const element = document.getElementsByClassName(selector);
    if (element && element.length > 0) {
      callback(element);
    } else {
      setTimeout(function() {
        waitForElementToExist(selector, callback);
      }, 1e3);
    }
  }
  const onClickElement = reactExports.useCallback((event) => {
    if (event.key === "t" || event.key === "e") {
      const buttonMesage = document.getElementsByClassName(
        "artdeco-button artdeco-button--2 artdeco-button--primary ember-view pvs-profile-actions__action"
      );
      buttonMesage[0].click();
      waitForElementToExist(
        "artdeco-modal-overlay artdeco-modal-overlay--layer-default artdeco-modal-overlay--is-top-layer  ember-view",
        function(element) {
          console.log("Элемент появился:", element);
          const buttonPers = element[0].getElementsByClassName(
            "artdeco-button artdeco-button--muted artdeco-button--2 artdeco-button--secondary ember-view mr1"
          );
          buttonPers[0].click();
        }
      );
      waitForTextAreaToExist(
        "ember-text-area ember-view connect-button-send-invite__custom-message mb3",
        function(element) {
          const STRING = String(JSON.stringify(getUserData()));
          console.log("Элемент textarea:", element);
          element[0].focus();
          element[0].value = STRING.slice(0, 199);
          element[0].blur();
          waitForElementToExist(
            "artdeco-button artdeco-button--2 artdeco-button--primary ember-view ml1",
            function(element2) {
              console.log("button появился:", element2);
              element2[0].focus();
              element2[0].disabled = false;
              setTimeout(() => {
              }, 200);
            }
          );
        }
      );
    }
  }, []);
  reactExports.useEffect(() => {
    documentRef.current.addEventListener("keydown", onClickElement);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
};
const injectedStyle = '.SelectedContainer {\n  background-color: rgba(79, 110, 253, 0.2);\n  width: 100%;\n  height: 100%;\n  border-radius: 7px;\n  box-shadow: -1px 5px 10px 3px rgba(79, 110, 253, 0.2);\n  border: 1px solid rgba(79, 110, 253, 0.3);\n}\n\n.ButtonsContainer {\n  margin-top: 5px;\n  width: 100%;\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n}\n.ButtonsContainer .ButtonsBloc {\n  width: auto;\n  box-shadow: -1px 5px 10px 3px rgba(79, 110, 253, 0.3);\n  background-color: rgb(124, 148, 255);\n  border-radius: 7px;\n  border: 1px solid rgb(79, 110, 253);\n  pointer-events: all;\n  padding: 3px;\n  display: flex;\n  justify-content: flex-end;\n  align-items: stretch;\n  gap: 5px;\n}\n\n.SpeachButton {\n  cursor: pointer;\n  background: none;\n  border: none;\n  border-radius: 7px;\n  background-color: rgb(79, 110, 253);\n  color: #fff;\n  font-size: 18px;\n  font-weight: 500;\n  padding: 5px 10px;\n}\n.SpeachButton:hover {\n  background-color: rgb(70, 100, 234);\n}\n.SpeachButton:active {\n  background-color: rgb(58, 83, 194);\n}\n\n.PlayPauseButton {\n  cursor: pointer;\n  background: none;\n  border: none;\n  padding: 0;\n  height: auto;\n  width: 30px;\n}\n.PlayPauseButton svg {\n  height: 100%;\n  width: auto;\n}\n\n.CloseButton {\n  pointer-events: all;\n  cursor: pointer;\n  background: none;\n  border: none;\n  padding: 0;\n  height: 22px;\n  position: absolute;\n  right: -13px;\n  top: -13px;\n  box-shadow: -1px 5px 10px 3px rgba(79, 110, 253, 0.3);\n  border-radius: 100%;\n  background-color: rgb(79, 110, 253);\n}\n.CloseButton:hover {\n  background-color: rgb(70, 100, 234);\n}\n.CloseButton:active {\n  background-color: rgb(58, 83, 194);\n}\n.CloseButton svg {\n  fill: rgb(79, 110, 253);\n  scale: 1;\n}\n.CloseButton svg:hover {\n  fill: rgb(70, 100, 234);\n}\n.CloseButton svg:active {\n  fill: rgb(58, 83, 194);\n}\n\n.TranslateButton {\n  cursor: pointer;\n  background: none;\n  border: none;\n  height: 30px;\n  width: 30px;\n  background-color: rgb(79, 110, 253);\n  border-radius: 7px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.TranslateButton:hover {\n  background-color: rgb(70, 100, 234);\n}\n.TranslateButton:active {\n  background-color: rgb(58, 83, 194);\n}\n.TranslateButton svg {\n  height: 100%;\n  width: 100%;\n}\n\n.SaveButton {\n  cursor: pointer;\n  background: none;\n  border: none;\n  height: 30px;\n  width: 30px;\n  background-color: rgb(79, 110, 253);\n  border-radius: 7px;\n}\n.SaveButton:hover {\n  background-color: rgb(70, 100, 234);\n}\n.SaveButton:active {\n  background-color: rgb(58, 83, 194);\n}\n.SaveButton svg {\n  height: 100%;\n  width: 100%;\n}\n\n.lds-dual-ring {\n  display: flex;\n  height: 30px;\n  width: 30px;\n  justify-content: center;\n  align-items: center;\n}\n\n.lds-dual-ring:after {\n  content: "";\n  display: block;\n  height: 15px;\n  width: 15px;\n  border-radius: 50%;\n  border: 2px solid #fff;\n  border-color: #fff transparent #fff transparent;\n  animation: lds-dual-ring 1.2s linear infinite;\n}\n\n@keyframes lds-dual-ring {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}';
addHmrIntoView("pages/content");
const root = document.createElement("div");
root.id = "elang_speach_extension";
document.body.insertBefore(root, document.body.childNodes[0]);
const rootIntoShadow = document.createElement("div");
rootIntoShadow.id = "shadow-root";
const shadowRoot = root.attachShadow({ mode: "open" });
shadowRoot.appendChild(rootIntoShadow);
const styleElement = document.createElement("style");
styleElement.innerHTML = injectedStyle;
shadowRoot.appendChild(styleElement);
createRoot(rootIntoShadow).render(/* @__PURE__ */ jsxRuntimeExports.jsx(App, {}));
