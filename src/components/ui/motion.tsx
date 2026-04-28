"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

export const MotionDiv = motion.div;
export const MotionSection = motion.section;

export const fadeUp = siteConfig.features.animations
  ? { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.45 } }
  : {};

export const fadeScale = siteConfig.features.animations
  ? { initial: { opacity: 0, scale: 0.98 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.45 } }
  : {};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42 } },
};
