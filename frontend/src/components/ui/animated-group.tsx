"use client"

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedGroupProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  variants?: {
    container?: any;
    item?: any;
  };
}

export const AnimatedGroup = ({
  children,
  className,
  variants,
  ...props
}: AnimatedGroupProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants?.container}
      className={cn(className)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return <motion.div variants={variants?.item}>{child}</motion.div>
      })}
    </motion.div>
  )
}
