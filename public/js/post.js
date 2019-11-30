const submitReply = async () => {
  const post_id = document.getElementById("post-id").innerHTML;
  const detail = document.getElementById("reply-detail").value;

  if (detail.trim() !== "") {
    const result = await callServer("post/reply", "POST", {
      post_id,
      detail
    });
    showToastMessage("Reply submitted!");
    clearReplyForm();
  } else {
    showToastMessage("Input cannot be empty!");
  }
};

const clearReplyForm = () => {
  document.getElementById("reply-detail").value = "";
};