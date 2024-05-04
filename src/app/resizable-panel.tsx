"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, createContext, useContext, useState } from "react";
import useMeasure from "react-use-measure";

let PanelContext = createContext({ active: "" });

function PanelRoot({
  children,
  active,
}: {
  children: ReactNode;
  active: string;
}) {
  let [ref, bounds] = useMeasure();

  return (
    <motion.div
      animate={{ height: bounds.height > 0 ? bounds.height : undefined }}
      transition={{ type: "spring", bounce: 0, duration: 0.8 }}
      style={{ overflow: "hidden", position: "relative" }}
    >
      <div ref={ref}>
        <PanelContext.Provider value={{ active }}>
          {children}
        </PanelContext.Provider>
      </div>
    </motion.div>
  );
}

function PanelContent({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) {
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
              duration: 0.2,
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
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ResizablePanel() {
  let [active, setActive] = useState("a");

  return (
    <div className="p-4">
      <button
        onClick={() => {
          if (active === "a") {
            setActive("b");
          } else {
            setActive("a");
          }
        }}
      >
        Click
      </button>

      <div className="mt-4 rounded bg-gray-600 p-4">
        <PanelRoot active={active}>
          <PanelContent value="a">Hello there Hi</PanelContent>
          <PanelContent value="b">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            aliquam explicabo iste! Possimus enim error atque recusandae,
            exercitationem id dolore fugit aspernatur culpa vel nemo quas
            corrupti, quidem hic minus.
          </PanelContent>
        </PanelRoot>
      </div>

      <div className="mt-4">Some other content</div>
    </div>
  );
}
