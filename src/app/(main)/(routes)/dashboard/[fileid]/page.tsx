import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { notFound, redirect } from 'next/navigation';
import PDFRenderer from '../_components/pdf-renderer';
import ChatWrapper from '../_components/chat-wrapper';

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
  return (
    <div className="mx-auto flex max-w-screen-2xl flex-1 flex-col justify-between md:h-[calc(100vh-3.5rem)]">
      <div className="mx-auto h-full w-full px-4 py-6 lg:flex xl:px-2">
        {/* Left sidebar & main wrapper */}
        <div className="flex-1 xl:flex">
          <div className="mb-4 shrink-0 lg:pr-4 xl:mb-0 xl:flex-1">
            {/* Main area */}
            <PDFRenderer url={file.url} />
          </div>
        </div>
        <div className="lg:flex">
          <div className="border-t border-secondary lg:border-l lg:border-t-0"></div>
        </div>
        <div className="mt-2 flex-1 shrink-0 lg:ml-4 lg:mt-0">
          <ChatWrapper fileId={fileid} />
        </div>
      </div>
    </div>
  );
}

export default Page;
