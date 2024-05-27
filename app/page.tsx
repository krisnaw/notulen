
import {createClient} from "@/utils/supabase/server";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {cookies} from "next/headers";
import ArticleList from "@/components/article-list";

export default async function Home() {
    const supabase = createClient()

    const { data: articles } = await supabase.from("articles").select();

    if (!articles) {
        return <p>No posts found.</p>
    }

    return (
        <main>
            <ArticleList articles={articles} />
        </main>
    );
}
