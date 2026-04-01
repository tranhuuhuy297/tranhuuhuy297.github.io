'use client';

import { motion } from 'framer-motion';

/** SVG diagram showing Kafka Streams processing topology flow */
export function KafkaTopologyDiagram() {
  const nodeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.15, duration: 0.4 },
    }),
  };

  return (
    <div className="my-8 p-6 bg-surface rounded-xl border border-border overflow-x-auto">
      <p className="text-xs text-text-muted uppercase tracking-wider mb-4 font-semibold">
        Kafka Streams Processing Topology
      </p>
      <svg viewBox="0 0 720 200" className="w-full max-w-2xl mx-auto" fill="none">
        {/* Arrows */}
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" className="fill-primary" />
          </marker>
        </defs>

        {/* Connection lines */}
        {[{ x1: 148, y1: 100, x2: 222, y2: 100 },
          { x1: 348, y1: 100, x2: 422, y2: 100 },
          { x1: 548, y1: 100, x2: 582, y2: 100 }].map((line, i) => (
          <motion.line
            key={i}
            {...line}
            className="stroke-primary"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.2, duration: 0.5 }}
          />
        ))}

        {/* Source Topic */}
        <motion.g custom={0} variants={nodeVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <rect x="20" y="65" width="128" height="70" rx="12" className="fill-primary/10 stroke-primary" strokeWidth="1.5" />
          <text x="84" y="95" textAnchor="middle" className="fill-text text-[13px] font-semibold">Source Topic</text>
          <text x="84" y="115" textAnchor="middle" className="fill-text-muted text-[11px]">input-topic</text>
        </motion.g>

        {/* Stream Processor */}
        <motion.g custom={1} variants={nodeVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <rect x="222" y="55" width="126" height="90" rx="12" className="fill-success-light stroke-success" strokeWidth="1.5" />
          <text x="285" y="85" textAnchor="middle" className="fill-text text-[13px] font-semibold">Processor</text>
          <text x="285" y="103" textAnchor="middle" className="fill-text-muted text-[11px]">filter / map /</text>
          <text x="285" y="118" textAnchor="middle" className="fill-text-muted text-[11px]">aggregate</text>
          <text x="285" y="137" textAnchor="middle" className="fill-primary text-[10px] font-mono">KStream / KTable</text>
        </motion.g>

        {/* State Store */}
        <motion.g custom={2} variants={nodeVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <rect x="422" y="55" width="126" height="90" rx="12" className="fill-warning-light stroke-warning" strokeWidth="1.5" />
          <text x="485" y="85" textAnchor="middle" className="fill-text text-[13px] font-semibold">State Store</text>
          <text x="485" y="103" textAnchor="middle" className="fill-text-muted text-[11px]">RocksDB</text>
          <text x="485" y="118" textAnchor="middle" className="fill-text-muted text-[11px]">(local + changelog)</text>
        </motion.g>

        {/* Sink Topic */}
        <motion.g custom={3} variants={nodeVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <rect x="582" y="65" width="118" height="70" rx="12" className="fill-primary/10 stroke-primary" strokeWidth="1.5" />
          <text x="641" y="95" textAnchor="middle" className="fill-text text-[13px] font-semibold">Sink Topic</text>
          <text x="641" y="115" textAnchor="middle" className="fill-text-muted text-[11px]">output-topic</text>
        </motion.g>
      </svg>
    </div>
  );
}
