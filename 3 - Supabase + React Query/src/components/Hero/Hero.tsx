import { heroBenefits } from "../../utils/content";
import HeroBenefit from "./HeroBenefit";

export default function Hero() {
  return (
    <section className="relative m-auto max-w-[108rem]">
      <div className="relative flex items-center justify-center rounded-[2.25rem] bg-[url('/public/hero.webp')] bg-cover bg-bottom pb-[56.25%]">
        <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center text-center">
          <div>
            <h1 className="mb-4 pt-54 text-[6.5rem]/34 font-semibold text-white">
              Start Your Memorable <br /> Journey Here
            </h1>
            <p className="text-[1.75rem]/10.5 text-white">
              Where unforgettable adventures await you.
            </p>
          </div>
        </div>

        <ul className="absolute -bottom-23 mx-21.5 flex gap-x-18 rounded-[1.5rem] bg-white px-16 py-18 drop-shadow-[0_2px_40px_rgba(0,0,0,0.06)]">
          {heroBenefits.map((benefit) => (
            <HeroBenefit benefit={benefit} key={benefit.id} />
          ))}
        </ul>
      </div>
    </section>
  );
}
