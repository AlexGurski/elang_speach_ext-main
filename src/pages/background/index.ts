import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
import "webextension-polyfill";
import { getTranslateFromAPI } from "./utils/getTranslateFromAPI";
reloadOnUpdate("pages/background");

reloadOnUpdate("pages/content/style.scss");

export const getTranslate = async (request, sender, sendResponse) => {
  const data = await getTranslateFromAPI(request.text, "en", "ru");
  sendResponse(data);
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "translate") {
    getTranslate(request, sender, sendResponse);
  }
  return true;
});


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log(changeInfo);
  console.log('asdadsadasdasdadadada')
  
  // if (changeInfo) {
  //   // chrome.tabs.sendMessage(tabId, {
  //   //   message: "change",
  //   // });

      
  //     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //       chrome.tabs.sendMessage(tabs[0].id, {
  //         message: "change",
  //       });
  //     });
  // }
  return true;
});
