import { Metadata } from 'next';
import PillNavigation from '@/components/landing/PillNavigation';
import { 
  Heart,
  Users,
  Target,
  Award,
  Sparkles,
  BookOpen,
  GraduationCap,
  Globe
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About MedBanqs - Your Partner in Medical Excellence | MedBanqs',
  description: 'Learn about MedBanqs\'s mission to revolutionize medical education through innovative learning technology and help medical students achieve their dreams.',
};

export default function AboutPage() {
  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Student-First Approach",
      description: "Every feature we build starts with understanding what medical students truly need to succeed."
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Innovation in Education",
      description: "Leveraging cutting-edge technology to make medical learning more effective and accessible."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Evidence-Based Learning",
      description: "Our methods are backed by educational research and proven learning science principles."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Driven",
      description: "Built by medical professionals and educators who understand the journey you're on."
    }
  ];

  const milestones = [
    { year: "2023", event: "MedBanqs founded with a vision to transform medical education" },
    { year: "2024", event: "Launched comprehensive learning platform with 5,000+ questions" },
    { year: "2024", event: "Reached 1,000+ active medical students" },
    { year: "2025", event: "Expanded to 5,000+ questions and achieved 94% pass rate" }
  ];

  return (
    <>
      <PillNavigation />
      <div className="min-h-screen bg-white pt-20">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Empowering Tomorrow's Doctors
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                MedBanqs is on a mission to make medical education more accessible, effective, and enjoyable through innovative technology and evidence-based learning.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  We believe every medical student deserves access to high-quality, personalized education that adapts to their unique learning needs.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  By combining the expertise of medical professionals with cutting-edge technology, we're creating a learning platform that not only helps students pass exams but truly understand and retain medical knowledge.
                </p>
                <p className="text-lg text-gray-600">
                  Our goal is simple: to help you become the confident, knowledgeable doctor you aspire to be.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <GraduationCap className="w-8 h-8 text-black mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">5,000+ Students</h3>
                      <p className="text-gray-600">Medical students actively preparing for their exams</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Award className="w-8 h-8 text-black mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">94% Pass Rate</h3>
                      <p className="text-gray-600">Significantly higher than the national average</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Globe className="w-8 h-8 text-black mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">UK & International</h3>
                      <p className="text-gray-600">Supporting students worldwide</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These principles guide everything we do at MedBanqs
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <div className="text-black">{value.icon}</div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Our Journey
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From a simple idea to helping thousands of medical students
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start mb-8">
                  <div className="flex-shrink-0 w-24 text-right mr-6">
                    <span className="text-sm font-bold text-gray-900">{milestone.year}</span>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 bg-black rounded-full mt-1 mr-6"></div>
                  <div className="flex-grow">
                    <p className="text-gray-600">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Have questions or feedback? We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@medbanqs.com"
                className="inline-block px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
              >
                Contact Support
              </a>
              <a
                href="/pricing"
                className="inline-block px-8 py-3 border-2 border-black text-black rounded-full font-semibold hover:bg-black hover:text-white transition-colors"
              >
                Get Started
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}