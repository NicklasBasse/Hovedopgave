/**
 * Picture.tsx
 * ----------------------------------------------------------------------------
 * Lille genbrugelig <picture>-wrapper der serverer AVIF til moderne browsere
 * og falder tilbage til WebP. AVIF er ~30-50% mindre end WebP ved samme
 * visuelle kvalitet → markant lavere data-transfer og bedre Website Carbon score.
 */
import type { ImgHTMLAttributes } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  avifSrcSet?: string;
  webpSrcSet?: string;
  sizes?: string;
};

export function Picture({ avifSrcSet, webpSrcSet, sizes, className, ...img }: Props) {
  return (
    <picture className="contents">
      {avifSrcSet && <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />}
      {webpSrcSet && <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />}
      <img {...img} className={className} />
    </picture>
  );
}
