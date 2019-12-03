let curUser = 0;
let curSubject = "";
let prevChatTileId = "";

const onChatTile = (id, subject) => {
  event.preventDefault();
  if (prevChatTileId) {
    let prevElement = document.getElementById(prevChatTileId);
    prevElement.setAttribute("class", "chat-tile");
  }
  let element = document.getElementById(`${id}-${subject}`);
  element.setAttribute("class", "chat-tile active-chat");
  prevChatTileId = `${id}-${subject}`;

  curUser = id;
  curSubject = subject;
  pullChatHistory(id, subject)
    .then(({ rows, avatar }) => {
      renderChatbox(rows, avatar);
    })
    .catch(error => {
      console.log(error);
    });
};

const renderChatbox = (messages, avatar) => {
  cleanUpChatbox();
  let chatBox = document.getElementsByClassName("chat-box")[0];

  if (!messages || !messages.length) {
    return;
  }

  let container = new Set();

  messages.forEach(message => {
    const messageDate = new Date(message.time_sent);
    const dateString = `${messageDate.toLocaleString("default", {
      month: "short"
    })} ${messageDate.getDay() + 1}`;

    let subcontainer;
    if (container.has(dateString)) {
      subcontainer = document.querySelector(`.${dateString.replace(" ", "_")}`);
    } else {
      container.add(dateString);
      subcontainer = document.createElement("div");
      subcontainer.setAttribute(
        "class",
        `chat_container ${dateString.replace(" ", "_")}`
      );

      let dateObject = document.createElement("p");
      dateObject.textContent = dateString;
      dateObject.setAttribute("class", "date");

      subcontainer.appendChild(dateObject);
      chatBox.appendChild(subcontainer);
    }

    subcontainer.appendChild(renderMessage(message, avatar, messageDate));
    chatBox.scrollTop = chatBox.scrollHeight;
  });
};

const renderMessage = (message, avatar, messageDate) => {
  const msgDiv = document.createElement("div");
  msgDiv.setAttribute("class", "chat-content-div");
  const { sender_id, fname, lname } = message;

  let messageAvatar = document.createElement("img");
  const sender = avatar.find(user => user.user_id == sender_id);
  messageAvatar.setAttribute("class", "avatar-thumbnail circle");
  messageAvatar.src = sender ? sender.imgurl : "";
  messageAvatar.alt = "User Avatar";

  let aTag = document.createElement("a");
  aTag.href = `/profile/${sender.user_id}`;
  aTag.appendChild(messageAvatar);

  let contentDiv = document.createElement("div");
  contentDiv.setAttribute("class", "chat-header");

  let messageSender = document.createElement("h3");
  messageSender.textContent = `${fname} ${lname}  ·  `;
  messageSender.setAttribute("class", "sender");

  let timeDiv = document.createElement("span");
  timeDiv.textContent = `${formatAMPM(messageDate)}`;
  messageSender.appendChild(timeDiv);

  let messageContent = document.createElement("div");
  messageContent.textContent = message.message_content;

  contentDiv.appendChild(messageSender);
  contentDiv.appendChild(messageContent);

  msgDiv.appendChild(aTag);
  msgDiv.appendChild(contentDiv);

  return msgDiv;
};

const formatAMPM = date => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

const cleanUpChatbox = () => {
  let chatBox = document.getElementsByClassName("chat-box")[0];

  while (chatBox.firstChild) {
    let child = chatBox.firstChild;
    chatBox.removeChild(child);
  }
};

const onSendMessage = event => {
  event.preventDefault();
  let message = document.getElementById("chat-message-form").value;

  // TODO: Toast for empty box
  if (!message || curUser === 0) return;
  sendMessage(message, curUser, curSubject, false)
    .then(data => {
      pullChatHistory(curUser, curSubject)
        .then(({ rows, avatar }) => {
          cleanUpChatbox();
          renderChatbox(rows, avatar);
        })
        .catch(error => {
          console.error(error);
        });
      document.getElementById("chat-message-form").value = "";
    })
    .catch(error => {
      console.error(error);
    });
};

const onSendInitialMessage = (event, user) => {
  event.preventDefault();

  let subject = document.getElementById("message-subject").value;
  let message = document.getElementById("message-content").value;

  if (!subject || !message) return;

  sendMessage(message, user, subject, true)
    .then(data => {
      window.location = `${window.origin}/profile/${user}`;
    })
    .catch(error => {
      console.error(error);
    });
};

const sendMessage = async (message, id, subject, isInitialMessage) => {
  try {
    let url = `${window.location.origin}/message/user/${id}`;
    let response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: subject,
        message: message,
        isInitialMessage: isInitialMessage
      })
    });

    return await response.json();
  } catch (error) {
    Promise.reject(error);
  }
};

const pullChatHistory = async (id, subject) => {
  if (subject.split(" ").length > 1) {
    subject = subject.split(" ").join("+");
  }

  try {
    let url = `${window.location.origin}/message/user/${id}/${subject}/history`;
    let response = await fetch(url, {
      headers: { "Content-Type": "application/json" }
    });

    return await response.json();
  } catch (error) {
    Promise.reject(error);
  }
};

const logout = async () => {
  try {
    let url = `${window.location.origin}/logout`;
    let response = await fetch(url, { method: "POST" });
    window.location = window.location.origin;
  } catch (error) {
    console.log(error);
  }
};
