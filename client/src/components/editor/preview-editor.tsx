import { Doc } from "yjs"
import TiptapEditor from "./tiptap-editor"

const PreviewEditor = () => {
    return (
        <main className="p-6">
            <div className="space-y-4">
                <input
                    type="text"
                    value={''}
                    placeholder="Title it's here"
                    className="text-2xl bg-transparent border-none outline-none w-full"
                />
                <TiptapEditor content={""} onChange={function (content: string): void {
                    throw new Error("Function not implemented.")
                }} ydoc={new Doc} noteId={0} />
            </div>

        </main>
    )
}
export default PreviewEditor