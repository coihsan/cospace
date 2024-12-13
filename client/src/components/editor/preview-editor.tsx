import TiptapEditor from "./tiptap-editor"
import { ChangeEvent } from "react"
import { useParams } from 'react-router-dom';

const PreviewEditor = () => {
    const { noteId } = useParams();

    return (
        <main className="bg-muted dark:bg-zinc-900">
            <TiptapEditor content={""} onChange={function (content: string): void {
                throw new Error("Function not implemented.")
            }} noteId={'213'} title={""} titleChange={function (event: ChangeEvent<HTMLInputElement>): void {
                throw new Error("Function not implemented.")
            }} />
        </main>
    )
}
export default PreviewEditor