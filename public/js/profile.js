const messages = async id => {
  window.location = window.location.origin + "/messages/" + id;
};

const like = async (id, likes) => {
  sendLike(id, likes)
    .then(data => {
      document.getElementById("likes").innerText = data.likes;
    })
    .catch(error => {
      console.error(error);
    });
};

const sendLike = async id => {
  try {
    let url = `${window.location.origin}/edit/likes/add`;
    let response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id
      })
    });
    return await response.json();
  } catch (error) {
    Promise.reject(error);
  }
};
