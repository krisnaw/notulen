import {getArticleById} from "@/app/lib/article_data";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const article = await getArticleById(id)

    return (
        <div>

            <div className="text-center">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    {article.title}
                </h1>

                <div className="mt-8 flex items-center justify-center">
                    <div>{article.created_at}</div>
                </div>
            </div>

            <div className="mt-20 mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                <div className="sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2">
                    <Card>
                        <CardHeader>
                            {article.content}
                        </CardHeader>
                    </Card>
                </div>
                <div  className="lg:col-start-3 lg:row-end-1 space-y-8">
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Card Title</CardTitle>
                                <CardDescription>Card Description</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Card Content</p>
                            </CardContent>
                            <CardFooter>
                                <p>Card Footer</p>
                            </CardFooter>
                        </Card>

                    </div>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Card Title</CardTitle>
                                <CardDescription>Card Description</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Card Content</p>
                            </CardContent>
                            <CardFooter>
                                <p>Card Footer</p>
                            </CardFooter>
                        </Card>

                    </div>
                </div>
            </div>
        </div>
    )
}