function postProcessing(posts) {
  // Process details
  for (let index = 0; index < posts.length; index++) {
    const post = posts[index];

    // Omit long subject
    const thresholdSubject = 35;
    if (post["subject"].length > thresholdSubject + 3) {
      post["subject"] = post["subject"].substr(0, thresholdSubject) + '...';
    }

    // Omit long post detail
    const thresholdDetail = 130;
    if (post["detail"].length > thresholdDetail + 3) {
      post["detail"] = post["detail"].substr(0, thresholdDetail) + '...';
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
