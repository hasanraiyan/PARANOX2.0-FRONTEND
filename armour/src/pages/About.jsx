function About() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">About Us</h1>
            <div className="text-left space-y-4">
              <p className="text-gray-600">
                This application demonstrates React Router DOM v7 integration with a modern React setup.
              </p>
              <p className="text-gray-600">
                Key features implemented:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>BrowserRouter configuration</li>
                <li>Multiple page routing</li>
                <li>Navigation with active link highlighting</li>
                <li>Responsive design with Tailwind CSS</li>
                <li>Modern React 19 with Vite build tool</li>
              </ul>
              <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-400">
                <p className="text-green-700">
                  Built with React Router DOM v7.9.3 for optimal performance and developer experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About