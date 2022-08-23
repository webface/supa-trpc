import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Link } from '@/components/Link';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { GoogleIcon } from '@/components/Icons';

export const SignInForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const t = useTranslations('auth');

  const handleSignIn = async () => {
    // clear error message
    setErrorMessage(undefined);
    setLoading(true);

    const { user, error } = await supabaseClient.auth.signIn({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    if (user) router.push('/dashboard');
  };

  const handleGoogleSignIn = async () => {
    await supabaseClient.auth.signIn({
      provider: 'google',
    });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSignIn();
      }}
      method="POST"
      className="space-y-6"
    >
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {t('email')}
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            {t('password')}
          </label>
          <div className="text-sm">
            <Link href="/auth/forgot">{t('forgot')}</Link>
          </div>
        </div>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
            className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
      </div>

      {errorMessage && <p className="text-sm text-red-600 ">{errorMessage}</p>}

      <div className="space-y-4">
        <button
          type="submit"
          disabled={loading}
          className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {loading ? <LoadingSpinner /> : t('signIn')}
        </button>

        <button
          className="flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 border border-transparent border-gray-300 rounded-md shadow-sm border-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          type="button"
          onClick={handleGoogleSignIn}
        >
          <div className="flex gap-2">
            <GoogleIcon className="w-4" />
            {t('signInGoogle')}
          </div>
        </button>
      </div>
    </form>
  );
};
