import React from "react";
import Typewriter from "typewriter-effect";
import { Button } from "@/components/molecular/button";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/molecular/accordion";

function Hero() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-[#FFF5EC] to-[#FDEFF4] p-6 md:p-10 lg:p-20">
      {/* Main Content */}
      <div className="text-center max-w-5xl bg-[#FFFFFF] p-10 rounded-3xl shadow-lg border border-[#DE3163]">
        <h1 className="font-black text-3xl md:text-5xl lg:text-6xl leading-tight text-[#111827] mb-6">
          <Typewriter
            options={{
              strings: [
                "AI-Powered Journeys Await.",
                "Redefine the Way You Travel.",
                "Plans Tailored Just for You.",
                "Where Ideas Turn into Itineraries.",
              ],
              autoStart: true,
              loop: true,
              delay: 55,
              deleteSpeed: 25,
              pauseFor: 2300,
            }}
          />
        </h1>
        <p className="text-base md:text-xl text-[#374151] font-normal mb-8 leading-relaxed">
          Let intelligent tools guide your next adventure—smart planning,
          personalized experiences, and zero stress.
        </p>
        <Link to="/create-trip">
          <Button className="px-8 py-4 bg-[#DE3163] text-white font-bold rounded-lg hover:bg-[#f04370] transition-all duration-300 shadow-md">
            Plan Your Escape
          </Button>
        </Link>
      </div>

      {/* Features */}
      <section id="features" className="mt-24 w-full max-w-6xl scroll-mt-20">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-[#1F2937] mb-14">
          What Sets Us Apart
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {[
            {
              title: "Tailored Planning",
              desc: "From solo escapes to family vacations, your journey is crafted around you.",
            },
            {
              title: "Informed Suggestions",
              desc: "Explore trending spots, hidden gems, and curated guides.",
            },
            {
              title: "One-Click Scheduling",
              desc: "Drag, drop, and build your itinerary in minutes.",
            },
            {
              title: "24x7 Travel Companion",
              desc: "We’re always one tap away for help or recommendations.",
            },
            {
              title: "Live Travel Feed",
              desc: "Receive flight changes and weather alerts in real-time.",
            },
            {
              title: "Flexible Modifications",
              desc: "Easily fine-tune your travel schedule on the go.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-[#f78aa2] shadow-md hover:shadow-lg transition duration-300"
            >
              <h3 className="text-lg font-semibold text-[#DE3163] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[#444]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="mt-24 w-full max-w-4xl scroll-mt-20">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-[#1F2937] mb-14">
          Frequently Asked Questions
        </h2>
        <Accordion
          type="single"
          collapsible
          className="bg-white rounded-xl shadow-lg border border-[#f78aa2]"
        >
          {[
            {
              q: "Is this tool beginner-friendly?",
              a: "Absolutely! Our interface is intuitive and designed for users of all experience levels.",
            },
            {
              q: "What data does the AI use?",
              a: "It learns from your travel interests, destinations you like, and feedback you give.",
            },
            {
              q: "Can I invite friends to collaborate?",
              a: "Yes, share and co-edit your itinerary with ease using a simple invite link.",
            },
          ].map((item, index) => (
            <AccordionItem key={index} value={`faq-${index + 1}`}>
              <AccordionTrigger className="font-medium bg-[#111827] text-white px-6 py-4 hover:bg-[#DE3163] transition">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-white p-5 bg-[#DE3163]">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="mt-24 w-full max-w-6xl text-center scroll-mt-20"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1F2937] mb-14">
          Hear From Our Travelers
        </h2>
        <div className="flex flex-wrap justify-center gap-8 px-4">
          {[
            {
              text: "Finally, an app that *gets* my travel style. The AI nailed my preferences on the first try!",
              author: "– Priya M.",
            },
            {
              text: "Real-time flight alerts saved my entire weekend getaway. Amazing service and so simple to use.",
              author: "– Alex G.",
            },
            {
              text: "The planning experience felt like chatting with a friend—fun, quick, and on point.",
              author: "– Damien T.",
            },
            {
              text: "This app helped me book, plan, and explore—all in one place. It’s my new travel essential.",
              author: "– Nina F.",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="w-[280px] md:w-[300px] bg-white p-6 rounded-xl border border-[#f78aa2] shadow hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <p className="text-sm text-[#444] font-light">
                {testimonial.text}
              </p>
              <p className="mt-4 text-[#DE3163] font-medium">
                {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Image Gallery */}
      <section id="gallery" className="mt-24 w-full max-w-6xl scroll-mt-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1F2937] text-center mb-14">
          Glimpses of Exploration
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden shadow-md border border-[#eee] hover:scale-105 transition-transform duration-300"
            >
              <img
                src={`/images/img-${index}.jpg`}
                alt={`Scenic view ${index}`}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Hero;
