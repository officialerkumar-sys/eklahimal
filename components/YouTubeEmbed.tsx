function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/\s]+)/,
    /youtube\.com\/shorts\/([^&?/\s]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

interface YouTubeEmbedProps {
  url: string
  title?: string
}

export default function YouTubeEmbed({ url, title = 'film' }: YouTubeEmbedProps) {
  const videoId = extractYouTubeId(url)
  if (!videoId) return null

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16/9',
        backgroundColor: '#000',
      }}
    >
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&color=white`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          border: 'none',
        }}
      />
    </div>
  )
}
