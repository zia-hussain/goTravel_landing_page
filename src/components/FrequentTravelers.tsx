import { MouseEvent, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import Checkmark from "./Icons/Checkmark";
import useInsertLead from "../hooks/useInsertLead";
import { FORM_STATE_DURATION } from "../utils/constants";

interface FormState {
  currentState: "idle" | "pending" | "success" | "error";
  errorMessage: string | null;
}

const buttonStateClasses = {
  idle: "bg-primary-700 opacity-100",
  pending: "bg-primary-700 opacity-50",
  success: "bg-green opacity-100",
  error: "bg-red opacity-100",
};

export default function FrequentTravelers() {
  const [formState, setFormState] = useState<FormState>({
    currentState: "idle",
    errorMessage: null,
  });

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation({
      emailAddress: "",
      fullName: "",
    });

  const mutation = useInsertLead({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  async function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (isChecked && isValid) {
      // we are now entering  a pending..
      setFormState({ currentState: "pending", errorMessage: null });

      // lets attempt to insert lead data
      mutation.mutate({
        createdAt: Date.now(),
        fullName: values.fullName,
        emailAddress: values.emailAddress,
      });
    }
  }

  function handleSuccess() {
    resetForm();
    setIsChecked(false);
    setFormState({ currentState: "success", errorMessage: null });

    // Tell the browser to run this function after 1250 ms, reset form state
    setTimeout(
      () => setFormState({ currentState: "idle", errorMessage: null }),
      FORM_STATE_DURATION,
    );
  }

  function handleError(error: Error) {
    setFormState({ currentState: "error", errorMessage: error.message });

    setTimeout(
      () => setFormState({ currentState: "idle", errorMessage: null }),
      FORM_STATE_DURATION,
    );
  }

  return (
    <section className="bg-primary-100 max-3xl:px-20 max-3xl:py-34 px-24 py-36 max-2xl:px-14 max-2xl:py-28 max-xl:px-10 max-xl:py-26 max-lg:px-6 max-lg:pt-24 max-lg:pb-32 max-md:pb-28 max-sm:px-4">
      <div className="border-y-grey-500/40 m-auto flex max-w-389 items-center justify-between gap-x-28 border-y-1 py-26 max-2xl:gap-x-20 max-2xl:py-20 max-xl:gap-x-10 max-xl:py-16 max-lg:max-w-lg max-lg:flex-col max-lg:gap-y-16 max-lg:border-none max-lg:py-0">
        <div className="basis-150 text-center max-lg:basis-auto">
          <h3 className="tracking-6 max-3xl:text-[1.5rem]/12 max-3xl:mb-8 mb-9.5 text-[1.75rem]/14 font-semibold max-md:mb-9.5">
            Learn About Our Frequent Traveler Program
          </h3>
          <p className="text-grey-800 text-base/13.5">
            Interested in saving up to $1000 on your next vacation? How about
            earning travel points that can be converted into rewards like extra
            nights, free meals, and exclusive offers from resorts around globe?
          </p>
        </div>
        <div className="bg-grey-500/40 block w-0.25 self-stretch max-lg:hidden" />
        <form className="flex basis-150 flex-col max-lg:basis-auto">
          <label className="max-3xl:mb-7 mb-8 max-md:mb-8">
            <p className="tracking-6 max-3xl:mb-2.5 mb-3 text-lg/9.5 font-semibold max-2xl:text-base max-md:mb-3">
              Full Name
            </p>
            <input
              required
              type="text"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              minLength={2}
              maxLength={50}
              disabled={formState.currentState !== "idle"}
              placeholder="Jane Doe"
              className={`placeholder:text-grey-400 w-full rounded-lg bg-white py-3.5 pl-4 transition-all duration-200 placeholder:font-light focus:outline-1 disabled:opacity-50 max-sm:py-4 max-sm:text-sm ${errors.fullName && "outline-red"}`}
            />
            <AnimatePresence>
              {errors.fullName && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-red pt-1 pl-0.5 text-sm"
                >
                  {errors.fullName}
                </motion.p>
              )}
            </AnimatePresence>
          </label>
          <label className="max-3xl:mb-11.5 mb-12 max-md:mb-16">
            <p className="tracking-6 max-3xl:mb-2.5 mb-3 text-lg/9.5 font-semibold max-2xl:text-base max-md:mb-3">
              Email
            </p>
            <input
              required
              type="email"
              name="emailAddress"
              value={values.emailAddress}
              onChange={handleChange}
              minLength={3}
              maxLength={50}
              disabled={formState.currentState !== "idle"}
              placeholder="janedoe@gmail.com"
              className={`placeholder:text-grey-400 w-full rounded-lg bg-white py-3.5 pl-4 transition-all duration-200 not-hover:transition-none placeholder:font-light focus:outline-1 disabled:opacity-50 max-sm:py-4 max-sm:text-sm ${errors.emailAddress && "outline-red"}`}
            />
            <AnimatePresence>
              {errors.emailAddress && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-red pt-1 pl-0.5 text-sm"
                >
                  {errors.emailAddress}
                </motion.p>
              )}
            </AnimatePresence>
          </label>
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-8">
            <label className="text-grey-800 flex cursor-pointer items-center gap-x-1.5">
              <button
                className="flex size-5 cursor-pointer items-center justify-center rounded-xs bg-white p-1 disabled:opacity-50 max-xl:size-4.5"
                type="button"
                onClick={() => setIsChecked((c) => !c)}
                disabled={formState.currentState === "pending"}
              >
                <Checkmark
                  className={`transition-all duration-200 ${isChecked ? "visible size-3 opacity-100" : "invisible size-2 opacity-0"}`}
                />
              </button>
              <p className="text-sm tracking-[.03rem] max-xl:text-xs">
                Agree to receive promotional email updates
              </p>
            </label>
            <motion.button
              onClick={handleSubmit}
              disabled={formState.currentState !== "idle"}
              className={`not-disabled:hover:bg-primary-800 cursor-pointer rounded-[.625rem] px-8 py-3.5 font-medium text-white transition-all duration-200 disabled:cursor-not-allowed max-xl:py-3 max-xl:text-sm max-xl:font-normal max-lg:py-3.5 max-lg:text-base ${buttonStateClasses[formState.currentState]}`}
            >
              {formState.currentState === "idle" && "Learn More"}
              {formState.currentState === "pending" && "Submitting..."}
              {formState.currentState === "error" && "Submission Failed"}
              {formState.currentState === "success" && "Success!"}
            </motion.button>
          </div>
        </form>
      </div>
    </section>
  );
}
