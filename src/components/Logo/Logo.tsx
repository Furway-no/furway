import { Media } from "@/payload-types";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface Props {
  className?: string;
  loading?: "lazy" | "eager";
  priority?: "auto" | "high" | "low";
  media: Media;
  maxHeight: number;
}

export const Logo = ({
  media,
  maxHeight,
  className,
  loading = "lazy",
  priority = "low",
}: Props) => {
  if (!media?.url) return null;

  const url = media.url.replace(/\/api\/media\/file\//, "/media/");
  const width = media.width ?? undefined;
  const height = media.height ?? undefined;

  return (
    <div className={clsx("relative flex items-center justify-center", className)}>
      <div className="max-w-full w-auto h-auto overflow-hidden">
        <Image
          alt="Logo"
          src={url}
          width={width}
          height={height}
          layout="intrinsic"
          loading={loading}
          priority={priority === "high"}
          className="h-auto w-auto"
          style={{ maxHeight: `${maxHeight}px` }}
        />
      </div>
    </div>
  );
};
