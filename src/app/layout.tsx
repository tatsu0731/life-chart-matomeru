import Header from "@/components/header";
import "./globals.css";
import Footer from "@/components/footer";
import ToastProvider from "@/components/toastProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <ToastProvider>
          <Header />
          <main className="flex justify-center">
            {children}
          </main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
