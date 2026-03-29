'use client';

import { useRef, useEffect, useState } from 'react';
import { Effect } from '@/lib/effects';
import { EffectCard } from '@/components/EffectCard';

interface CardGridProps {
  effects: Effect[];
  onCardClick: (effect: Effect) => void;
}

export function CardGrid({ effects, onCardClick }: CardGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(4);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function update() {
      if (!el) return;
      const width = el.offsetWidth;
      if (width >= 1280) setCols(5);
      else if (width >= 1024) setCols(4);
      else if (width >= 768) setCols(3);
      else if (width >= 480) setCols(2);
      else setCols(1);
    }

    const observer = new ResizeObserver(update);
    observer.observe(el);
    update();

    return () => observer.disconnect();
  }, []);

  const totalItems = effects.length;
  const completeRowItems = Math.floor(totalItems / cols) * cols;
  const partialRowItems = totalItems - completeRowItems;

  return (
    <div ref={containerRef} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {effects.map((effect, idx) => {
        const isCompleteRow = idx < completeRowItems;
        return (
          <div
            key={effect.id}
            data-card
            onClick={() => onCardClick(effect)}
            className="cursor-pointer"
          >
            <EffectCard effect={effect} />
          </div>
        );
      })}
    </div>
  );
}
