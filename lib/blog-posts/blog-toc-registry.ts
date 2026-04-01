/**
 * Registry mapping blog post slugs to their table-of-contents entries.
 * Each entry maps to an element id in the blog content component.
 */
export const blogTocRegistry: Record<string, { id: string; label: string }[]> = {
  'kafka-streams-basics': [
    { id: 'what-is-kafka-streams', label: 'What is Kafka Streams?' },
    { id: 'core-concepts', label: 'Core Concepts' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'example', label: 'A Simple Example' },
    { id: 'when-to-use', label: 'When to Use' },
    { id: 'when-not-to-use', label: 'When NOT to Use' },
    { id: 'comparison', label: 'vs. Alternatives' },
    { id: 'takeaways', label: 'Key Takeaways' },
  ],
};
