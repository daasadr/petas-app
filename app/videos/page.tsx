import { getVideoPage } from '../../sanity/sanity-utils'

export default async function Videos() {
  const videoPage = await getVideoPage();

  return (
    <div>
      <h1>Videa</h1>
      {videoPage.videos.map((video, index) => (
        <div key={index}>
          {video.videoType === 'youtube' ? (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.youtubeVideoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <video src={video.videoUrl} controls>
              Váš prohlížeč nepodporuje přehrávání videa.
            </video>
          )}
          <p>{video.caption}</p>
        </div>
      ))}
    </div>
  )
}