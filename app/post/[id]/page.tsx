import {cookies} from "next/headers";
import {createClient} from "@/utils/supabase/server";
import {Button} from "@/components/ui/button";
import Link from "next/link";

interface PostProps {
    params : {
        id : string
    }
}

export default async function Page({ params } : PostProps ) {

    const supabase = createClient()

    const { data: article } = await supabase.from("articles").select().eq("id", params.id).single()

    if (!article) {
        return <p>No posts found.</p>
    }

    return (
        <div>

            <div>
                <Button>
                    <Link href={`edit/${article.id}`}>Edit</Link>
                </Button>
            </div>
            <div className="flex">
                <div>
                    <div>
                        {article.title}
                    </div>
                    <div>
                        {article.content}
                    </div>
                </div>
                <div>
                    <h4>Table of Contents</h4>
                </div>
            </div>
        </div>
    )
}