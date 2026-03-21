import { Calendar } from './components/Calendar'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Esan High School
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-blue-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl font-medium">
            Academic Calendar 2026
          </p>
          <div className="mt-4 flex justify-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span className="text-gray-600">Events</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="text-gray-600">Exams</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="text-gray-600">Holidays</span>
            </div>
          </div>
        </div>
        
        <Calendar />
        
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>© 2026 Esan High School Academic Affairs. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

export default App
