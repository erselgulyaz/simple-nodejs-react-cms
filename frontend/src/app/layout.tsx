import './globals.css'
import { ReactNode } from 'react';
import Sidebar from 'components/common/sidebar';

export const metadata = {
  title: 'CMS',
  description: 'CMS Application',
}

interface LayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen">
          <Sidebar />

          <main id="main-wrapper">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
