'use client';

/**
 * Blog content for "Kafka Streams Basics" article.
 * Interactive version with diagrams, icons, callouts, and comparison cards.
 */
import {
  BookOpen, Cpu, Database, Layers, ArrowRightLeft,
  Network, HardDrive, Shield, Rocket,
  CheckCircle2, XCircle, Star,
} from 'lucide-react';
import { CalloutBox } from '@/components/blog/blog-callout-box';
import { CodeBlock } from '@/components/blog/blog-code-block';
import { KafkaTopologyDiagram } from '@/components/blog/blog-diagram-kafka-topology';
import { ComparisonCards } from '@/components/blog/blog-comparison-cards';

function SectionIcon({ icon: Icon }: { icon: React.ComponentType<{ size?: number; className?: string }> }) {
  return <Icon size={20} className="inline-block text-primary mr-2 -mt-0.5" />;
}

export function KafkaStreamsBasicsContent() {
  return (
    <>
      <p>
        If you&apos;ve worked with Apache Kafka, you know it as a distributed event streaming
        platform — great for moving data between systems. But what happens when you need to
        <strong> process</strong> that data in real time? That&apos;s where <strong>Kafka Streams</strong> comes in.
      </p>

      <CalloutBox variant="info" title="Prerequisites">
        This article assumes basic familiarity with Apache Kafka concepts (topics, partitions,
        consumers, producers). If you&apos;re new to Kafka, start with the
        {' '}<a href="https://kafka.apache.org/intro" target="_blank" rel="noopener noreferrer" className="text-primary underline">official introduction</a> first.
      </CalloutBox>

      {/* ── What is Kafka Streams ── */}
      <h2 id="what-is-kafka-streams"><SectionIcon icon={BookOpen} />What is Kafka Streams?</h2>
      <p>
        Kafka Streams is a <strong>client library</strong> for building real-time applications and
        microservices that process data stored in Kafka topics. Unlike heavyweight frameworks like
        Apache Flink or Spark Streaming, Kafka Streams runs as part of your application — no
        separate cluster required.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
        {[
          { icon: Cpu, label: 'Lightweight', desc: 'Just a JAR dependency, no external infra' },
          { icon: Shield, label: 'Exactly-once', desc: 'Built-in guarantee for data correctness' },
          { icon: Layers, label: 'Stateful & stateless', desc: 'Aggregations, joins, and windowing' },
          { icon: Rocket, label: 'Elastic & fault-tolerant', desc: 'Scale by adding instances; auto-recovery' },
        ].map(({ icon: Icon, label, desc }) => (
          <div key={label} className="flex gap-3 items-start p-3 rounded-lg bg-surface border border-border">
            <Icon size={18} className="text-primary mt-0.5 shrink-0" />
            <div>
              <span className="text-sm font-semibold text-text">{label}</span>
              <p className="text-xs text-text-muted mt-0.5 !mb-0">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Core Concepts ── */}
      <h2 id="core-concepts"><SectionIcon icon={Layers} />Core Concepts</h2>

      <h3 id="kstream"><SectionIcon icon={ArrowRightLeft} />Stream (KStream)</h3>
      <p>
        A <code>KStream</code> represents an unbounded, continuously updating stream of records.
        Each record is an independent, immutable fact — like an event log. Think of it as
        &quot;user X clicked button Y at time T.&quot;
      </p>

      <h3 id="ktable"><SectionIcon icon={Database} />Table (KTable)</h3>
      <p>
        A <code>KTable</code> is a changelog stream where each record is an update to a key.
        Only the latest value per key matters. Think of it as a materialized view — like
        &quot;user X&apos;s current balance is 500.&quot;
      </p>

      <CalloutBox variant="tip" title="Stream-Table Duality">
        Every stream can be viewed as a table (by replaying events to build current state),
        and every table can be viewed as a stream (by capturing each change as an event).
        This duality lets you model almost any real-time processing scenario.
      </CalloutBox>

      <h3 id="topology"><SectionIcon icon={Network} />Topology</h3>
      <p>
        A <strong>topology</strong> is the processing graph — a DAG (directed acyclic graph) of
        stream processors connected by streams. You define your topology using the Streams DSL
        or the lower-level Processor API.
      </p>

      <KafkaTopologyDiagram />

      {/* ── How It Works ── */}
      <h2 id="how-it-works"><SectionIcon icon={Cpu} />How It Works Under the Hood</h2>

      <h3 id="partitions"><SectionIcon icon={Layers} />1. Partitions Drive Parallelism</h3>
      <p>
        Kafka Streams leverages Kafka&apos;s partition model. Each input topic partition maps to a
        <strong> stream task</strong>. If your topic has 8 partitions, you get 8 tasks — these can
        be distributed across multiple application instances automatically.
      </p>

      <div className="my-6 p-5 bg-surface rounded-xl border border-border">
        <p className="text-xs text-text-muted uppercase tracking-wider mb-3 font-semibold">Scaling Model</p>
        <div className="flex items-center justify-center gap-2 flex-wrap text-sm">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-card border border-border">
              <Rocket size={14} className="text-primary" />
              <span className="text-text font-mono text-xs">Instance {n}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-text-muted mt-3 !mb-0">
          Each instance gets assigned a subset of partitions. Add more instances = more parallelism.
        </p>
      </div>

      <h3 id="state-stores"><SectionIcon icon={HardDrive} />2. State Stores</h3>
      <p>
        For stateful operations (aggregations, joins), Kafka Streams uses <strong>local state stores</strong> backed
        by RocksDB. These stores are:
      </p>
      <ul>
        <li>Persisted to disk for fast recovery</li>
        <li>Backed up to a Kafka changelog topic for fault tolerance</li>
        <li>Automatically restored when a task migrates to a new instance</li>
      </ul>

      <h3 id="processing-guarantees"><SectionIcon icon={Shield} />3. Processing Guarantees</h3>
      <p>
        Kafka Streams supports <strong>exactly-once semantics (EOS)</strong> by coordinating
        consumer offsets and producer writes within a single transaction. Even if your
        app crashes mid-processing, you won&apos;t get duplicate results.
      </p>

      <h3 id="deployment"><SectionIcon icon={Rocket} />4. Simple Deployment</h3>
      <p>
        Unlike Flink or Spark, there&apos;s no cluster manager. Deploy your Kafka Streams app like
        any normal Java/Kotlin application. Scaling? Just start more instances. Kafka&apos;s consumer
        group protocol handles rebalancing automatically.
      </p>

      {/* ── Example ── */}
      <h2 id="example"><SectionIcon icon={BookOpen} />A Simple Example</h2>
      <p>
        Here&apos;s a word count topology — the &quot;hello world&quot; of stream processing:
      </p>

      <CodeBlock
        language="java"
        code={`StreamsBuilder builder = new StreamsBuilder();

// Read from input topic as a stream
KStream<String, String> textLines = builder.stream("input-topic");

// Process: split lines into words, group, and count
KTable<String, Long> wordCounts = textLines
    .flatMapValues(line -> Arrays.asList(line.toLowerCase().split("\\\\W+")))
    .groupBy((key, word) -> word)
    .count(Materialized.as("word-counts-store"));

// Write results to output topic
wordCounts.toStream().to("output-topic",
    Produced.with(Serdes.String(), Serdes.Long()));

// Build and start the topology
KafkaStreams streams = new KafkaStreams(builder.build(), config);
streams.start();`}
      />

      <p>
        This reads text from <code>input-topic</code>, counts word occurrences in real time, and
        writes updated counts to <code>output-topic</code>. The state store keeps the running totals,
        backed by RocksDB locally and a changelog topic in Kafka.
      </p>

      {/* ── When to Use ── */}
      <h2 id="when-to-use"><SectionIcon icon={CheckCircle2} />When to Use Kafka Streams</h2>

      <div className="space-y-2 my-4">
        {[
          'You already use Kafka — integrates natively, no new infrastructure',
          'Real-time processing — event-driven transformations, enrichment, routing',
          'Stateful operations — aggregations, windowed computations, stream-table joins',
          'Microservice architecture — embed processing logic directly in services',
          'Exactly-once matters — financial transactions, inventory, deduplication',
        ].map((text) => (
          <div key={text} className="flex gap-2.5 items-start">
            <CheckCircle2 size={16} className="text-success mt-0.5 shrink-0" />
            <span className="text-sm text-text-muted">{text}</span>
          </div>
        ))}
      </div>

      <h3 id="use-cases"><SectionIcon icon={Star} />Real-World Use Cases</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {[
          { title: 'Fraud Detection', desc: 'Aggregate transaction patterns per user within time windows' },
          { title: 'CDC Processing', desc: 'Transform database change events into downstream formats' },
          { title: 'Event Enrichment', desc: 'Join event streams with reference data (KStream-KTable join)' },
          { title: 'Real-time Dashboards', desc: 'Aggregate metrics and push to a serving layer' },
          { title: 'Session Tracking', desc: 'Group user activity into sessions using windowed operations' },
        ].map(({ title, desc }) => (
          <div key={title} className="p-3 rounded-lg bg-surface border border-border">
            <span className="text-sm font-semibold text-text">{title}</span>
            <p className="text-xs text-text-muted mt-1 !mb-0">{desc}</p>
          </div>
        ))}
      </div>

      {/* ── When NOT to Use ── */}
      <h2 id="when-not-to-use"><SectionIcon icon={XCircle} />When NOT to Use Kafka Streams</h2>
      <div className="space-y-2 my-4">
        {[
          'You don\'t use Kafka — only works with Kafka as source/sink',
          'Batch processing — Spark or Flink batch mode is better for historical data',
          'Complex event processing — pattern matching is easier in Flink CEP',
          'Multi-cluster — designed for a single Kafka cluster',
          'Non-JVM languages — Java/Kotlin only (ksqlDB offers a SQL alternative)',
        ].map((text) => (
          <div key={text} className="flex gap-2.5 items-start">
            <XCircle size={16} className="text-error mt-0.5 shrink-0" />
            <span className="text-sm text-text-muted">{text}</span>
          </div>
        ))}
      </div>

      {/* ── Comparison ── */}
      <h2 id="comparison"><SectionIcon icon={Layers} />Kafka Streams vs. Alternatives</h2>
      <ComparisonCards />

      {/* ── Takeaways ── */}
      <h2 id="takeaways"><SectionIcon icon={Star} />Key Takeaways</h2>
      <CalloutBox variant="tip" title="TL;DR">
        <ul className="space-y-1 !mb-0 !pl-4">
          <li>Kafka Streams is a <strong>library, not a framework</strong> — deploy it like any app</li>
          <li>The <strong>KStream/KTable duality</strong> is the foundation for modeling real-time data</li>
          <li>Scaling = starting more instances; Kafka handles the rest</li>
          <li>State is local (fast) but backed by Kafka (durable)</li>
          <li>Use it when Kafka is your backbone and you need real-time, stateful processing</li>
        </ul>
      </CalloutBox>

      <p>
        Kafka Streams strikes a unique balance: powerful enough for production-grade stream
        processing, simple enough to embed in a microservice. If Kafka is already in your stack,
        it&apos;s the most pragmatic choice for real-time data processing.
      </p>
    </>
  );
}
