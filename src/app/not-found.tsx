import Link from "next/link";
import { BookOpen, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center text-white px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mx-auto mb-8 shadow-glow">
          <BookOpen className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-8xl font-extrabold gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-surface-400 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/dashboard" className="btn-primary px-6 py-3">
            <Home className="w-4 h-4 mr-2" /> Go to Dashboard
          </Link>
          <Link href="/" className="btn-ghost border-white/20 text-surface-300 hover:text-white hover:bg-white/10 px-6 py-3">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
