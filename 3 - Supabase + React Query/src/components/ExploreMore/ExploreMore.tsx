import { useState } from "react";
import { LOCATION_CARDS_SHOWN } from "../../utils/constants";
import LocationCard from "./LocationCard";
import CaretUp from "../Icons/CaretUp";
import useQueryLocations from "../../hooks/useQueryLocation";
import Loader from "../Loader";
import Error from "../Error";

export default function ExploreMore() {
  const { locations, error, isLoading } = useQueryLocations();

  const [currIndex, setCurrIndex] = useState<number>(0);

  const totalLocations = locations?.length || 0;
  const renderedLocations = locations?.slice(
    currIndex,
    currIndex + LOCATION_CARDS_SHOWN,
  );

  const handleRightClick = () => setCurrIndex((prevIndex) => prevIndex + 1);
  const handleLeftClick = () => setCurrIndex((prevIndex) => prevIndex - 1);

  return (
    <section className="px-24 py-26" id="ExploreMore">
      <div className="m-auto max-w-389">
        <div className="flex items-end justify-between gap-y-33">
          <div>
            <h2 className="tracking-6 mb-4 text-[3.25rem] font-semibold">
              Explore more
            </h2>
            <p className="tracking-6 text-grey-700 text-[1.75rem] font-light">
              Let’s go on adventure
            </p>
          </div>
          <div className="mb-2 flex gap-x-6">
            <button
              className="bg-grey-300 not-disabled:hover:bg-grey-400 flex size-18 cursor-pointer place-content-center rounded-full transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="arrow left"
              onClick={handleLeftClick}
              disabled={currIndex === 0}
            >
              <CaretUp className="w-6 -rotate-90 fill-white" />
            </button>
            <button
              className="bg-primary-700 not-disabled:hover:bg-primary-800 flex size-18 cursor-pointer place-content-center rounded-full transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="arrow right"
              onClick={handleRightClick}
              disabled={currIndex >= totalLocations - 6}
            >
              <CaretUp className="w-6 rotate-90 fill-white" />
            </button>
          </div>
        </div>
        {isLoading && !error && <Loader />}
        {!isLoading && !error && (
          <ul className="mt-33 grid grid-cols-3 gap-x-29 gap-y-24">
            {renderedLocations?.map((location) => (
              <LocationCard location={location} key={location.id} />
            ))}
          </ul>
        )}
        {!isLoading && error && (
          <Error>
            It looks like something went wrong while loading our travel
            locations.
          </Error>
        )}
      </div>
    </section>
  );
}
