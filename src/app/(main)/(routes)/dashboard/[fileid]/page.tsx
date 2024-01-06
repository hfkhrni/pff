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
    <div className="flex h-[calc(100vh-3.5rem)] flex-1 flex-col justify-between">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-6 lg:flex xl:px-2">
        {/* Left sidebar & main wrapper */}
        <div className="flex-1 xl:flex">
          <div className=" sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            {/* Main area */}
            {/* <PDFRenderer url={file.url} /> */}
            <h1>jhi</h1>
          </div>
        </div>
        <div className="flex-[0.75] shrink-0 border-t border-primary lg:w-96 lg:border-l lg:border-t-0">
          {/* <ChatWrapper
            isSubscribed={plan.isSubscribed}
            fileId={file.id}
          /> */}
          <>dummy</>
        </div>
      </div>
    </div>
  );
}

export default Page;
