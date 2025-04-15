const API_URL = 'https://comment-backend-7w97.onrender.com/api/comment';

document.getElementById('commentForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const message = document.getElementById('message').value;
  const status = document.getElementById('status');
  status.textContent = 'Sending...';

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    console.log('Server response:', data);

    if (data.success) {
      status.textContent = 'Comment sent!';
    } else {
      status.textContent = 'Error: ' + data.message;
    }

    document.getElementById('message').value = '';
  } catch (err) {
    console.error('Error:', err);
    status.textContent = 'Error sending comment.';
  }
});
