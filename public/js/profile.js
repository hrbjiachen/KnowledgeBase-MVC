const messages = async () => {
  await callServer("messages", "GET");
  window.location = window.location.origin;
};
