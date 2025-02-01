'use client';

import { useActionState } from "react";
import Button from "@/ui/button";
import clsx from "clsx";
import { authenticate } from "@/lib/actions";
import { useSearchParams } from 'next/navigation';

export default function LogInForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackURL') || '/dashboard';

    const [ errorMessage, formAction, isPending ] = useActionState( authenticate, undefined, );

    return (
        <>
            <h1 className="text-center font-bold text-2xl mb-3">
                Dashboard - Login
            </h1>
    
            <form
            className="flex flex-col gap-4 items-center"
            action={formAction}
            >
                {errorMessage && (<p className="text-red-500 text-lg">{errorMessage}</p>)}
                <LoginInputField name="username" placeholder="Username" />
                <LoginInputField name="password" placeholder="Password" type="password" />
                <input type="hidden" name="redirectTo" value={callbackUrl} />
                <Button type="submit" className="w-11/12">Log In</Button>
            </form>
        </>
    )
}

function LoginInputField({ className, ...rest}: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
      <input
        { ...rest }
        className = {clsx(
          'w-full lg:w-11/12 rounded-lg px-2 py-1 text-slate-500 border border-gray-400 outline-2 outline-offset-1 outline-rose-500 focus:outline focus:text-gray-900',
          className,
        )}
      />
    )
  }