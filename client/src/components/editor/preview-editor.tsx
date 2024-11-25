import { Doc } from "yjs"
import TiptapEditor from "./tiptap-editor"

const PreviewEditor = () => {

    return (
        <main className="p-6">
            <TiptapEditor content={""} onChange={function (content: string): void {
                throw new Error("Function not implemented.")
            }} ydoc={new Doc} noteId={0} />
        </main>
    )
}
export default PreviewEditor