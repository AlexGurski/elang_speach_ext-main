import { useRef, useState, useCallback, useEffect } from "react";

export const getWordAt = (str: string, pos: number) => {
  str = String(str);
  pos = Number(pos) >>> 0;
  const left = str.slice(0, pos + 1).search(/\S+$/),
    right = str.slice(pos).search(/\s/);
  if (right < 0) {
    return str.slice(left);
  }
  return str.slice(left, right + pos);
};

export const App = () => {
  const documentRef = useRef(document);
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

    let lastPosition = expirience1
      .querySelector('span[aria-hidden="true"], span.visually-hidden')
      .textContent.trim();
    // console.log(lastPosition);
    let exp = expirience[0].getElementsByClassName("t-14 t-normal");
    const bufInfo = [];
    for (let i = 0; i < exp.length; i++) {
      bufInfo.push(
        exp[i]
          .querySelector('span[aria-hidden="true"], span.visually-hidden')
          .textContent.trim()
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
      link: window.location.href,
    };

    clipboard
      .writeText(String(JSON.stringify(lastWord)))
      .then(() => {
        console.log("Текст скопирован в буфер обмена");
      })
      .catch((err) => {
        console.error("Не удалось скопировать текст в буфер обмена: ", err);
      });

    return lastWord;
  };

  function waitForElementToExist(selector, callback) {
    const element = document.getElementsByClassName(selector);

    if (element && element.length > 0) {
      callback(element);
    } else {
      setTimeout(function () {
        waitForElementToExist(selector, callback);
      }, 1000);
    }
  }

  function waitForTextAreaToExist(selector, callback) {
    const element = document.getElementsByClassName(selector);
    if (element && element.length > 0) {
      callback(element);
    } else {
      setTimeout(function () {
        waitForElementToExist(selector, callback);
      }, 1000);
    }
  }

  const onClickElement = useCallback((event: any) => {
    if (event.key === "t" || event.key === "e") {
      const buttonMesage = document.getElementsByClassName(
        "artdeco-button artdeco-button--2 artdeco-button--primary ember-view pvs-profile-actions__action"
      );
      buttonMesage[0].click();

      waitForElementToExist(
        "artdeco-modal-overlay artdeco-modal-overlay--layer-default artdeco-modal-overlay--is-top-layer  ember-view",
        function (element) {
          console.log("Элемент появился:", element);
          const buttonPers = element[0].getElementsByClassName(
            "artdeco-button artdeco-button--muted artdeco-button--2 artdeco-button--secondary ember-view mr1"
          );
          buttonPers[0].click();
          // const paragraphElement = element[0].querySelector("p");
          // console.log((paragraphElement.textContent = String(JSON.stringify(getUserData()))));
        }
      );

      waitForTextAreaToExist(
        "ember-text-area ember-view connect-button-send-invite__custom-message mb3",
        function (element) {
          const STRING = String(JSON.stringify(getUserData()));
          console.log("Элемент textarea:", element);
          element[0].focus();

          element[0].value = STRING.slice(0, 199);
          element[0].blur();

          waitForElementToExist(
            "artdeco-button artdeco-button--2 artdeco-button--primary ember-view ml1",
            function (element) {
              console.log("button появился:", element);
              element[0].focus();
              element[0].disabled = false;
              setTimeout(() => {
                // element[0].click();
                
              }, 200);
            }
          );
        }
      );
    }
  }, []);

  useEffect(() => {
    // documentRef.current.addEventListener("click", );
    documentRef.current.addEventListener("keydown", onClickElement);
  }, []);

  return <></>;
};
