export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-6xl font-bold text-center mb-6">
          Track App: AI Racing Coach
        </h1>
        <p className="text-2xl text-center text-gray-400 max-w-3xl mb-12">
          Turn your track day data into actionable coaching insights
        </p>
        
        <div className="flex gap-4">
          <a href="https://trackapp-portal.vercel.app" className="px-8 py-4 bg-green-600 rounded-lg font-semibold hover:bg-green-700">
            View Live Demo
          </a>
          <a href="https://github.com/scottcollier10/track-app-mvp" className="px-8 py-4 border border-gray-700 rounded-lg font-semibold hover:border-gray-500">
            See the Code
          </a>
        </div>

        <div className="grid grid-cols-4 gap-8 mt-20">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500">12+</div>
            <div className="text-gray-500">Features</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500">54</div>
            <div className="text-gray-500">Tests</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500">2s</div>
            <div className="text-gray-500">AI Response</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500">0</div>
            <div className="text-gray-500">Dependencies</div>
          </div>
        </div>
      </div>

      <div className="py-20 px-4">
        <h2 className="text-4xl font-bold text-center mb-16">What It Does</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 border border-gray-800 rounded-lg">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">Automated Analysis</h3>
            <p className="text-gray-400">
              Every track session automatically scored for consistency, pace trends, and fatigue patterns
            </p>
          </div>
          <div className="p-6 border border-gray-800 rounded-lg">
            <div className="text-3xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-2">AI Coaching</h3>
            <p className="text-gray-400">
              Claude Sonnet translates your data into prioritized, actionable recommendations
            </p>
          </div>
          <div className="p-6 border border-gray-800 rounded-lg">
            <div className="text-3xl mb-4">📈</div>
            <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
            <p className="text-gray-400">
              See your improvement over time with session filtering and track-specific records
            </p>
          </div>
        </div>
      </div>

      <footer className="py-12 text-center text-gray-500 border-t border-gray-900">
        <p>Built with Next.js, Supabase, and Claude AI</p>
        <p className="mt-2">© 2025 Scott Collier</p>
      </footer>
    </main>
  );
}
