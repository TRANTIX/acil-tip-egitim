"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto", className)}>
      {children}
    </div>
  );
}

export function BentoGridItem({
  className,
  title,
  description,
  icon,
  gradient,
  index = 0,
}: {
  className?: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div
        className={cn(
          "group relative row-span-1 flex flex-col justify-between overflow-hidden rounded-2xl",
          "border border-[var(--border)] bg-[var(--card)]",
          "p-6 transition-all duration-300",
          "hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 hover:border-blue-500/30",
          className
        )}
      >
        {/* Hover gradient overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={cn("absolute inset-0 opacity-[0.03]", gradient)} />
        </div>

        {/* Top gradient line */}
        <div className={cn(
          "absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          gradient
        )} />

        <div className="relative z-10">
          <div className="mb-4">{icon}</div>
          <h3 className="text-base font-semibold text-[var(--foreground)] mb-1.5">{title}</h3>
          <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
