// app/layout.js
import "./globals.css";
import { Toaster } from "react-hot-toast";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export const metadata = {
  title: "Success Education | Premier Coaching for IIT-JEE, NEET & Board Exams",
  description:
    "Success Education is a premier coaching institute for IIT-JEE, NEET, MHT-CET, and Board Exam preparation. Expert faculty, proven results, trusted by thousands of students.",
  keywords:
    "IIT JEE coaching, NEET preparation, MHT-CET, board exam coaching, Success Education",
  openGraph: {
    title: "Success Education | Premier Coaching Institute",
    description:
      "Expert coaching for IIT-JEE, NEET, and Board Exams. Join thousands of successful students.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Fonts via link tag instead of @import — avoids CSS parse errors */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <SmoothScrollProvider>
          {children}
          <WhatsAppFloat />
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 4500,
              style: {
                fontFamily: "var(--font-body)",
                borderRadius: "0.75rem",
                fontWeight: "500",
                fontSize: "0.9rem",
              },
              success: {
                style: {
                  background: "#0d1330",
                  color: "#fcc419",
                  border: "1px solid rgba(252,196,25,0.3)",
                },
                iconTheme: {
                  primary: "#fcc419",
                  secondary: "#0d1330",
                },
              },
              error: {
                style: {
                  background: "#1a0a0a",
                  color: "#ff6b6b",
                  border: "1px solid rgba(255,107,107,0.3)",
                },
              },
            }}
          />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
