/**
 * Registry mapping blog post slugs to their content components.
 * Used by the blog [slug] page to resolve content at build time.
 */
import { type ComponentType } from 'react';
import { KafkaStreamsBasicsContent } from './kafka-streams-basics';

export const blogContentRegistry: Record<string, ComponentType> = {
  'kafka-streams-basics': KafkaStreamsBasicsContent,
};
