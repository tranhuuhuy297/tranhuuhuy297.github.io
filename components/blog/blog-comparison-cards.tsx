'use client';

import { motion } from 'framer-motion';
import { Zap, Server, Layers } from 'lucide-react';

interface ComparisonItem {
  name: string;
  icon: React.ReactNode;
  highlight: string;
  features: { label: string; value: string }[];
}

const comparisons: ComparisonItem[] = [
  {
    name: 'Kafka Streams',
    icon: <Zap size={20} />,
    highlight: 'Kafka-native microservices',
    features: [
      { label: 'Deployment', value: 'Library (no cluster)' },
      { label: 'Latency', value: 'Milliseconds' },
      { label: 'State', value: 'RocksDB + changelog' },
      { label: 'Exactly-once', value: 'Yes (Kafka only)' },
      { label: 'Language', value: 'Java / Kotlin' },
    ],
  },
  {
    name: 'Apache Flink',
    icon: <Layers size={20} />,
    highlight: 'Complex pipelines',
    features: [
      { label: 'Deployment', value: 'Cluster required' },
      { label: 'Latency', value: 'Milliseconds' },
      { label: 'State', value: 'RocksDB + checkpoints' },
      { label: 'Exactly-once', value: 'Yes (any sink)' },
      { label: 'Language', value: 'Java / Scala / Python' },
    ],
  },
  {
    name: 'Spark Streaming',
    icon: <Server size={20} />,
    highlight: 'Batch + streaming',
    features: [
      { label: 'Deployment', value: 'Cluster required' },
      { label: 'Latency', value: 'Seconds (micro-batch)' },
      { label: 'State', value: 'In-memory / external' },
      { label: 'Exactly-once', value: 'Limited' },
      { label: 'Language', value: 'Java / Scala / Python' },
    ],
  },
];

/** Visual comparison cards for Kafka Streams vs Flink vs Spark */
export function ComparisonCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
      {comparisons.map((item, i) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className={`rounded-xl border p-5 ${
            i === 0
              ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
              : 'border-border bg-card'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className={i === 0 ? 'text-primary' : 'text-text-muted'}>{item.icon}</span>
            <h4 className="font-bold text-sm">{item.name}</h4>
          </div>
          <p className="text-xs text-primary font-medium mb-4">{item.highlight}</p>
          <ul className="space-y-2.5">
            {item.features.map((f) => (
              <li key={f.label} className="text-xs">
                <span className="text-text-muted">{f.label}</span>
                <span className="block text-text font-medium">{f.value}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
