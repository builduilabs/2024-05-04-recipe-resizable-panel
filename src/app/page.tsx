"use client";

import { ComponentProps, useState } from "react";
import * as ResizablePanel from "./resizable-panel";
import { ArrowPathIcon } from "@heroicons/react/16/solid";

export default function Page() {
  let [state, setState] = useState("form");
  let [isSending, setIsSending] = useState(false);

  return (
    <div className="relative">
      <div className="absolute right-4 top-4">
        <button
          className="text-gray-600 transition hover:text-gray-300"
          onClick={() => setState("form")}
        >
          <ArrowPathIcon className="size-5" />
        </button>
      </div>

      <div className="px-4">
        <div className="mx-auto max-w-md pt-16 sm:pt-12 md:pt-20">
          <div className="rounded-lg bg-gray-700 shadow-md shadow-black/30">
            <ResizablePanel.Root value={state} className="px-4 py-8 md:p-8">
              <ResizablePanel.Content value="form">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSending(true);
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    setState("success");
                    setIsSending(false);
                  }}
                >
                  <fieldset disabled={isSending}>
                    <p className="font-semibold text-white md:text-xl">
                      Reset password
                    </p>
                    <p className="mt-2 text-xs text-gray-300 md:text-sm">
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
                        disabled={isSending}
                        type="submit"
                        className="bg-brand hover:bg-brand-light rounded-md px-3 py-2 text-xs font-semibold text-white disabled:pointer-events-none md:text-sm"
                      >
                        <Spinner isLoading={isSending}>
                          Reset your password
                        </Spinner>
                      </button>
                    </div>
                  </fieldset>
                </form>
              </ResizablePanel.Content>
              <ResizablePanel.Content value="success">
                <p className="font-semibold text-white md:text-xl">
                  Email sent!
                </p>
                <p className="mt-2 text-xs text-gray-300 md:text-sm">
                  Check your inbox to continue.
                </p>
              </ResizablePanel.Content>
            </ResizablePanel.Root>
          </div>
          <div className="mt-6">
            <p className="text-xs text-gray-500 md:text-sm">
              <span className="underline underline-offset-2">Reach out</span> to
              us if you need more help.
            </p>
          </div>
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
