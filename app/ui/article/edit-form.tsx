'use client';

import {Article} from "@/app/lib/definitions";
import {update} from "@/app/actions/article/actions";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import { useFormState } from 'react-dom';

export default function EditForm(
    {
        article,
    }: {
        article: Article;
    }
) {
    const initialState = { message: null, errors: {} };
    // @ts-ignore
    const updateArticle = update.bind(null, article.id);
    const [state, dispatch] = useFormState(updateArticle, initialState);
    return (
        <form action={dispatch}>
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <Input autoFocus
                           defaultValue={article.title}
                           name="title" type="text" placeholder="Title"/>
                </div>

                <div>
                    <Textarea
                        defaultValue={article.content}
                        name="content" placeholder="Description"/>
                </div>

                <div>
                    <Button type="submit">
                        Save changes
                    </Button>
                </div>
            </div>
        </form>
    )
}