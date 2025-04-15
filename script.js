const API_URL = 'https://comment-backend-7w97.onrender.com/api/comment';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('commentForm');
  const messageInput = document.getElementById('message');
  const status = document.getElementById('status');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const message = messageInput.value.trim();
    if (!message) {
      status.textContent = 'Please enter a comment.';
      return;
    }

    status.textContent = 'Sending...';

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      const data = await res.json();
      console.log('Server response:', data);

      if (res.ok && data.success) {
        status.textContent = 'Comment sent!';
        messageInput.value = '';
      } else {
        status.textContent = 'Server Error: ' + (data.message || 'Unknown error');
      }
    } catch (err) {
      console.error('Fetch Error:', err);
      status.textContent = 'Network error: ' + err.message;
    }
  });
});
