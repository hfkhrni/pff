import { useRouter, useSearchParams } from 'next/navigation';
import { trpc } from '../_trpc/client';

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get('origin');
  const { data, isLoading } = trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ success }) => {
      if (success) {
        router.push(origin ? `/${origin}` : '/dashboard');
      }
    },
  });
  return <>{/* <h1>Auth Callback</h1> */}</>;
}

export default Page;
