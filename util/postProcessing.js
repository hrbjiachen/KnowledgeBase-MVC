function postProcessing(posts) {
  // Process details
  for (let index = 0; index < posts.length; index++) {
    const post = posts[index];

    // Omit long text
    const threshold = 130;
    if (post["detail"].length > threshold + 3) {
      post["detail"] = post["detail"].substr(0, threshold) + '...';
    }
    // Reply
    if (post["replies_count"] == 0) {
      post["replies_count"] = 'Reply';
    } else if (post["replies_count"] == 1) {
      post["replies_count"] = post["replies_count"] + ' reply';
    } else {
      post["replies_count"] = post["replies_count"] + ' replies';
    }

  }
}
module.exports = postProcessing;
