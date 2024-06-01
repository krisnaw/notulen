"use server";

import { redirect } from "next/navigation";
import {createClient} from "@/utils/supabase/server";
import {z} from "zod";

export async function logout() {
    const supabase = createClient()
    const { error }  = await supabase.auth.signOut()
    if (error) {
        console.error(error);
    }
    redirect("/");
}


export type State = {
    errors?: {
        first_name?: string[];
        last_name?: string[];
    };
    message?: string | null;
};

const formSchema = z.object({
    first_name: z.string().min(1),
    last_name: z.string().min(1),
});

export async function updateProfile(  prevState: State,
                                          formData: FormData) {

    const validatedFields = formSchema.safeParse({
        first_name: formData.get("first_name") as string,
        last_name: formData.get("last_name") as string,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Sorry, there was an error with your submission.',
        };
    }

    const supabase = createClient();
    const { data, error } = await supabase.auth.updateUser({
        data: validatedFields.data
    })


    if (error) {
        return {
            errors: {
                message: error.message,
            },
            message: 'Sorry, error save.',
        };
    }

    return redirect("/");
}