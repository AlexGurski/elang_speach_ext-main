import { r as reactExports, j as jsxRuntimeExports, a as addHmrIntoView, c as createRoot } from "../../../assets/js/_virtual_reload-on-update-in-view.js";
import { w as withErrorBoundary, a as withSuspense } from "../../../assets/js/withErrorBoundary.js";
const extIcon = "/assets/png/ext_icon.chunk.png";
const storageMap = /* @__PURE__ */ new Map();
function useStorage(storage2) {
  const _data = reactExports.useSyncExternalStore(storage2.subscribe, storage2.getSnapshot);
  if (!storageMap.has(storage2)) {
    storageMap.set(storage2, wrapPromise(storage2.get()));
  }
  if (_data !== null) {
    storageMap.set(storage2, { read: () => _data });
  }
  return _data ?? storageMap.get(storage2).read();
}
function wrapPromise(promise) {
  let status = "pending";
  let result;
  const suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }
  };
}
var StorageType = /* @__PURE__ */ ((StorageType2) => {
  StorageType2["Local"] = "local";
  StorageType2["Sync"] = "sync";
  StorageType2["Managed"] = "managed";
  StorageType2["Session"] = "session";
  return StorageType2;
})(StorageType || {});
async function updateCache(valueOrUpdate, cache) {
  function isFunction(value) {
    return typeof value === "function";
  }
  function returnsPromise(func) {
    return func instanceof Promise;
  }
  if (isFunction(valueOrUpdate)) {
    if (returnsPromise(valueOrUpdate)) {
      return await valueOrUpdate(cache);
    } else {
      return valueOrUpdate(cache);
    }
  } else {
    return valueOrUpdate;
  }
}
let globalSessionAccessLevelFlag = false;
function checkStoragePermission(storageType) {
  if (chrome.storage[storageType] === void 0) {
    throw new Error(`Check your storage permission in manifest.json: ${storageType} is not defined`);
  }
}
function createStorage(key, fallback, config) {
  let cache = null;
  let listeners = [];
  const storageType = (config == null ? void 0 : config.storageType) ?? "local";
  const liveUpdate = (config == null ? void 0 : config.liveUpdate) ?? false;
  if (globalSessionAccessLevelFlag === false && storageType === "session" && (config == null ? void 0 : config.sessionAccessForContentScripts) === true) {
    checkStoragePermission(storageType);
    chrome.storage[storageType].setAccessLevel({
      accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS"
      /* ExtensionPagesAndContentScripts */
    });
    globalSessionAccessLevelFlag = true;
  }
  const _getDataFromStorage = async () => {
    checkStoragePermission(storageType);
    const value = await chrome.storage[storageType].get([key]);
    return value[key] ?? fallback;
  };
  const _emitChange = () => {
    listeners.forEach((listener) => listener());
  };
  const set = async (valueOrUpdate) => {
    cache = await updateCache(valueOrUpdate, cache);
    await chrome.storage[storageType].set({ [key]: cache });
    _emitChange();
  };
  const subscribe = (listener) => {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };
  const getSnapshot = () => {
    return cache;
  };
  _getDataFromStorage().then((data) => {
    cache = data;
    _emitChange();
  });
  async function _updateFromStorageOnChanged(changes) {
    if (changes[key] === void 0)
      return;
    const valueOrUpdate = changes[key].newValue;
    if (cache === valueOrUpdate)
      return;
    cache = await updateCache(valueOrUpdate, cache);
    _emitChange();
  }
  if (liveUpdate) {
    chrome.storage[storageType].onChanged.addListener(_updateFromStorageOnChanged);
  }
  return {
    get: _getDataFromStorage,
    set,
    getSnapshot,
    subscribe
  };
}
const storage = createStorage(
  "Storage-speach-ext",
  { theme: "light", extensionEnabled: true },
  {
    storageType: StorageType.Local,
    liveUpdate: true
  }
);
const extensionStorage = {
  ...storage,
  toggleTheme: () => {
    storage.set((storage2) => {
      return {
        theme: storage2.theme === "light" ? "dark" : "light",
        extensionEnabled: storage2.extensionEnabled
      };
    });
  },
  toggleExtension: (isEnabled) => {
    storage.set((storage2) => {
      return {
        theme: storage2.theme,
        extensionEnabled: isEnabled
      };
    });
  }
};
const Switch = ({ isChecked, toggleSwitch }) => {
  const onClickSwitch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSwitch();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", id: "switch", checked: isChecked }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { onClick: (e) => onClickSwitch(e), htmlFor: "switch" })
  ] });
};
const Popup = () => {
  const { extensionEnabled } = useStorage(extensionStorage);
  const [isExtensionON, toggleExtension] = reactExports.useState(extensionEnabled);
  const onToggleExtension = () => {
    toggleExtension(!isExtensionON);
    extensionStorage.toggleExtension(!isExtensionON);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "App", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "App-header", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "LogoContainer", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: extIcon, className: "App-logo", alt: "logo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "LogoTitle", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "Title", children: "eLang" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "Subtitle", children: " Text to Speach" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { isChecked: isExtensionON, toggleSwitch: onToggleExtension })
  ] }) });
};
const Popup$1 = withErrorBoundary(
  withSuspense(Popup, /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: " Loading ... " })),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: " Error Occur " })
);
addHmrIntoView("pages/popup");
function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  const root = createRoot(appContainer);
  root.render(/* @__PURE__ */ jsxRuntimeExports.jsx(Popup$1, {}));
}
init();
