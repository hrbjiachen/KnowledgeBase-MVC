const logout = async () => {
  await callServer("logout", "POST");
  window.location = window.location.origin;
};

const callServer = async (path, method, data) => {
  try {
    let url = `${window.location.origin}/${path}`;
    let response;

    if (data) {
      response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
    } else {
      response = await fetch(url, { method });
    }

    return await response.json();
  } catch (e) {
    return e;
  }
};
