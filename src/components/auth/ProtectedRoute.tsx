import { useAuth } from '@/hooks/useAuth';

type ProtectedRouteProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export default function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return fallback ?? (
      <div className="flex items-center justify-center py-20">
        <p className="text-lg text-brand-charcoal">
          Please log in to access this page.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
