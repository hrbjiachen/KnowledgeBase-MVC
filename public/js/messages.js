let curUser = 0;
let curSubject = "";

const onChatTile = (id, subject) => {
    event.preventDefault();

    curUser = id;
    curSubject = subject;

    cleanUpChatbox();
    pullChatHistory(id, subject).then(data => {
        renderChatbox(data);
    }).catch(error => {
        console.log(error);
    });
}

const renderChatbox = (messages) => {
    let chatBox = document.getElementsByClassName("chat-box")[0];

    messages.forEach(message => {
        let messageSender = document.createElement("h3");
        messageSender.textContent = `${message.fname} ${message.lname}`;

        let messageContent = document.createElement("p");
        messageContent.textContent = message.message_content;

        chatBox.appendChild(messageSender);
        chatBox.appendChild(messageContent);

    });
}

const cleanUpChatbox = () => {
    let chatBox = document.getElementsByClassName("chat-box")[0];

    while (chatBox.firstChild) {
        let child = chatBox.firstChild;
        chatBox.removeChild(child);
    }
}

const onSendMessage = (event) => {
    event.preventDefault();
    let message = document.getElementById("chat-message-form").value;

    // TODO: Toast for empty box
    if (!message) return;

    sendMessage(message, curUser, curSubject).then((data) => {
        pullChatHistory(curUser, curSubject).then((response) => {
            cleanUpChatbox();
            renderChatbox(response);
        }).catch((error) => {
            console.error(error);
        });
        document.getElementById("chat-message-form").value = "";
    }).catch((error) => {
        console.error(error);
    });
}

const sendMessage = async (message, id, subject) => {
    try {
        let url = `${window.location.origin}/message/user/${id}`;
        let response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "subject": subject,
                "message": message
            })
        });

        return await response.json();
    } catch (error) {
        Promise.reject(error);
    }
}

const pullChatHistory = async (id, subject) => {
    try {
        let url = `${window.location.origin}/message/user/${id}/${subject}/history`;
        let response = await fetch(url, {
            headers: { "Content-Type": "application/json" }
        });

        return await response.json();
    } catch (error) {
        Promise.reject(error);
    }
}

const logout = async () => {
    try {
        let url = `${window.location.origin}/logout`;
        let response = await fetch(url, { method: "POST" });
        window.location = window.location.origin;
    } catch (error) {
        console.log(error);
    }
}