'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@root/auth";
import { AuthError } from "next-auth";


export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Unknown error occured.';
            }
        }
        throw error;
    }
}