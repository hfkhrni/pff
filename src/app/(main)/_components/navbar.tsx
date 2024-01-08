'use client';

import MaxWidthWrapper from './max-width-wrapper';

function Navbar() {
  return (
    <div className=" h-12 max-w-[100vw] bg-secondary">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex w-full items-center justify-between">
          <div className="my-2">
            <div className="ml-6 font-serif text-3xl italic">pff</div>
          </div>
          <div className="mr-6 flex items-center justify-between">
            <button>hi</button>
            <button>hi</button>
            <button>hi</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
