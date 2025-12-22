
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { CheckCircle, Book, Calendar, ArrowRight } from "lucide-react";
import '../styles/Header.css';
import TestimonialSlider from "../components/TestimonialSlider";
const simpleButtonBase =
  "rounded-md font-semibold text-base border border-gray-200 bg-white hover:bg-gray-50 shadow-sm transition-all duration-150";

const accentColor = "text-future-700";

const Astro_IMAGE =
  "/astraunaut.jpg";
const UX_IMAGE =
  "/detective.jpg";
const ENV_IMAGE =
  "/cook.jpg";

const Index = () => {
  return (
    
    <div className="flex flex-col min-h-screen bg-white">
    <Navbar/>
      {/* Hero Section */}
    <section className="relative h-[95vh] bg-pastel-parallax text-gray-800 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/90 to-gray-900/90 opacity-60 z-10"></div>

        <div className="container mx-auto px-4 py-16 text-center relative z-20">
          <h1 className={`text-4xl md:text-6xl font-bold mb-4 text-future-200`}>Discover Your Future with FutureTrack — one decision at a time.</h1>
          <p className="text-2xl md:text-3xl mb-8 max-w-2xl mx-auto text-white">
            Take our quiz to unlock a personalized career roadmap tailored to your passions and strengths.
          </p>
          <a
            href="/quiz"
            className="inline-block bg-future-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-future-700 transition"
          >
            Find Your Future Self
          </a>
      </div>
    </section>

      {/* How It Works Section */}
      <section className="py-14 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${accentColor}`}>How It Works</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              3 steps to discover & plan your career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center bg-white rounded-2xl py-8 px-4 shadow-sm">
              <div className="w-14 h-14 flex items-center justify-center mb-6 rounded-full bg-purple-500/20">
                <CheckCircle className="h-7 w-7 text-future-700" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${accentColor}`}>Take the Quiz</h3>
              <p className="text-gray-600">
                Answer questions on your interests, skills, and values.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center bg-white rounded-2xl py-8 px-4 shadow-sm">
              <div className="w-14 h-14 flex items-center justify-center mb-6 rounded-full bg-purple-500/20">
                <Book className="h-7 w-7 text-future-700" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${accentColor}`}>Get Matched</h3>
              <p className="text-gray-600">
                Our AI finds careers that fit you best.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center bg-white rounded-2xl py-8 px-4 shadow-sm">
              <div className="w-14 h-14 flex items-center justify-center mb-6 rounded-full bg-purple-500/20">
                <Calendar className="h-7 w-7 text-future-700" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${accentColor}`}>Begin Your Roadmap</h3>
              <p className="text-gray-600">
                See real, actionable steps and resources for your future.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button
              asChild
              size="lg"
              className={`${simpleButtonBase} border-purple-500 hover:border-pastel-blue ${accentColor}`}
            >
              <Link to="/quiz">
                Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="mb-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-2 text-cyan-600">Careers to Explore</h2>
      <p className="text-lg text-gray-500 max-w-xl mx-auto">
        See how FutureTrack maps real career journeys.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Career 1 */}
      <Card className="relative overflow-hidden hover:shadow-md bg-gray-50 rounded-xl group">
        <img
          src={Astro_IMAGE}
          alt="Software Developer"
          className="w-full h-80 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
        />
        <CardContent className="absolute inset-0 bg-gray-100/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-2 text-purple-700">Astronaut</h3>
          <p className="text-lg text-black mb-2">
          Explore space, conduct experiments, and operate spacecraft in extreme environments.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="border text-xs text-bold px-2 py-1 rounded-full text-purple-500 border-purple-500/40">
            Physical fitness
            </span>
            <span className="border text-xs text-bold px-2 py-1 rounded-full text-purple-600 border-purple-500/40">
              Adaptability
            </span>
            <span className="border text-xs text-bold px-2 py-1 rounded-full text-purple-600 border-purple-500/40">
              Teamwork
            </span>
            <span className="border text-xs text-bold px-2 py-1 rounded-full text-purple-600 border-purple-500/40">
              Engineering
            </span>
          </div>
          <Button asChild variant="outline" className="w-full border-purple-500 text-purple-500">
            <Link to="/roadmap">View Roadmap</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Career 2 */}
      <Card className="relative overflow-hidden hover:shadow-md bg-gray-50 rounded-xl group">
        <img
          src={UX_IMAGE}
          alt="UX Designer"
          className="w-full h-80 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
        />
        <CardContent className="absolute inset-0 bg-gray-100/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-2 text-blue-600">Detective</h3>
          <p className="text-lg text-black mb-2">
          Investigate crimes, gather evidence, and solve mysteries to uncover the truth.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="border text-xs px-2 py-1 rounded-full text-bold text-blue-600 border-blue-600/40">
              Critical thinking
            </span>
            <span className="border text-xs px-2 py-1 rounded-full text-bold text-blue-600 border-blue-600/40">
              Observation
            </span>
            <span className="border text-xs px-2 py-1 rounded-full text-bold text-blue-600 border-blue-600/40">
            Analytical reasoning
            </span>
            <span className="border text-xs px-2 py-1 rounded-full text-bold text-blue-600 border-blue-600/40">
            Communication
            </span>
          </div>
          <Button asChild variant="outline" className="w-full border-blue-600 text-blue-600">
            <Link to="/roadmap">View Roadmap</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Career 3 */}
      <Card className="relative overflow-hidden hover:shadow-md bg-gray-50 rounded-xl group">
        <img
          src={ENV_IMAGE}
          alt="Environmental Scientist"
          className="w-full h-80 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
        />
        <CardContent className="absolute inset-0 bg-gray-100/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-2 text-green-600">Chef</h3>
          <p className="text-lg text-black mb-2">
          Lead the kitchen, craft menus, and elevate dishes with creativity and precision.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="border text-xs px-2 py-1 rounded-full text-bold text-green-600 border-green-600/40">
            Culinary mastery
            </span>
            <span className="border text-xs px-2 py-1 rounded-full text-bold text-green-600 border-green-600/40">
              Leadership
            </span>
            <span className="border text-xs px-2 py-1 rounded-full text-bold text-green-600 border-green-600/40">
              Organization
            </span>
            <span className="border text-xs px-2 py-1 rounded-full text-bold text-green-600 border-green-600/40">
              Creativity
            </span>
          </div>
          <Button asChild variant="outline" className="w-full border-green-600 text-green-600">
            <Link to="/roadmap">View Roadmap</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
    
  </div>
</section>

      {/* Testimonial Section */}
      <TestimonialSlider />

      <Footer />
    </div>
  );
};

export default Index;
