import {getArticleById} from "@/app/lib/article_data";
import { Metadata } from 'next';
import {notFound} from "next/navigation";
import EditForm from "@/app/ui/article/edit-form";


export const metadata : Metadata = {
    title: "Edit article",
}

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const article = await getArticleById(id)

    if (!article) {
        notFound()
    }

    return (
        <div className="mt-4">
            <EditForm article={article} />
        </div>
    )
}