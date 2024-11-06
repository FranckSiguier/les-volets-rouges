export function Video({ path }: { path: string }) {
  return (
    <video
      width="800"
      height="auto"
      preload="none"
      className="h-full w-full rounded-full object-cover"
      autoPlay
      loop
      muted
    >
      <source src={path} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
