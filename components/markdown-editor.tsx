"use client"

import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";


export default function MarkdownEditor() {

    return (
        <div>
            <form>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <Input name="title" type="text" placeholder="Title" />
                    </div>

                    <div>
                        <Textarea name="description"  placeholder="Description" />
                    </div>

                    <div>
                        <Button type="submit">Save article</Button>
                    </div>
                </div>
            </form>

        </div>
    );
}