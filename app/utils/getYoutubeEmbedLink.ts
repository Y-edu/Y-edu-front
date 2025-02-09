export const getYoutubeEmbedLink = (url: string) => {
  const videoIdMatch = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=))([^&]+)/,
  );
  return videoIdMatch
    ? `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=0`
    : "";
};
