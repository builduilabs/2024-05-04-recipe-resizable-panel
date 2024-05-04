"use client";

import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { AnimatePresence, motion } from "framer-motion";
import {
  ComponentProps,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import useMeasure from "react-use-measure";

let PanelContext = createContext({ active: "" });

function PanelRoot({
  children,
  active,
  ...rest
}: {
  children: ReactNode;
  active: string;
} & ComponentProps<"div">) {
  let [ref, bounds] = useMeasure();

  return (
    <motion.div
      animate={{ height: bounds.height > 0 ? bounds.height : undefined }}
      transition={{ type: "spring", bounce: 0, duration: 0.8 }}
      style={{ overflow: "hidden", position: "relative" }}
    >
      <div ref={ref}>
        <PanelContext.Provider value={{ active }}>
          <div {...rest}>{children}</div>
        </PanelContext.Provider>
      </div>
    </motion.div>
  );
}

function PanelContent({
  value,
  children,
  ...rest
}: {
  value: string;
  children: ReactNode;
} & ComponentProps<"div">) {
  let { active } = useContext(PanelContext);
  let isActive = active === value;

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              type: "ease",
              ease: "easeInOut",
              duration: 0.3,
              delay: 0.2,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              type: "ease",
              ease: "easeInOut",
              duration: 0.2,
            },
          }}
        >
          <div {...rest}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ResizablePanel() {
  let [active, setActive] = useState("a");
  let [isSending, setIsSending] = useState(false);

  return (
    <div className="relative">
      <div className="absolute right-4 top-4">
        <button
          className="text-gray-600 transition hover:text-gray-300"
          onClick={() => setActive("a")}
        >
          <ArrowPathIcon className="size-5" />
        </button>
      </div>

      <div className="mx-auto max-w-md pt-20">
        <div className="rounded-lg bg-gray-700 shadow-md shadow-black/30">
          <PanelRoot active={active} className="p-8">
            <PanelContent value="a">
              <p className="text-xl font-semibold text-white">Reset password</p>
              <p className="mt-2 text-sm text-gray-300">
                Enter your email to get a password reset link.
              </p>
              <label className="mt-8 block text-sm font-medium text-white">
                Email address
                <input
                  type="text"
                  defaultValue="sam@buildui.com"
                  className="focus-visible:border-brand focus-visible:outline-brand mt-2 w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 focus-visible:outline"
                />
              </label>
              <div className="mt-6 text-right">
                <button
                  onClick={async () => {
                    setIsSending(true);
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    setActive("b");
                    setIsSending(false);
                  }}
                  disabled={isSending}
                  className="bg-brand hover:bg-brand-light rounded-md px-3 py-2 text-sm font-semibold text-white disabled:pointer-events-none"
                >
                  <Spinner isLoading={isSending}>Reset your password</Spinner>
                </button>
              </div>
            </PanelContent>
            <PanelContent value="b">
              <p className="text-xl font-semibold text-white">Email sent!</p>
              <p className="mt-2 text-sm text-gray-300">
                Check your inbox to continue.
              </p>
            </PanelContent>
          </PanelRoot>
        </div>
        <div className="mt-6">
          <p className="text-sm text-gray-500">
            <span className="underline">Reach out</span> to us if you need more
            help.
          </p>
        </div>
      </div>
    </div>
  );
}

function Spinner({
  isLoading,
  children,
  ...rest
}: { isLoading: boolean } & ComponentProps<"svg">) {
  return (
    <span className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="max-h-full animate-spin"
            style={{
              animationTimingFunction: "steps(8, end)",
              animationDuration: ".75s",
            }}
            {...rest}
          >
            <rect
              style={{ opacity: 0.4 }}
              x={11}
              y={2}
              width={2}
              height={6}
              rx={1}
              fill="currentColor"
            />
            <rect
              style={{ opacity: 0.4 }}
              x={18.364}
              y={4.22183}
              width={2}
              height={6}
              rx={1}
              transform="rotate(45 18.364 4.222)"
              fill="currentColor"
            />
            <rect
              x={22}
              y={11}
              width={2}
              style={{ opacity: 0.4 }}
              height={6}
              rx={1}
              transform="rotate(90 22 11)"
              fill="currentColor"
            />
            <rect
              x={19.7782}
              y={18.364}
              width={2}
              style={{ opacity: 0.4 }}
              height={6}
              rx={1}
              transform="rotate(135 19.778 18.364)"
              fill="currentColor"
            />
            <rect
              x={13}
              y={22}
              width={2}
              style={{ opacity: 0.4 }}
              height={6}
              rx={1}
              transform="rotate(-180 13 22)"
              fill="currentColor"
            />
            <rect
              x={5.63603}
              y={19.7782}
              width={2}
              style={{ opacity: 0.6 }}
              height={6}
              rx={1}
              transform="rotate(-135 5.636 19.778)"
              fill="currentColor"
            />
            <rect
              x={2}
              y={13}
              width={2}
              style={{ opacity: 0.8 }}
              height={6}
              rx={1}
              transform="rotate(-90 2 13)"
              fill="currentColor"
            />
            <rect
              x={4.22183}
              y={5.63603}
              width={2}
              height={6}
              rx={1}
              transform="rotate(-45 4.222 5.636)"
              fill="currentColor"
            />
          </svg>
        </div>
      )}

      <span className={isLoading ? "invisible" : ""}>{children}</span>
    </span>
  );
}
