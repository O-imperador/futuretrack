import { useState, useEffect } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Med Al Habib",
    role: "Ai engineer",
    content:
      "FutureTrack helped me discover my passion for coding and laid out the perfect roadmap to transition from marketing to tech. Two years later, I'm at my dream job!",
    image: "/astraunaut.jpg",
  },
  {
    id: 2,
    name: "Ryan Klinkmuller",
    role: "Pilot",
    content:
      "FutureTrack helped me realize that being a pilot isn’t just my dream job — it’s also the perfect career match for my personality.",
    image: "/cook.jpg",
  },
  {
    id: 3,
    name: "Marwa Mcharek",
    role: "Fashion Stylist",
    content:
      "I've always had a deep love for fashion, drawing, and design, I enjoy being creative in every form. FutureTrack really captured that perfectly.",
    image: "/detective.jpg",
  },
  {
    id: 4,
    name: "Med Amin CH",
    role: "Film Director",
    content:
      "Thanks to FutureTrack, I discovered that film directing isn’t just a passion... it’s the career I’m truly meant for. It gave me the clarity and confidence to pursue it wholeheartedly.",
    image: "Untitled design.png",
  },
  {
    id: 5,
    name: "Aisha Patel",
    role: "UX Designer",
    content:
      "The roadmap FutureTrack created for me was spot on! It helped me identify the right courses, build my portfolio, and land interviews with top companies.",
    image: "/Untitled design (4).png",
  },
];

const TestimonialSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 md:py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-future-700">
          Success Stories
        </h2>

        <div className="max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`transition-opacity duration-500 ${
                index === activeIndex ? "block opacity-100" : "hidden opacity-0"
              }`}
            >
              <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="mb-6 md:mb-0 md:mr-8">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg md:text-xl mb-6 text-gray-700">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <h4 className="font-semibold text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-future-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 mx-1 rounded-full ${
                  index === activeIndex ? "bg-future-600" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
