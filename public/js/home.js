// For latest posts
let page = 0;

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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    } else {
      response = await fetch(url, {
        method
      });
    }
    return await response.json();
  } catch (e) {
    return e;
  }
};

const searchPost = async () => {
  const key = document.getElementById("searchBar").value;
  if (key.trim() !== "") {
    const result = await callServer("/search", "POST", {
      key
    });
    showToastMessage("Post submitted!");
    console.log(result)
  } else {
    showToastMessage("Input cannot be empty!");
  }
};

const postsPaging = increment => {
  const latestPosts = document.getElementById("latest-post-div").children;
  const lastPageButton = document.getElementById("lastPageButton");
  const nextPageButton = document.getElementById("nextPageButton");
  const numOfPage = Math.ceil(latestPosts.length/2)
  page = page + increment;

  if(page == 0){
    lastPageButton.style.display =  "none";
  }else{
    lastPageButton.style.display =  "inline";
  }

  if(page == numOfPage - 1){
    nextPageButton.style.display =  "none";
  }else{
    nextPageButton.style.display =  "inline";
  }

  //Hide all posts first
  for (let index = 0; index < latestPosts.length; index++) {
    const post = latestPosts[index];
    post.style.display = "none";
  }

  for (let index = page*2; index < latestPosts.length & index < page * 2 + 2; index++) {
    const post = latestPosts[index];
    post.style.display = "";
  }
}

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
postsPaging(0);