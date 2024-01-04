import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { notFound, redirect } from 'next/navigation';

type PageProps = {
  params: {
    fileid: string;
  };
};
async function Page({ params }: PageProps) {
  const { fileid } = params;
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    redirect(`/auth-callback?origin=dashboard/${fileid}`);
  }

  const file = await db.file.findFirst({
    where: {
      id: fileid,
      userId: user.id,
    },
  });

  if (!file) notFound();
  return <>{user?.id}</>;
}

export default Page;
