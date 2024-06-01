'use client';

import {EditorState, EditorView, keymap, placeholder, ViewUpdate} from "@uiw/react-codemirror";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {StateEffect} from "@codemirror/state";
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import {HighlightStyle, syntaxHighlighting} from "@codemirror/language";
import {tags} from "@lezer/highlight";

interface markdownProps {
    doc: null | string;
    setDoc: React.Dispatch<React.SetStateAction<null | string>>
    save: () => void;
}

const useMarkdownEditor = ({doc, setDoc, save} : markdownProps ) => {
    const editor = useRef(null);
    const [container, setContainer] = useState<HTMLDivElement>();
    const [view, setView] = useState<EditorView>();

    const editorStyle = useMemo(() => {
        return EditorView.theme({
            '&': {
                minHeight: '500px',
                width: '100%',
            },

            '&.cm-editor': {
                outline: 'none',
            },

            '&.cm-editor .cm-scroller': {
                fontFamily: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace, 'Segoe UI Emoji'`,
                '-webkit-font-smoothing': 'antialiased',
                letterSpacing: '0.02em',
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#000000',
            },

            '.cm-selectionBackground': {
                backgroundColor: '#036dd626 !important',
            },
        });
    }, []);

    const customKeymap = useMemo(() => {
        return keymap.of([
            {
                key: 'Mod-s',
                run() {
                    save();
                    return true;
                },
            },
        ]);
    }, [save]);

    const updateListener = useMemo(() => {
        return EditorView.updateListener.of((update: ViewUpdate) => {
            if (update.docChanged) {
                setDoc(update.state.doc.toString());
            }
        })
    }, [setDoc])

    const highlightStyle = HighlightStyle.define([
        { tag: tags.heading1, color: 'black', fontSize: '1.4em', fontWeight: '700' },
        { tag: tags.heading2, color: 'black', fontSize: '1.3em', fontWeight: '700' },
        { tag: tags.heading3, color: 'black', fontSize: '1.2em', fontWeight: '700' },
        { tag: tags.heading4, color: 'black', fontSize: '1.1em', fontWeight: '700' },
        { tag: tags.strong, color: 'black', fontWeight: '700' },
        { tag: tags.quote, color: '#6a737d' },
        { tag: tags.emphasis, fontStyle: 'italic' },
        { tag: tags.url, textDecoration: 'underline' },
        { tag: tags.strikethrough, textDecoration: 'line-through' },
    ]);

    const extensions = useMemo(() => {
        return [
            syntaxHighlighting(highlightStyle),
            placeholder('Write in markdown'),
            updateListener,
            customKeymap,
            editorStyle,
            markdown({
                base: markdownLanguage,
                completeHTMLTags: false,
            }),
            EditorState.tabSize.of(4),
            EditorView.lineWrapping,
        ];
    }, [customKeymap, updateListener, editorStyle, highlightStyle]);

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

    useEffect(() => {
        if (view) {
            view.dispatch({ effects: StateEffect.reconfigure.of(extensions) });
        }
    }, [view, extensions]);

    return {
        editor,
    };
};

export default function Page() {
    const [doc, setDoc] = useState<null | string>(null);
    const save = useCallback(() => {
        // TODO: Save the document to supabase
        console.log("saved clicked")
    }, [])
    const { editor } = useMarkdownEditor({doc, setDoc, save});

    return (
        <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Create new article
            </h4>

            <div className="space-y-4">

                <div className="overflow-hidden bg-white shadow-lg">
                    <div className="p-10 border-b border-gray-200">
                        <div ref={editor}/>
                    </div>
                </div>

                <div className="overflow-hidden bg-white shadow-lg">
                    <div className="p-10 border-b border-gray-200">

                    </div>
                </div>


            </div>

        </div>
    )
}