import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


// Define the type for the article
type Article = {
    id: string;
    title: string;
    created_at: string;
    content: string;
};

// Define the props type for the ArticleDetail component
type ArticleDetailProps = {
    article: Article;
};


// ArticleDetail component
const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
    const { id, title, created_at, content } = article;

    return (
        <>

            <Link href={`/post/${id}`}>
                <div className="flex">
                    <div className="mr-4 flex-shrink-0">
                        <Card className="h-20 w-20 flex items-center justify-center">
                            <span className="text-xl"> 🙏</span>
                        </Card>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold">{title}</h4>
                        <p className="mt-1">Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam expedita
                            quia omnis voluptatem. Minus quidem ipsam quia iusto.</p>
                    </div>
                </div>
            </Link>
        </>
    );
};


export default ArticleDetail;