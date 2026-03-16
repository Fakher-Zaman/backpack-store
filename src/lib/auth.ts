import { api } from '@/lib/axios';
import { loginSchema } from '@/types/auth.types';
import type { LoginInput, User } from '@/types/auth.types';

const USE_MOCK = !import.meta.env.VITE_API_URL;

export type LoginResult = {
  user: User;
  token: string;
};

/** Validate credentials with Zod, then authenticate (real API or mock). */
export async function loginUser(credentials: unknown): Promise<LoginResult> {
  const validated: LoginInput = loginSchema.parse(credentials);

  if (USE_MOCK) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      user: {
        id: '1',
        name: validated.email.split('@')[0],
        email: validated.email,
      },
      token: `mock-token-${Date.now()}`,
    };
  }

  const { data } = await api.post<LoginResult>('/auth/login', validated);
  return data;
}

/** Log out the current user. */
export async function logoutUser(): Promise<void> {
  if (USE_MOCK) return;
  await api.post('/auth/logout');
}
