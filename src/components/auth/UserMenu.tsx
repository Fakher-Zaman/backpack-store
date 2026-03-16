import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

type UserMenuProps = {
  onDashboard: () => void;
};

export default function UserMenu({ onDashboard }: UserMenuProps) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  if (!user) return null;

  return (
    <div ref={menuRef} className="relative hidden md:block">
      <button
        onClick={() => setOpen(prev => !prev)}
        aria-label="User menu"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm
          font-semibold text-white transition-colors hover:bg-white/30"
      >
        {user.name.charAt(0).toUpperCase()}
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-white py-2 shadow-lg
            ring-1 ring-black/5"
        >
          <div className="border-b border-gray-100 px-4 py-2">
            <p className="text-sm font-medium text-brand-charcoal">{user.name}</p>
            <p className="truncate text-xs text-gray-500">{user.email}</p>
          </div>

          <button
            onClick={() => { setOpen(false); onDashboard(); }}
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-brand-charcoal
              transition-colors hover:bg-gray-50"
          >
            Dashboard
          </button>

          <button
            onClick={() => { setOpen(false); logout(); }}
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600
              transition-colors hover:bg-gray-50"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
