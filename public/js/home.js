const logout = async () => {
  await callServer("logout", "POST");
  window.location = window.location.origin;
};

const submitPost = async () => {
  const subject = document.getElementById("subject").value;
  const detail = document.getElementById("detail").value;
  const topic = document.getElementById("topic").value;

  if (subject.trim() !== "" && detail.trim() !== "" && topic.trim() !== "") {
    const result = await callServer("post/add", "POST", {
      subject,
      detail,
      topic
    });
    showToastMessage("Post submitted!");
    clearForm();
  } else {
    showToastMessage("Input cannot be empty!");
  }
};

const clearForm = () => {
  document.getElementById("subject").value = "";
  document.getElementById("detail").value = "";
  document.getElementById("topic").value = "";
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

const searchPost = async () => {
  const key = document.getElementById("searchBar").value;
  if (key.trim() !== "") {
    const result = await callServer("post/search", "POST", {
      key
    });
    showToastMessage("Post submitted!");
//    console.log(result)
  } else {
    showToastMessage("Input cannot be empty!");
  }
};

const showToastMessage = msg => {
  let toastMessage = document.getElementById("snackbar");
  toastMessage.innerText = msg;

  toastMessage.classList.add("show");
  setTimeout(() => {
    toastMessage.classList.remove("show");
  }, 2000);
};

const shouldShowToast = () => {
  if (document.querySelector("#postSubmitted")) {
    showToastMessage("Post submitted");
  }
};

shouldShowToast();
