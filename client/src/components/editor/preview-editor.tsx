import { Doc } from "yjs"
import TiptapEditor from "./tiptap-editor"
import LiveblocksProviders from "@/providers/liveblocks-provider"
import { ChangeEvent } from "react"
import { useParams } from 'react-router-dom';

const PreviewEditor = () => {
    const { noteId } = useParams();

    return (
        <LiveblocksProviders>
            <main className="bg-muted dark:bg-zinc-900">
                <TiptapEditor content={""} onChange={function (content: string): void {
                    throw new Error("Function not implemented.")
                } } ydoc={new Doc} noteId={'213'} title={""} titleChange={function (event: ChangeEvent<HTMLInputElement>): void {
                    throw new Error("Function not implemented.")
                } } />
            </main>
        </LiveblocksProviders>
    )
}
export default PreviewEditor