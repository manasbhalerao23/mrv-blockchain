import { Play, ArrowRight, Leaf, Shield, Users } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted?: () => void;
  onWatchVideo?: () => void;
  backgroundImageUrl?: string;
}

export default function HeroSection({ onGetStarted, onWatchVideo, backgroundImageUrl }: HeroSectionProps) {
  const bgUrl = backgroundImageUrl ||
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070&auto=format&fit=crop';

  return (
    <section className="relative min-h-screen flex items-start">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgUrl})` }}
      >
        <div className="absolute inset-0 bg-white/70"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/60"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="font-extrabold tracking-tight text-5xl sm:text-6xl lg:text-6xl xl:text-7xl -mt-2 sm:-mt-1 mb-8 sm:mb-12">
                <span className="text-blue-600">Blue</span>
                <span className="text-gray-900">Roots</span>
              </div>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 backdrop-blur-sm">
                <Leaf className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-700">Blockchain-Powered MRV System</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                India's First
                <span className="block">
                  <span className="text-blue-600">Blue</span>
                  <span className="text-gray-900"> Carbon Registry</span>
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-gray-700 max-w-xl">
                Transform coastal ecosystem restoration through blockchain technology.
                Monitor, verify, and tokenize carbon credits from mangrove and wetland projects.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600" data-testid="text-projects-count">150+</div>
                <div className="text-sm text-gray-600">Active Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600" data-testid="text-credits-count">2.3M</div>
                <div className="text-sm text-gray-600">Carbon Credits</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600" data-testid="text-partners-count">50+</div>
                <div className="text-sm text-gray-600">Partners</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onGetStarted}
                className="inline-flex items-center justify-center rounded-md bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white text-lg font-medium transition-colors shadow-sm"
                data-testid="button-get-started"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>

              <button
                onClick={onWatchVideo}
                className="inline-flex items-center justify-center rounded-md bg-white hover:bg-gray-50 border border-gray-200 px-6 py-3 text-gray-900 text-lg font-medium transition-colors"
                data-testid="button-watch-video"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>
          </div>

          <div className="space-y-6 lg:mt-24">
            <div className="p-6 bg-white backdrop-blur-md border border-gray-200 rounded-xl shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Blockchain Security</h3>
                  <p className="text-gray-600">Immutable verification and transparent carbon credit tracking</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white backdrop-blur-md border border-gray-200 rounded-xl shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Leaf className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Smart MRV System</h3>
                  <p className="text-gray-600">AI-powered monitoring with drone and satellite integration</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white backdrop-blur-md border border-gray-200 rounded-xl shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Community Driven</h3>
                  <p className="text-gray-600">Empowering NGOs, Panchayats, and coastal communities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
