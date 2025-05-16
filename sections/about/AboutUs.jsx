import { useAnimateInView } from '@/hooks/useAnimateInView';
import { animateVariants } from '@/lib/constants/animation';
import { motion } from 'framer-motion';
import { useState } from 'react';

const AboutUsSection = () => {
  const { ref: sectionRef, controls: sectionControls } = useAnimateInView(0.1);
  const { ref: imageRef, controls: imageControls } = useAnimateInView(0.2);
  const { ref: quoteRef, controls: quoteControls } = useAnimateInView(0.3);
  const { ref: signatureRef, controls: signatureControls } = useAnimateInView(0.4);
  
  // Testimonial carousel state
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = [
    {
      quote: "We don't just create spaces – we craft experiences that resonate with your lifestyle and aspirations.",
      author: "Emmanuel Owusu",
      position: "Founder & Creative Director"
    },
    {
      quote: "Luxury isn't excess; it's the perfect balance of elegance, function, and personal expression.",
      author: "Emmanuel Owusu",
      position: "Founder & Creative Director"
    }
  ];

  return (
    <section className="relative py-24 bg-neutral-50 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-amber-200 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-stone-300 blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section heading */}
        <motion.div 
          ref={sectionRef}
          initial="hidden"
          animate={sectionControls}
          variants={animateVariants.fadeIn}
          className="mb-16 max-w-xl mx-auto text-center"
        >
          <h2 className="font-light text-stone-400 uppercase tracking-widest mb-3">About Us</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6">Where Elegance Meets Innovation</h3>
          <div className="w-20 h-px bg-amber-400 mx-auto"></div>
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image with border frame */}
          <motion.div 
            ref={imageRef}
            initial="hidden"
            animate={imageControls}
            variants={animateVariants.fadeInLeft}
            className="relative"
          >
            <div className="absolute inset-0 border border-amber-200 translate-x-4 translate-y-4"></div>
            <div className="relative bg-stone-100 aspect-square overflow-hidden">
              <img 
                src="/rear-view-woman.avif" 
                alt="Emmanuel Owusu, Founder and Creative Director" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-4 shadow-lg">
              <p className="text-stone-500 font-light italic">Est. 2010</p>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div 
            ref={quoteRef}
            initial="hidden"
            animate={quoteControls}
            variants={animateVariants.fadeInRight}
            className="flex flex-col space-y-8"
          >
            <div>
              <h4 className="text-2xl md:text-3xl font-serif text-stone-800 mb-6">Creating exceptional spaces for discerning clients</h4>
              <p className="text-stone-600 leading-relaxed mb-6">
                For over a decade, we've been transforming vision into reality for our distinguished clientele. Our approach combines timeless elegance with contemporary innovation, ensuring each project reflects not just current trends, but enduring sophistication.
              </p>
              <p className="text-stone-600 leading-relaxed">
                We believe luxury is personal. It's found in the thoughtful details, the perfect proportions, and the harmonious balance of elements that create not just a beautiful space, but one that tells your unique story. Our award-winning team brings technical precision and artistic vision to every project, whether a complete residence or a singular statement piece.
              </p>
            </div>

            {/* Testimonial carousel */}
            <div className="bg-white p-6 border-l-4 border-amber-400 shadow-sm">
              <p className="text-lg font-serif italic text-stone-700 mb-4">
                "{testimonials[activeTestimonial].quote}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-stone-800">{testimonials[activeTestimonial].author}</p>
                  <p className="text-sm text-stone-500">{testimonials[activeTestimonial].position}</p>
                </div>
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button 
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-2 h-2 rounded-full ${index === activeTestimonial ? 'bg-amber-400' : 'bg-stone-300'}`}
                      aria-label={`View testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Values or services highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          {[
            {
              title: "Bespoke Design",
              description: "Crafted exclusively for you, reflecting your unique lifestyle and aspirations.",
              delay: 0.1
            },
            {
              title: "Impeccable Quality",
              description: "Sourcing only the finest materials and partnering with master craftspeople worldwide.",
              delay: 0.3
            },
            {
              title: "Timeless Appeal",
              description: "Creating spaces that transcend trends while embracing contemporary sensibilities.",
              delay: 0.5
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate={sectionControls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { delay: item.delay, duration: 0.6, ease: "easeOut" }
                }
              }}
              className="text-center p-6"
            >
              <div className="w-16 h-px bg-amber-400 mx-auto mb-6"></div>
              <h5 className="text-xl font-serif text-stone-800 mb-3">{item.title}</h5>
              <p className="text-stone-600">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial="hidden"
          animate={sectionControls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { delay: 0.7, duration: 0.6, ease: "easeOut" }
            }
          }}
          className="mt-16 text-center"
        >
          <button className="px-8 py-3 bg-stone-800 text-white hover:bg-amber-700 transition-colors duration-300">
            Schedule a Consultation
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsSection;