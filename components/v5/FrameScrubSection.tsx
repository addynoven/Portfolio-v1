import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';

interface FrameScrubSectionProps {
  /** e.g. "./sections/section1/frame_" — frame number + ".jpg" will be appended */
  framePathPrefix: string;
  /** total number of source frames on disk */
  totalFrames: number;
  /** digits for zero-padding the frame number (default 4) */
  padLength?: number;
  /** outer scroll height — more = slower scrub (default "300vh") */
  scrollHeight?: string;
  /** fallback background while frames load */
  bgColor?: string;
  /** cover zoom factor (default 1.0 = no zoom) */
  zoom?: number;
  /** overlay content rendered over the canvas */
  children?: ReactNode;
  /** optional top/bottom fade to adjacent sections (default true) */
  edgeFades?: boolean;
  /** How many times the frame sequence cycles across the full section scroll.
   *  Default 1 (plays once). Use >1 for clips that are natural loops so the
   *  animation feels kinetic instead of "played once and stopped". */
  loops?: number;
  /** Display every Nth source frame instead of all. Default 1.
   *  Use >1 to subsample dense clips (e.g. 672-frame clip with step=4 plays 168
   *  effective frames). Skipped frames are NEVER preloaded — bandwidth saved. */
  framesStep?: number;
  /** File extension on disk (no dot). Default 'jpg' so whale + space keep
   *  working. Optimized sections use 'avif'. */
  extension?: string;
  /** Observer trigger margin (default "500px 0px") */
  rootMargin?: string;
}

/**
 * Scroll-scrubbed frame sequence. Frames lazy-load when the section approaches
 * the viewport, so heavy sequences don't block first paint.
 */
export default function FrameScrubSection({
  framePathPrefix,
  totalFrames,
  padLength = 4,
  scrollHeight = '300vh',
  bgColor = '#000',
  zoom = 1,
  children,
  edgeFades = true,
  loops = 1,
  framesStep = 1,
  extension = 'jpg',
  rootMargin = '500px 0px',
}: FrameScrubSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Frames are pulled only when the section approaches the viewport. This keeps
  // the first screen from competing with thousands of below-the-fold requests.
  const loadedRef = useRef(false);

  // Source frame numbers we'll actually preload + display.
  // e.g. totalFrames=672, framesStep=4 → [1, 5, 9, 13, ... 669] (168 entries)
  const frameNumbers = useMemo(() => {
    const step = Math.max(1, Math.floor(framesStep));
    const nums: number[] = [];
    for (let i = 1; i <= totalFrames; i += step) nums.push(i);
    return nums;
  }, [framesStep, totalFrames]);
  const effectiveCount = frameNumbers.length;

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    const images: HTMLImageElement[] = new Array(effectiveCount);
    const firstSrc = `${framePathPrefix}${frameNumbers[0].toString().padStart(padLength, '0')}.${extension}`;
    let cancelled = false;
    let count = 0;
    let cursor = 1;

    const markDone = (idx: number) => {
      if (cancelled) return;
      count++;
      if (idx === 0 && !loadedRef.current) {
        imagesRef.current = images;
        loadedRef.current = true;
        drawFrame(0);
      }
      if (count === effectiveCount) {
        imagesRef.current = images;
        loadedRef.current = true;
        drawFrame(currentFrameRef.current);
      }
    };

    const loadAt = (idx: number) =>
      new Promise<void>(resolve => {
        const sourceFrame = frameNumbers[idx];
        const img = new Image();
        images[idx] = img;
        const done = () => {
          markDone(idx);
          resolve();
        };
        img.onload = done;
        img.onerror = done;
        img.src = idx === 0
          ? firstSrc
          : `${framePathPrefix}${sourceFrame.toString().padStart(padLength, '0')}.${extension}`;
      });

    const worker = async () => {
      while (!cancelled && cursor < effectiveCount) {
        const idx = cursor++;
        await loadAt(idx);
      }
    };

    loadAt(0).then(() => {
      for (let i = 0; i < 6; i++) worker();
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveCount, extension, frameNumbers, framePathPrefix, padLength, shouldLoad]);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    let img = imagesRef.current[index];
    if (!img?.complete || img.naturalWidth === 0) {
      for (let i = index - 1; i >= 0; i--) {
        if (imagesRef.current[i]?.complete && imagesRef.current[i].naturalWidth > 0) {
          img = imagesRef.current[i];
          break;
        }
      }
    }
    if (!canvas || !ctx || !img || !img.complete || img.naturalWidth === 0) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cw = canvas.width;
    const ch = canvas.height;
    const ir = img.width / img.height;
    const cr = cw / ch;

    let dw = cw, dh = ch, ox = 0, oy = 0;
    if (cr > ir) {
      dh = cw / ir;
      oy = (ch - dh) / 2;
    } else {
      dw = ch * ir;
      ox = (cw - dw) / 2;
    }

    if (zoom !== 1) {
      const zw = dw * zoom;
      const zh = dh * zoom;
      ox -= (zw - dw) / 2;
      oy -= (zh - dh) / 2;
      dw = zw;
      dh = zh;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, ox, oy, dw, dh);
  };

  // Scroll → frame mapping (index into the sampled array, not the source range)
  useEffect(() => {
    const handleScroll = () => {
      const node = sectionRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const scrollable = node.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));
      const loopedProgress = loops > 1 ? (progress * loops) % 1 : progress;
      const frameIndex = Math.min(
        effectiveCount - 1,
        Math.floor(loopedProgress * effectiveCount),
      );

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
      }
    };

    const handleResize = () => drawFrame(currentFrameRef.current);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [effectiveCount, loops]);

  return (
    <div ref={sectionRef} className="relative w-full" style={{ height: scrollHeight }}>
      <div
        className="sticky top-0 w-full h-screen overflow-hidden"
        style={{ backgroundColor: bgColor }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full will-change-transform" />

        {edgeFades && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-[20vh] bg-gradient-to-b from-black via-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-[20vh] bg-gradient-to-t from-black to-transparent" />
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
