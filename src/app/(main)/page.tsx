// 'use client';
import { Button } from '@/components/ui/button';
import MaxWidthWrapper from './_components/max-width-wrapper';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import {
  RegisterLink,
  LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/components';

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();
  const authenticated = await isAuthenticated();

  return (
    <>
      <MaxWidthWrapper className="mt-80 flex max-h-screen flex-col items-center justify-center text-center sm:mt-60">
        {/* <div className="mb-8">*************</div> */}
        <div className="font-sans text-5xl font-light italic sm:text-8xl">
          pff
        </div>
        {/* <div className="mt-8 text-base italic sm:text-xl">
          (chat with documents using AI)
        </div> */}
        {/* {isLoading && <div className="mt-12 font-mono">Loading...</div>} */}

        {!authenticated && (
          <Button
            className="mt-8 rounded-sm pt-2 font-mono text-xl sm:mt-16"
            variant="default"
            asChild
          >
            <RegisterLink>
              GET STARTED <ArrowRight className="ml-2" />
            </RegisterLink>
          </Button>
        )}
        {authenticated && (
          <Button
            className="mt-8 rounded-sm pt-2 font-mono text-xl sm:mt-12"
            variant="ghost"
            asChild
          >
            <LoginLink>
              ENTER HERE <ArrowRight className="ml-2" />
            </LoginLink>
          </Button>
        )}
      </MaxWidthWrapper>
      <div className=" relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-8rem)] aspect-[1155/678] w-[26rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-50 sm:left-[calc(50%-10rem)] sm:w-[40rem]"
          />
        </div>
      </div>
    </>
  );
}
