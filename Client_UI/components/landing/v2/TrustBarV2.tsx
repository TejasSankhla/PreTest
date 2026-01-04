"use client";

const colleges = [
  "IIT Bombay",
  "BITS Pilani",
  "IIT Delhi",
  "NIT Trichy",
  "IIIT Hyderabad",
  "DTU",
  "VIT",
  "IIT Madras",
  "NSUT",
  "IIT Kanpur",
];

export default function TrustBarV2() {
  return (
    <section className="py-10 border-y border-border bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <p className="text-xs font-semibold text-text-tertiary uppercase tracking-widest">
          Trusted by students from
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="flex animate-infinite-scroll w-max">
          {/* First set of colleges */}
          {colleges.map((college, index) => (
            <span
              key={`set1-${index}`}
              className="text-lg font-bold text-text-tertiary tracking-tight hover:text-text-secondary transition-colors cursor-default whitespace-nowrap flex-shrink-0 px-8"
            >
              {college}
            </span>
          ))}
          {/* Duplicate set for seamless loop */}
          {colleges.map((college, index) => (
            <span
              key={`set2-${index}`}
              className="text-lg font-bold text-text-tertiary tracking-tight hover:text-text-secondary transition-colors cursor-default whitespace-nowrap flex-shrink-0 px-8"
            >
              {college}
            </span>
          ))}
        </div>

        {/* Fade masks */}
        <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
