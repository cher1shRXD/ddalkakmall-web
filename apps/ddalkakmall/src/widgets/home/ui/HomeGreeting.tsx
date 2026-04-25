"use client";

import { motion } from "framer-motion";
import { greetings } from "../constants/greetings";
import { messages } from "../constants/messages";
import { getTimePeriod } from "../utils/get-time-period";
import { pick } from "../utils/pick";

const HomeGreeting = () => {
  const period = getTimePeriod();
  const message = pick(messages[period]);

  return (
    <div className="flex flex-col items-center justify-center gap-3 px-8 -mt-16">
      <motion.h1
        className="text-5xl font-bold text-foreground text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {greetings[period]}
      </motion.h1>
      <motion.p
        suppressHydrationWarning
        className="text-2xl text-foreground-sub text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
      >
        {message}
      </motion.p>
    </div>
  );
};

export default HomeGreeting;
