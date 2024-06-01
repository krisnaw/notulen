
import {createClient} from "@/utils/supabase/server";
import ArticleList from "@/components/article-list";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('articles')
        .select();

    if (data?.length === 0) {
        return (
            <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                     aria-hidden="true">
                    <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                </svg>
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No projects</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new project.</p>
                <div className="mt-6">
                    <Button>
                        <Link href="/article/create">New article</Link>
                    </Button>
                </div>
            </div>

        )
    }

    return (
        <main>
            Has data
            {/*<ArticleList articles={articles}/>*/}
        </main>
    );
}
