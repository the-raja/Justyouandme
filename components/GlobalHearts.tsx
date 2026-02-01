'use client';

export default function GlobalHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {[...Array(14)].map((_, i) => (
        <span
          key={i}
          className="heart"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            fontSize: `${12 + Math.random() * 10}px`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
