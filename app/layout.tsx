import Sidebar from './components/Sidebar';
import './globals.css';
import { metdataProps } from '@/app/types/types';

export const metdata: metdataProps = {
  title: 'Personnal Finance App',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
      </head>
      <body>
        <main className="flex h-screen">
          <Sidebar />
          {children}
        </main>
      </body>
    </html>
  );
}
