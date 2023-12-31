'use client';

import UploadButton from './upload-button';

function Dashboard() {
  return (
    <>
      <main className="mx-auto min-w-96 max-w-screen-xl p-4">
        <div className="mt-8 flex flex-row items-start justify-between gap-4 border-b border-primary pb-5 sm:flex-row sm:items-center sm:gap-0">
          <h1 className="font-mono">FILES</h1>
          {/* <p className="text-wyw-200">hi</p> */}

          <UploadButton />
        </div>
      </main>
    </>
  );
}

export default Dashboard;
