import { useRouter, useSearchParams } from 'next/navigation';

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get('origin');
  return (
    <>
      <h1>Auth Callback</h1>
    </>
  );
}

export default Page;
