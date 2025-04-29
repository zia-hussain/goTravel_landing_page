import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Star from "../Icons/Star";

interface StepsProps {
  key: number;
  name: string;
  rating: number;
  img: string;
  className: string;
}

export default function Rating(props: StepsProps) {
  const [count, setCount] = useState<number>(0);

  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (!inView) {
      return;
    }

    const step = 0.1;
    const duration = 1000;
    let incrementInterval = duration / (props.rating / step);

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev + step >= props.rating) {
          incrementInterval += 1;
          return props.rating;
        }
        return prev + step;
      });
    }, incrementInterval);
    return () => clearInterval(interval);
  }, [props.rating, inView]);

  return (
    <motion.div
      className={`absolute flex gap-x-2.5 rounded-xl bg-white/85 py-3.5 pr-5 pl-3 drop-shadow-[0_4px_30px_rgba(0,0,0,0.12)] backdrop-blur-3xl ${props.className}`}
      ref={ref}
      initial={{ opacity: 0, y: 100, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="bg-grey-300 flex size-17 items-end justify-center overflow-hidden rounded-full">
        <img
          src={props.img}
          alt="Graphic of person rating photo"
          className="size-15"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <p className="tracking-6 font-semibold">{props.name}</p>
        <div className="flex items-center">
          <Star className="fill-yellow mr-2 size-6" />
          <p className="text-grey-600 text-[1.0625rem] font-semibold">
            {count.toFixed(1)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
