"use server";

import {createClient} from "@/utils/supabase/server";

export async function getArticleById(id: string) {
    const supabase = createClient()

    try {
        const article =  await supabase.from("articles").select().eq("id", id).single()
        return article.data
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}