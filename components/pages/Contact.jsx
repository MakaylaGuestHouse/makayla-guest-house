"use client"

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react";
import { useAnimateInView } from "@/hooks/useAnimateInView";
import { animateVariants, staggerContainer } from "@/lib/constants/animation";
import LocationSection from "@/sections/Location";
import { FaPhone } from "react-icons/fa";
import { SectionHeader } from "../common/SectionHeader";
import { WhatsAppLink } from "../common/WhatsApp";
import WorkingHours from "../ui/WorkingHours";

// Define additional animation variants

const buttonHoverVariant = {
  initial: { backgroundColor: "#44403c" }, // stone-800
  hover: { backgroundColor: "#b45309" }    // amber-700
};

// Ghana phone numbers
const contactDetails = [
  { type: "Phone", value: "0241656352", icon: <FaPhone className="h-5 w-5 text-amber-600" />, link: "tel:0241656352" },
  { type: "Phone", value: "0553383460", icon: <FaPhone className="h-5 w-5 text-amber-600" />, link: "tel:0553383460" },
  { type: "Phone", value: "0201092916", icon: <FaPhone className="h-5 w-5 text-amber-600" />, link: "tel:0201092916" },
];

const ContactPage = () => {
  const formRef = useRef(null);
  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animation hooks
  const contactFormSection = useAnimateInView();
  const contactInfoSection = useAnimateInView();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setFormStatus("success");
    setIsSubmitting(false);
    formRef.current.reset();

    // Reset success message after 5 seconds
    setTimeout(() => {
      setFormStatus(null);
    }, 5000);
  };

  return (
    <div className="bg-white text-stone-600 ">


      {/* Contact Form & Information */}
      <section className="py-20 md:py-24 lg:py-32 bg-stone-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* // SectionHeader for Contact Us page */}
        <SectionHeader
          title="Contact Us"
          subTitle="We're Here to Assist You"
          description="Experience personalized luxury and attentive service at Makayla Guest House. Our dedicated concierge team is available 24/7 to assist with reservations, special requests, and to create bespoke experiences tailored to your preferences."
        />
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
            {/* Contact Form */}
            <motion.div
              ref={contactFormSection.ref}
              initial="hidden"
              animate={contactFormSection.controls}
              variants={animateVariants.fadeInLeft}
              className="w-full md:w-7/12 lg:w-1/2"
            >
              <div className="bg-white p-8 md:p-10 lg:p-12 shadow-sm rounded-sm">
                <h2 className="font-serif text-2xl md:text-3xl text-stone-800 mb-2">
                  Send Us a Message
                </h2>
                <div className="w-16 h-px bg-amber-400 mb-8" />

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-6 md:space-y-0 md:flex md:gap-6">
                    <div className="w-full md:w-1/2">
                      <label htmlFor="name" className="block text-sm uppercase tracking-wider font-light mb-2 text-stone-600">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full border-b border-stone-300 py-3 px-1 bg-transparent focus:outline-none focus:border-amber-700 transition-colors"
                      />
                    </div>
                    <div className="w-full md:w-1/2">
                      <label htmlFor="email" className="block text-sm uppercase tracking-wider font-light mb-2 text-stone-600">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full border-b border-stone-300 py-3 px-1 bg-transparent focus:outline-none focus:border-amber-700 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm uppercase tracking-wider font-light mb-2 text-stone-600">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full border-b border-stone-300 py-3 px-1 bg-transparent focus:outline-none focus:border-amber-700 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm uppercase tracking-wider font-light mb-2 text-stone-600">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      required
                      className="w-full border-b border-stone-300 py-3 px-1 bg-transparent focus:outline-none focus:border-amber-700 transition-colors resize-none"
                    ></textarea>
                  </div>

                  <div>
                    <motion.button
                      type="submit"
                      initial="initial"
                      whileHover="hover"
                      variants={buttonHoverVariant}
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-2 px-8 py-3 bg-stone-800 text-white font-medium transition-colors disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send size={16} />
                        </>
                      )}
                    </motion.button>

                    {formStatus === "success" && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 text-green-600"
                      >
                        Your message has been sent successfully. We'll respond shortly.
                      </motion.p>
                    )}
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              ref={contactInfoSection.ref}
              initial="hidden"
              animate={contactInfoSection.controls}
              variants={animateVariants.fadeInRight}
              className="w-full md:w-5/12 lg:w-1/2"
            >
              <h2 className="font-serif text-2xl md:text-3xl text-stone-800 mb-2">
                Contact Info
              </h2>
              <div className="w-16 h-px bg-amber-400 mb-8" />

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-8 md:space-y-10"
              >
                <motion.div variants={animateVariants.fadeIn} className="flex items-start gap-5 w-full">
                  <div className="rounded-full bg-amber-50 p-3 ">
                    <Phone className="w-5 h-5 text-amber-700" />
                  </div>
                  <div className="space-y-4 w-full">
                    {contactDetails.map((contact, index) => (
                      <a
                        href={contact.link}
                        key={index}
                        className="flex flex-col items- group hover:bg-amber-50 p-2 rounded-lg transition-colors w-full"
                      >
                        <p className="text-sm text-stone-500">{contact.type}</p>
                        <p className="text-stone-700 font-medium">{contact.value}</p>
                      </a>
                    ))}
                    <div className="grid grid-cols-2 items-center max-w-[90%] gap-3 ">
                      <a
                        href="tel:0553383460"
                        className="inline-flex items-center px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 font-medium text-sm shadow-md hover:shadow-lg transform transition-all duration-300"
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Contact Front Desk
                      </a>
                      <WhatsAppLink />
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={animateVariants.fadeIn} className="flex items-start gap-5">
                  <div className="rounded-full bg-amber-50 p-3">
                    <Mail className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-stone-800 mb-1">Email</h3>
                    <p className="leading-relaxed">
                      Reservations: makaylaguesthouse@gmail.com.com<br />
                      General Inquiries: info@makaylaguesthouse.com
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={animateVariants.fadeIn} className="flex items-start gap-5">
                  <div className="rounded-full bg-amber-50 p-3">
                    <MapPin className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-stone-800 mb-1">Address</h3>
                    <p className="leading-relaxed">
                      22 Abesim Main Road<br />
                      Abesim, Bono Region <br />
                      Ghana
                    </p>
                  </div>
                </motion.div>
                <motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <WorkingHours />

      <LocationSection />

    </div>
  );
};

export default ContactPage;