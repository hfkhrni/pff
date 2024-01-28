'use client';
import Link from 'next/link';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { ArrowRight } from 'lucide-react';

function Navbar() {
  return (
    <div className="h-14 max-w-[100vw] bg-secondary">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex w-full items-center justify-between">
          <div className="my-2">
            <Link
              href="/dashboard"
              className="ml-6 select-none font-sans text-3xl italic"
            >
              pff
            </Link>
          </div>
          <LogoutLink className="mr-4 mt-2 flex items-center justify-center font-mono font-medium">
            <p className="mr-2">SIGN OUT</p>
            <ArrowRight width={16} />
          </LogoutLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
