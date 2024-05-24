'use client'
import ArticleDetail from "@/components/article-detail";

interface Article {
    id: string
    title: string
    created_at: string
    content: string
}

interface ArticlesListProps {
    articles: Article[]
}


export default function ArticleList({articles} : ArticlesListProps ) {

    if(!articles?.length){
        return <p>No posts found.</p>
    }

    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-400/50">
            <div className="container grid gap-8 px-4 md:px-6 max-w-6xl mx-auto">
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Tech</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {articles.map((item) => (
                        <div key={item.id}>
                            <ArticleDetail article={item}  />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

