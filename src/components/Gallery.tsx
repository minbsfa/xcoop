import Image from "next/image";

export default function Gallery() {
  const images = [
    "/1 (1).jpg",
    "/1 (2).jpg",
    "/1 (3).jpg",
    "/1 (4).jpg",
    "/1 (5).jpg",
    "/1 (6).jpg",
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {images.map((src) => (
        <div key={src} className="overflow-hidden rounded-xl border border-[color:var(--border)]">
          <Image src={src} alt="cooperative" width={800} height={600} className="h-40 w-full object-cover md:h-48" />
        </div>
      ))}
    </div>
  );
}


