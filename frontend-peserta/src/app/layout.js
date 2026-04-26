import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Frontend Peserta',
  description: 'CRUD Peserta dengan Next.js dan Tailwind CSS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-50 text-slate-800">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}