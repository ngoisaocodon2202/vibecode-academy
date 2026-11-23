import Image from "next/image";

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <Image
      src="/logos/vibecode-mark-192.png"
      alt="VibeCode Academy"
      width={size}
      height={size}
      className="rounded-lg"
      priority
    />
  );
}
