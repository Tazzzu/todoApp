class RequestManager {
  request = (path, method, body) => {
    const result = fetch(path, {
      method: method,
      body: body ? JSON.stringify(body) : undefined,
    });
    return result;
  };
}

export const requestManager = new RequestManager();
