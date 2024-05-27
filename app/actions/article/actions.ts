"use server";

import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {z} from "zod";

const supabase = createClient()

const FormSchema = z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    content: z.string().min(1),
    user_id: z.string().min(1),
});

const UpdateArticle = FormSchema.omit({
    id: true,
})

export async function create(formData: FormData) {
    const {data: { user},} = await supabase.auth.getUser();
    try {
        const {data: notes} = await supabase.from("articles").insert({
            title: formData.get("title"),
            content: formData.get("content"),
            user_id: user?.id
        });
    } catch (error) {
        console.log(error);
    }
    return redirect("/");
}

export async function deleteArticle(formData: FormData) {
    return redirect("/");
}

export async function update(formData: FormData) {
    return redirect("/");
}