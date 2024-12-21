const API_BASE = "https://invidious.snopyta.org/api/v2"; // v2エンドポイント
const videoContainer = document.getElementById("video-container");
const searchForm = document.getElementById("search-form");
const searchQuery = document.getElementById("search-query");

// 検索フォームの送信時にAPIリクエスト
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = searchQuery.value;
  videoContainer.innerHTML = "<p>検索中...</p>";

  try {
    const response = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}&type=video`);
    if (!response.ok) throw new Error("APIエラー: " + response.status);
    const data = await response.json();

    displayVideos(data);
  } catch (error) {
    console.error(error);
    videoContainer.innerHTML = `<p>エラーが発生しました: ${error.message}</p>`;
  }
});

// 動画データをHTMLに反映
function displayVideos(videos) {
  videoContainer.innerHTML = ""; // コンテナをリセット

  if (videos.length === 0) {
    videoContainer.innerHTML = "<p>結果が見つかりませんでした。</p>";
    return;
  }

  videos.forEach((video) => {
    const videoElement = document.createElement("div");
    videoElement.className = "video-item";
    videoElement.innerHTML = `
      <h3>${video.title}</h3>
      <a href="https://www.youtube.com/watch?v=${video.videoId}" target="_blank">
        <img src="${video.videoThumbnails[0].url}" alt="${video.title}">
      </a>
      <p>投稿者: ${video.author}</p>
    `;
    videoContainer.appendChild(videoElement);
  });
}
