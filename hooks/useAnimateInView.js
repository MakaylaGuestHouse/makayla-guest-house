"use client";
import { useEffect, useRef } from "react";
import {  useAnimation, useInView } from 'framer-motion';

export const useAnimateInView = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  return { ref, controls, isInView };
};