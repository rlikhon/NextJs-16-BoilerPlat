import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Bike,
  Bus,
  Car,
  CarTaxiFront,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Truck,
} from "lucide-react";

const VEHICLE_CATEGORIES = [
  {
    title: "All Vehicles",
    desc: "Discover a wide range of vehicles for your needs.",
    Icon: CarTaxiFront,
    tag: "Popular",
  },
  {
    title: "Bikes",
    desc: "Find the perfect bike for your daily commute or weekend adventures.",
    Icon: Bike,
    tag: "Quick",
  },
  {
    title: "Cars",
    desc: "Explore our wide range of cars, from compact models to luxury sedans.",
    Icon: Car,
    tag: "Comfort",
  },
  {
    title: "SUVs",
    desc: "Experience comfort and capability with our diverse SUV collection.",
    Icon: Car,
    tag: "Premium",
  },
  {
    title: "Vans",
    desc: "Discover our versatile vans, ideal for family trips or cargo transport.",
    Icon: Bus,
    tag: "Family",
  },
  {
    title: "Trucks",
    desc: "Discover our robust trucks, perfect for work and adventure.",
    Icon: Truck,
    tag: "Cargo",
  },
];

const VehicleSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const scroll = (direction: "left" | "right") => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollBy({
      left: (direction === "left" ? -1 : 1) * slider.clientWidth * 0.8,
      behavior: shouldReduceMotion ? "instant" : "smooth",
    });
  };

  return (
    <section
      aria-labelledby="vehicle-categories-title"
      className="relative w-full overflow-hidden bg-zinc-50 px-5 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-9 flex flex-col justify-between gap-6 sm:mb-11 sm:flex-row sm:items-end"
        >
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="h-px w-8 bg-emerald-600" aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-700">
                Find your ride
              </span>
            </div>
            <h2
              id="vehicle-categories-title"
              className="text-3xl font-bold leading-tight tracking-tight text-zinc-950 sm:text-4xl"
            >
              Vehicles for every{" "}
              <span className="relative inline-block">
                journey
                <motion.span
                  aria-hidden="true"
                  initial={shouldReduceMotion ? false : { scaleX: 0 }}
                  whileInView={shouldReduceMotion ? undefined : { scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    delay: 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute -bottom-1 left-0 h-1 w-full origin-left rounded-full bg-emerald-500"
                />
              </span>
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-zinc-600 sm:text-base">
              Choose the ride that fits your plans, from a quick city trip to a
              big family adventure.
            </p>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <motion.button
              type="button"
              aria-label="Scroll vehicle categories left"
              aria-controls="vehicle-category-track"
              onClick={() => scroll("left")}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
              className="flex size-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-800 shadow-sm transition-colors hover:border-zinc-950 hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              <ChevronLeft size={20} strokeWidth={2} aria-hidden="true" />
            </motion.button>
            <motion.button
              type="button"
              aria-label="Scroll vehicle categories right"
              aria-controls="vehicle-category-track"
              onClick={() => scroll("right")}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
              className="flex size-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-800 shadow-sm transition-colors hover:border-zinc-950 hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              <ChevronRight size={20} strokeWidth={2} aria-hidden="true" />
            </motion.button>
          </div>
        </motion.div>

        <div
          id="vehicle-category-track"
          ref={sliderRef}
          aria-label="Vehicle categories"
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-5 pt-2 sm:gap-5 [&::-webkit-scrollbar]:hidden"
          role="list"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {VEHICLE_CATEGORIES.map((category, index) => (
            <motion.article
              key={category.title}
              role="listitem"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                delay: shouldReduceMotion ? 0 : index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={shouldReduceMotion ? undefined : { y: -5 }}
              className="group relative min-h-[280px] w-[min(84vw,18rem)] shrink-0 snap-start overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-[0_8px_30px_rgba(24,24,27,0.04)] transition-[border-color,background-color,box-shadow] duration-300 hover:border-zinc-950 hover:bg-zinc-950 hover:shadow-[0_20px_45px_rgba(24,24,27,0.18)] sm:w-[17rem] sm:p-7 lg:w-[19rem]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-14 size-36 rounded-full bg-emerald-100/70 blur-3xl transition-colors duration-300 group-hover:bg-emerald-400/20"
              />
              <div className="relative flex h-full flex-col">
                <div className="mb-8 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-600 transition-colors duration-300 group-hover:border-white/15 group-hover:bg-white/10 group-hover:text-zinc-100">
                    <Sparkles size={12} aria-hidden="true" />
                    {category.tag}
                  </span>
                  <span className="text-xs font-medium tabular-nums text-zinc-400 transition-colors duration-300 group-hover:text-zinc-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="mb-6 flex size-14 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 text-zinc-800 transition-[border-color,background-color,color] duration-300 group-hover:border-white/15 group-hover:bg-white/10 group-hover:text-emerald-300">
                  <category.Icon size={25} strokeWidth={1.6} aria-hidden="true" />
                </div>

                <h3 className="mb-2 text-xl font-semibold tracking-tight text-zinc-950 transition-colors duration-300 group-hover:text-white">
                  {category.title}
                </h3>
                <p className="text-sm leading-6 text-zinc-600 transition-colors duration-300 group-hover:text-zinc-300">
                  {category.desc}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 0.7}}
        className='flex items-center mt-8 gap-8 pt-6 border-t border-zinc-100'
        >
          {
            [
              { num: "6+", lable: "Categories" },
              { num: "20+", lable: "Vehicle types" },
              { num: "24/7", lable: "Availability" }
            ].map((item, index) => (
              <div key={index} className='flex items-center gap-2'>
                <span className='text-2xl font-bold text-zinc-900'>{item.num}</span>
                <span className='text-sm font-semibold text-zinc-600'>{item.lable}</span>
              </div>
            ))
          }
        </motion.div>
      </div>
    </section>
  );
};

export default VehicleSlider;
