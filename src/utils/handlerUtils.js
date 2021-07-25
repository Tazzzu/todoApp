const validateElement = (element) => {
  if (element.addEventListener) {
    return true;
  }

  return false;
};

const validateEventName = (event) => {
  if (typeof event === "string") {
    return true;
  }

  return false;
};

const validateHandler = (handler) => {
  if (typeof handler === "function") {
    return true;
  }

  return false;
};

export const addHandlers = (element, event, listener) => {
  const isElementValide = validateElement(element);
  const isHandlersOfArray = Array.isArray(listener);
  const isEventValide = validateEventName(event);

  if (!isElementValide && !isEventValide) {
    return;
  }

  if (isHandlersOfArray) {
    listener.forEach((handler) => {
      const isHandlerValide = validateHandler(handler);

      if (isHandlerValide) {
        element.addEventListener(event, handler);
      }
    });

    return;
  }

  if (typeof listener === "function") {
    element.addEventListener(event, listener);
  }
};
