import React from 'react';

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Home</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Featured Content</h2>
          <p className="text-gray-600">
            This is your homepage. You can customize this content to match your needs.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Section 1</h3>
            <p className="text-gray-600">Content for section 1 goes here.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Section 2</h3>
            <p className="text-gray-600">Content for section 2 goes here.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Section 3</h3>
            <p className="text-gray-600">Content for section 3 goes here.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;