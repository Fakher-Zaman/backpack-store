import { Link } from 'react-router-dom';
import AnimatedPage from '@/components/ui/AnimatedPage';

export default function NotFoundPage() {
  return (
    <AnimatedPage>
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-6xl font-bold text-brand-green-dark dark:text-brand-green-light">404</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          to="/"
          className="mt-6 rounded-full bg-brand-green-dark px-8 py-3 text-sm
            font-semibold uppercase tracking-wider text-white transition-colors
            hover:bg-brand-green"
        >
          Back to Home
        </Link>
      </div>
    </AnimatedPage>
  );
}
