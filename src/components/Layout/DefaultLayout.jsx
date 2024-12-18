import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';

function DefaultLayout({ children }) {
    return (
      <div className="min-h-screen flex flex-col w-full">
        <Header />
        <Menu />
        <main className="flex-grow bg-gray-100 w-full">
          {/* Xóa max-w-7xl để content full width */}
          <div className="w-full px-4 py-6">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

export default DefaultLayout;