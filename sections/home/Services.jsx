import { motion } from 'framer-motion';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { animateVariants, staggerContainer } from '@/lib/constants/animation';
import { MapPin, Clock, Calendar, Users } from 'lucide-react';

const ServiceItem = ({ icon, title, description }) => {
  const { ref, controls } = useAnimateInView();
  
  return (
    <motion.div 
      ref={ref}
      variants={animateVariants.fadeIn}
      initial="hidden"
      animate={controls}
      className="flex flex-col items-center text-center"
    >
      <div className="w-24 h-24 rounded-full bg-stone-200 flex items-center justify-center mb-6 transition-all duration-500 hover:shadow-md hover:bg-amber-50 group">
        <div className="transition-transform duration-500 group-hover:scale-110">
          {icon}
        </div>
      </div>
      <h3 className="font-serif text-2xl text-stone-800 mb-3">{title}</h3>
      <p className="text-stone-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default function ServicesSection() {
  const { ref, controls } = useAnimateInView();
  
  const services = [
    {
      icon: <MapPin size={32} className="text-amber-700" />,
      title: "Great Location",
      description: "Perfectly situated in an idyllic setting, offering both serene seclusion and convenient access to cultural attractions."
    },
    {
      icon: <Clock size={32} className="text-amber-700" />,
      title: "24 Hours Open",
      description: "Round-the-clock service ensuring your every need is met with promptness and professional attention at any hour."
    },
    {
      icon: <Calendar size={32} className="text-amber-700" />,
      title: "Reservations",
      description: "Effortless booking process with personalized options tailored to accommodate your schedule and preferences."
    },
    {
      icon: <Users size={32} className="text-amber-700" />,
      title: "Friendly Staff",
      description: "Our attentive team crafts bespoke experiences with genuine warmth and meticulous attention to detail."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={animateVariants.fadeIn}
            className="font-serif text-5xl text-stone-800 mb-3"
          >
            YOU'LL NEVER WANT TO LEAVE
          </motion.h2>
          
          <motion.div 
            variants={animateVariants.fadeIn} 
            className="flex justify-center mb-4"
          >
            <div className="w-20 h-px bg-amber-400"></div>
          </motion.div>
          
          <motion.p 
            variants={animateVariants.fadeIn}
            className="text-stone-600 max-w-3xl mx-auto text-lg"
          >
            Discover a sanctuary where time slows and comfort envelops you. Our meticulously curated services transform mere accommodation into an experience of profound luxury and belonging.
          </motion.p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {services.map((service, index) => (
            <ServiceItem 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}