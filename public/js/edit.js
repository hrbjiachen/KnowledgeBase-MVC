const onSendEdit = (event, edit) => {
    event.preventDefault();

    let editItem = edit.value;

    if (!editItem.trim()) return;

    sendEdit(editItem,edit.name).then((data) => {
        edit.value = "";
    }).catch((error) => {
        console.error(error);
    });
}

const sendEdit = async (editItem,col) => {
    try {
        let url = `${window.location.origin}/edit/${col}`;
        let response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "col": editItem,
            })
        });
        return await response.json();
    } catch (error) {
        Promise.reject(error);
    }
}