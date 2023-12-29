import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) redirect('/auth-callback?origin=dashboard');

  return (
    <>
      <h1>
        {user?.email}
        {user?.id}
      </h1>
    </>
  );
}

export default Page;
