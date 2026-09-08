import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Card {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  /** Path (from public/) to a representative still */
  image: string;
  accent: string;
}

interface HorizontalGalleryProps {
  heading: string;
  eyebrow: string;
  cards: Card[];
}

/**
 * Awwwards-style pinned horizontal scroll. Vertical page scroll drives a
 * horizontal translate over the track. Each card tilts toward the cursor and
 * its image zooms on hover.
 */
export default function HorizontalGallery({
  heading,
  eyebrow,
  cards,
}: HorizontalGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Pin the section and translate the track horizontally from 0 to -(width - viewport)
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getOffset = () => -(track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: getOffset,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.6,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
          onUpdate: self => {
            if (progress) progress.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      return () => tween.scrollTrigger?.kill();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section-id="gallery"
      data-accent="#ffffff"
      data-cursor-label="DRAG"
      className="relative w-full h-screen bg-black overflow-hidden pointer-events-auto"
    >
      {/* Section label */}
      <div className="absolute top-10 left-[5%] z-20 pointer-events-none">
        <div className="flex items-center gap-3 mb-3">
          <span className="block w-8 h-[1px] bg-white/60" />
          <p className="font-mono text-[10px] tracking-[0.3em] text-white/60 uppercase">
            {eyebrow}
          </p>
        </div>
        <h2 className="font-sans font-medium leading-[1] tracking-tight text-white text-[clamp(1.5rem,2.5vw,2.5rem)]">
          {heading}
        </h2>
      </div>

      {/* Scroll-count — "01 / 04" live index */}
      <div
        data-scroll
        data-scroll-speed="0.15"
        className="absolute top-10 right-[5%] z-20 pointer-events-none font-mono text-[10px] tracking-[0.3em] text-white/60 uppercase"
      >
        {cards.length.toString().padStart(2, '0')} CHAPTERS
      </div>

      {/* Progress bar bottom */}
      <div className="absolute bottom-[5%] left-[5%] right-[5%] z-20 pointer-events-none">
        <div className="relative h-[1px] bg-white/10 overflow-hidden">
          <div
            ref={progressRef}
            className="absolute inset-0 bg-white origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>

      {/* Horizontal track */}
      <div className="absolute inset-0 flex items-center">
        <div
          ref={trackRef}
          className="flex items-center gap-8 md:gap-12 pl-[5%] will-change-transform"
        >
          {cards.map((card, i) => (
            <GalleryCard key={card.id} card={card} index={i} />
          ))}
          {/* End-rail gutter so last card can breathe */}
          <div className="shrink-0 w-[20vw]" />
        </div>
      </div>

      {/* Horizontal drag hint */}
      <div className="absolute bottom-[12%] right-[5%] z-20 pointer-events-none flex items-center gap-3">
        <div className="w-8 h-[1px] bg-white/40" />
        <p className="font-mono text-[10px] tracking-[0.25em] text-white/60 uppercase">
          Scroll → Horizontal
        </p>
      </div>
    </section>
  );
}

function GalleryCard({ card, index }: { card: Card; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Tilt + image zoom on cursor hover
  useEffect(() => {
    const node = cardRef.current;
    const image = imageRef.current;
    if (!node || !image) return;

    const xTo = gsap.quickTo(node, 'rotationY', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(node, 'rotationX', { duration: 0.5, ease: 'power3.out' });

    const handleMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      xTo(x * 18);
      yTo(-y * 18);
    };

    const handleEnter = () => {
      gsap.to(image, { scale: 1.08, duration: 0.6, ease: 'power3.out' });
    };
    const handleLeave = () => {
      xTo(0);
      yTo(0);
      gsap.to(image, { scale: 1, duration: 0.6, ease: 'power3.out' });
    };

    node.addEventListener('mousemove', handleMove);
    node.addEventListener('mouseenter', handleEnter);
    node.addEventListener('mouseleave', handleLeave);
    return () => {
      node.removeEventListener('mousemove', handleMove);
      node.removeEventListener('mouseenter', handleEnter);
      node.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      data-cursor="hover"
      data-cursor-label="VIEW"
      className="relative shrink-0 w-[60vw] md:w-[40vw] lg:w-[32vw] h-[70vh] rounded-sm overflow-hidden bg-[#0a0a0a] border border-white/5"
      style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
    >
      <div
        ref={imageRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `url(${card.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Darkening + accent wash */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      <div
        className="absolute inset-0 mix-blend-overlay opacity-40"
        style={{
          background: `radial-gradient(ellipse at 50% 100%, ${card.accent}44 0%, transparent 60%)`,
        }}
      />

      {/* Card index */}
      <div
        className="absolute top-6 left-6 font-mono font-light select-none pointer-events-none"
        style={{
          fontSize: 'clamp(3rem,5vw,4.5rem)',
          color: card.accent,
          letterSpacing: '-0.05em',
          opacity: 0.8,
        }}
      >
        /{(index + 1).toString().padStart(2, '0')}
      </div>

      {/* Card meta */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3 pointer-events-none">
        <div className="flex flex-wrap gap-2">
          {card.tags.map(t => (
            <span
              key={t}
              className="inline-block px-2.5 py-1 text-[9px] font-mono tracking-[0.15em] uppercase rounded-full border"
              style={{
                color: card.accent,
                borderColor: `${card.accent}55`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <h3 className="text-[clamp(1.4rem,2vw,2rem)] font-medium text-white leading-tight">
          {card.title}
        </h3>
        <p className="text-[0.9rem] text-white/70 leading-relaxed max-w-[340px]">
          {card.subtitle}
        </p>
      </div>
    </div>
  );
}
