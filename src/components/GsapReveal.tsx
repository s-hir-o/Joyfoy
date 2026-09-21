import { useEffect, useRef, type ReactNode } from "react";
import { ensureGsap } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  stagger?: number;
  splitChildren?: boolean;
};

export function GsapReveal({
  children,
  className,
  y = 60,
  delay = 0,
  duration = 1.1,
  stagger = 0.08,
  splitChildren = false,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const targets = splitChildren
      ? Array.from(el.children) as HTMLElement[]
      : [el];

    gsap.set(targets, { y, opacity: 0 });
    const tween = gsap.to(targets, {
      y: 0,
      opacity: 1,
      duration,
      delay,
      stagger: splitChildren ? stagger : 0,
      ease: "expo.out",
      scrollTrigger: {
        trigger: el,
        start: "top 82%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      ScrollTrigger.getAll().forEach((s) => {
        if (s.trigger === el) s.kill();
      });
    };
  }, [y, delay, duration, stagger, splitChildren]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
