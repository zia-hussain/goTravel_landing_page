import swimmingDudes from "../../../public/swimmingDudes.webp";
import { steps } from "../../utils/content";
import Rating from "./Rating";

export default function Steps() {
  return (
    <section className="px-24 py-36">
      <div className="m-auto max-w-432 px-21.5">
        <div className="mt-4 text-center">
          <h2 className="tracking-6 mb-5 text-[3.25rem] font-semibold">
            Travel to make sweet memories
          </h2>
          <p className="tracking-6 text-grey-700 text-[1.75rem]/10.5 font-light">
            Find the trips that flexible lifestyle
          </p>
        </div>

        <div className="flex items-start justify-between gap-x-44 pt-26">
          <div className="max-w-min shrink-5">
            <ul className="mb-14 flex flex-col gap-y-14">
              {steps.map((step) => (
                <li key={step.id} className="flex flex-col gap-y-4.5">
                  <p className="bg-primary-700 w-min rounded-[.5rem] px-5.5 py-0.5 text-[1.375rem]/8 font-semibold text-white">
                    {step.id}
                  </p>
                  <h3 className="tracking-6 w-max text-[1.75rem]/10.5 font-semibold text-nowrap">
                    {step.heading}
                  </h3>
                  <p className="text-grey-900 tracking-6 text-base/8 font-light">
                    {step.description}
                  </p>
                </li>
              ))}
            </ul>
            <a
              className="bg-primary-700 hover:bg-primary-800 w-max cursor-pointer rounded-[.625rem] px-8 py-3.5 text-lg font-medium text-white transition-all duration-200"
              href="#ExploreMore"
            >
              Start your explore
            </a>
          </div>

          <figure className="relative shrink-2 px-20">
            <img
              src={swimmingDudes}
              alt="A photo of two men swimming"
              className="max-h-[50.8rem] rounded-[3.25rem]"
            />
            <Rating
              key={1}
              name="Tiffany Miller"
              rating={4.6}
              img="/headshots/tiffany.webp"
              className="absolute top-28 left-0"
            />
            <Rating
              key={2}
              name="Amari Reece"
              rating={4.9}
              img="/headshots/amari.webp"
              className="absolute right-0 bottom-28"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
