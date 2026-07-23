import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Real review data pulled from labelleviemedspa.com's Yelp reviews widget.
const reviews = [
  {
    text: 'My appointment with Genesse was 10/10 so wonderful. I got microneedling done and my skin has never looked better. The whole team made me feel so comfortable and cared for.',
    author: 'Julissa G.',
    date: '6/5/2026',
    photo: '/images/reviews/yelp-1.jpg',
    yelpUrl: 'https://www.yelp.com/biz/la-belle-vie-medspa-and-wellness-center-woodland-hills',
  },
  {
    text: 'I had a pico laser done today by Aggie. I am very pleased with her work and the results already. Professional, gentle, and the clinic is beautiful.',
    author: 'Lilian B.',
    date: '6/4/2026',
    photo: '/images/reviews/yelp-2.jpg',
    yelpUrl: 'https://www.yelp.com/biz/la-belle-vie-medspa-and-wellness-center-woodland-hills',
  },
  {
    text: 'I had microneedling and lip filler done for the first time with Liat. She was incredibly thorough and made sure I was comfortable the entire time. Already booking my next visit!',
    author: 'עמית ב.',
    date: '2/28/2026',
    photo: null,
    yelpUrl: 'https://www.yelp.com/biz/la-belle-vie-medspa-and-wellness-center-woodland-hills',
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-yellow-400 text-lg" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}

export default function Reviews() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.review-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out', clearProps: 'opacity,transform' }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6 md:px-16 bg-dark text-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="font-drama italic text-4xl md:text-5xl text-background leading-tight mb-4">
            Don&rsquo;t Take Our Word For It
          </h2>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="font-sans font-bold text-3xl text-background">{4.8}</span>
            <Stars />
          </div>
          <p className="font-sans text-background/70">
            <span className="font-semibold text-background">La Belle Vie Medspa</span> · 181 Reviews on Yelp
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r.author}
              className="review-card bg-background rounded-2xl p-7 flex flex-col"
            >
              {/* Avatar + stars */}
              <div className="flex items-center gap-3 mb-4">
                {r.photo ? (
                  <img
                    src={r.photo}
                    alt={r.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-sans font-bold text-lg">
                    {r.author.charAt(0)}
                  </div>
                )}
                <Stars />
              </div>

              {/* Quote */}
              <p className="font-serif italic text-dark/80 text-base leading-relaxed mb-5 flex-1">
                &ldquo;{r.text}&rdquo;
              </p>

              {/* Footer: Yelp + author/date */}
              <div className="flex items-center justify-between pt-4 border-t border-dark/10">
                <a
                  href={r.yelpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent font-sans text-sm font-semibold hover:underline"
                >
                  Read full review
                </a>
                <span className="font-sans text-dark/60 text-sm">
                  {r.author} · {r.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Yelp badge */}
        <div className="mt-12 text-center">
          <a
            href="https://www.yelp.com/biz/la-belle-vie-medspa-and-wellness-center-woodland-hills"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-background/70 hover:text-accent transition-colors font-sans text-sm"
          >
            <span className="text-red-500 font-bold text-lg">★</span> Read all 181 reviews on Yelp
          </a>
        </div>
      </div>
    </section>
  );
}
