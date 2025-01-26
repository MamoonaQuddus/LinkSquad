document.getElementById('searchBtn').addEventListener('click', function () {
  const profileUrl = document.getElementById('profileUrl').value;
  const keyword = document.getElementById('keyword').value;
  const errorDiv = document.getElementById('error');
  const resultsDiv = document.getElementById('results');

  // Clear previous results and errors
  errorDiv.innerHTML = '';
  resultsDiv.innerHTML = '';

  // Check if both fields are filled
  if (!profileUrl || !keyword) {
    errorDiv.innerHTML = 'Both Profile URL and Keyword are required.';
    return;
  }

  // Construct query to backend with both the profile URL and keyword
  const requestData = {
    profileUrl: profileUrl,
    keyword: keyword
  };

  // Fetch posts from the backend API (replace actual API URL)
  fetch('https://api.example.com/getLinkedInPosts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  })
    .then(response => response.json())
    .then(data => {
      if (data.posts && data.posts.length > 0) {
        // Display URLs as clickable links
        data.posts.forEach(post => {
          const postLink = document.createElement('a');
          postLink.href = post.url; // Assuming the backend provides the URL for each post
          postLink.target = '_blank'; // Open in a new tab
          postLink.rel = 'noopener noreferrer'; // Security measure
          postLink.textContent = post.url; // Display the URL as text
          postLink.classList.add('post-link');

          // Wrap the link in a container div for styling
          const postDiv = document.createElement('div');
          postDiv.classList.add('post');
          postDiv.appendChild(postLink);

          resultsDiv.appendChild(postDiv);
        });
      } else {
        resultsDiv.innerHTML = '<p>No posts found related to your keyword.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
      errorDiv.innerHTML = 'Error fetching posts. Please try again.';
    });
});
