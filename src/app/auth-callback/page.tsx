import { useRouter, useSearchParams } from 'next/navigation';
import { trpc } from '../_trpc/client';

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get('origin');
  const { data } = trpc.test.useQuery();
  return <>{/* <h1>Auth Callback</h1> */}</>;
}

export default Page;
