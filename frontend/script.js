document.addEventListener('DOMContentLoaded', async () => {
  const ctx = document.getElementById('postsChart').getContext('2d');
  try {
    const response = await fetch('/api/daily-posts?days=90');
    const data = await response.json();
    const labels = data.map(item => item.date);
    const counts = data.map(item => item.posts);
    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Posts per Day',
          data: counts,
          fill: false,
          borderWidth: 2,
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: { display: true, text: 'Date' }
          },
          y: {
            display: true,
            title: { display: true, text: 'Number of Posts' }
          }
        }
      }
    });
  } catch (err) {
    console.error('Error fetching data:', err);
  }
});
