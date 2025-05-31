import './globals.css';
import { GuestProvider } from '../context/GuestContext';

export const metadata = {
  title: 'iTournary',
  description: 'Your complete travel planning platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <GuestProvider>
          {children}
        </GuestProvider>
      </body>
    </html>
  );
}
