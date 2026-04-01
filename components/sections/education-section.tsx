'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { Card } from '@/components/ui/card';
import { educationData } from '@/lib/constants';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/motion-variants';

export function EducationSection() {
  return (
    <SectionWrapper id="education">
      <h2 className="text-3xl md:text-4xl mb-8 text-center">Education</h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {educationData.map((item, i) => (
          <motion.div key={i} variants={staggerItemVariants}>
            <Card>
              <span className="text-primary font-medium text-sm">{item.period}</span>
              <h3 className="text-lg font-bold mt-1">{item.degree}</h3>
              <p className="text-text-muted text-sm">{item.school}</p>
              <p className="text-text-muted text-sm mt-2">{item.description}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
