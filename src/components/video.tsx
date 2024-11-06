export function Video() {
  return (
    <video
      width="800"
      height="auto"
      preload="none"
      className="h-full w-full rounded-3xl object-cover md:rounded-full"
      autoPlay
      loop
      muted
    >
      <source
        src={
          "https://njowvzjporohgzvgfyif.supabase.co/storage/v1/object/public/assets/hero-video.mp4?t=2024-11-06T04%3A59%3A26.033Z"
        }
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  );
}
