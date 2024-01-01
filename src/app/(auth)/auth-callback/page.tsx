'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { trpc } from '@/app/_trpc/client';
import { Loader2 } from 'lucide-react';

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get('origin');

  trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ success }) => {
      if (success) {
        router.push(origin ? `/${origin}` : '/dashboard');
      }
    },
    onError: (err) => {
      if (err.data?.code === 'UNAUTHORIZED') {
        router.push('/sign-in');
      }
    },
    retry: true,
    retryDelay: 500,
  });

  return (
    <div className="mt-80 flex w-full flex-col items-center justify-center gap-2">
      <Loader2 className="mt-6 h-8 w-8 animate-spin  text-zinc-800" />
      <h3 className="mt-6 font-mono text-xl font-semibold">
        Setting up your account...
      </h3>
      <p className="font-mono">You will be redirected automatically</p>
    </div>
  );
};

export default Page;
