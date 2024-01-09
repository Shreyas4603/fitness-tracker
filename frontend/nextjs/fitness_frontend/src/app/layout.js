import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={`{inter.className} border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 `}><Navbar/>{children}</body>
    </html>
  )
}
