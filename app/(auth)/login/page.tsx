import React from "react";
import ToggleTheme from "@/components/ToggleTheme";
import Image from "next/image";

const page = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, var(--background) 40%, var(--accent-glow) 100%)",
        }}
      />
      <div className="flex min-h-screen flex-col items-center justify-center font-sans relative z-11">
        <main className="flex w-full max-w-3xl flex-col items-center justify-between gap-12 px-16 py-20 sm:items-start">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />

          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-foreground">
              To get started, edit the page.tsx file.
            </h1>

            <p className="max-w-md text-lg leading-8 text-muted">
              Looking for a starting point or more instructions? Head over to{" "}
              <a
                href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                className="font-medium text-primary"
              >
                Templates
              </a>{" "}
              or the{" "}
              <a
                href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                className="font-medium text-primary"
              >
                Learning
              </a>{" "}
              center.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
            <a
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 text-white transition-colors hover:bg-emerald-600 md:w-[158px]"
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="dark:invert"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={16}
                height={16}
              />
              Deploy Now
            </a>

            <a
              className="flex h-12 w-full items-center justify-center rounded-full border border-emerald-500/30 px-5 text-primary transition-colors hover:bg-emerald-500/10 md:w-[158px]"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
            <ToggleTheme />
          </div>
        </main>
      </div>
    </div>
  );
};

export default page;
