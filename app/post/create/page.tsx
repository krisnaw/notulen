'use client';
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {create} from "@/app/actions/article/actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {EditorState, EditorView, useCodeMirror, ViewUpdate} from "@uiw/react-codemirror";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";

interface markdownProps {
    doc: null | string;
    setDoc: React.Dispatch<React.SetStateAction<string>>;
}

const useMarkdownEditor = ({doc, setDoc} : markdownProps ) => {
    const editor = useRef(null); // EditorViewの親要素のref
    const [container, setContainer] = useState<HTMLDivElement>();
    const [view, setView] = useState<EditorView>();


    const updateListener = useMemo(() => {
        return EditorView.updateListener.of((update: ViewUpdate) => {
            if (update.docChanged) {
                setDoc(update.state.doc.toString());
            }
        })
    }, [setDoc])

    useEffect(() => {
        if (editor.current) {
            setContainer(editor.current);
        }
    }, [setContainer]);

    useEffect(() => {
        if (!view && container) {
            const state = EditorState.create();
            const viewCurrent = new EditorView({
                state,
                parent: container,
            });
            setView(viewCurrent);
        }
    }, [view, container, doc, updateListener]);

    return {
        editor
    };
};

export default function Page() {
    const [doc, setDoc] = useState<null | string>(null);
    const safe = useCallback(() => {
        // TODO: Save the document to supabase
    }, [])
    const { editor } = useMarkdownEditor({doc, setDoc});


    return (
        <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Create new article
            </h4>

            <div>

                <div>
                    <Tabs defaultValue="account" className="w-[400px]">
                        <TabsList>
                            <TabsTrigger value="account">Writing</TabsTrigger>
                            <TabsTrigger value="password">Preview</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account">

                            <div className="overflow-hidden bg-white shadow">
                                <div className="p-10">
                                    <div ref={editor}/>
                                </div>
                            </div>


                        </TabsContent>
                        <TabsContent value="password">

                        </TabsContent>
                    </Tabs>

                </div>


            </div>

            <div className="mt-4">
                <form action={create}>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <Input autoFocus name="title" type="text" placeholder="Title"/>
                        </div>

                        <div>
                            <Textarea name="content" placeholder="Description"/>
                        </div>

                        <div>
                            <Button type="submit">
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}