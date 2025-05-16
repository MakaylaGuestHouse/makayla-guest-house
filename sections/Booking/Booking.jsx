"use client"
import { BookingForm } from './BookingForm';
import { BookingLeftContent } from './BookingLeftContent';

export default function BookingSection() {

   return (
      <section
         className="relative min-h-screen bg-stone-900 overflow-hidden"
         style={{
            backgroundImage: 'url(/tourist.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
         }}
      >
         {/* Overlay */}
         <div className="absolute inset-0 bg-gradient-to-r from-stone-900/60 via-stone-900/85 to-stone-900/80"></div>

         <div className="relative max-w-7xl mx-auto px-4 py-24 flex flex-col lg:flex-row items-stretch">
            {/* Left Content */}
            <BookingLeftContent />

            {/* Right Form */}
            <BookingForm />
         </div>
      </section>
   );
}