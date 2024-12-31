const apiBaseUrl = 'https://yewtu.be/api/v1'; // 任意のInvidiousインスタンス
const resultsDiv = document.getElementById('results');

document.getElementById('searchButton').addEventListener('click', () => {
  const query = document.getElementById('searchQuery').value;

  fetch(`${apiBaseUrl}/search?q=${encodeURIComponent(query)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('APIリクエストが失敗しました');
      }
      return response.json();
    })
    .then(data => {
      resultsDiv.innerHTML = ''; // 結果をクリア
      data.forEach(video => {
        const videoDiv = document.createElement('div');
        videoDiv.innerHTML = `
          <h3>${video.title}</h3>
          <p>チャンネル: ${video.author}</p>
          <a href="https://yewtu.be/watch?v=${video.videoId}" target="_blank">動画を見る</a>
        `;
        resultsDiv.appendChild(videoDiv);
      });
    })
    .catch(error => {
      console.error('エラー:', error);
      resultsDiv.textContent = 'エラーが発生しました。';
    });
});
