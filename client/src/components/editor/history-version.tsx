import {
    useHistoryVersions,
} from "@liveblocks/react";
import { HistoryVersionPreview } from "@liveblocks/react-tiptap";
import { HistoryVersionSummary, HistoryVersionSummaryList } from "@liveblocks/react-ui";
import { useState, useMemo } from "react";

const DocumentHistory = () => {
    const [selectedVersionId, setSelectedVersionId] = useState<string>();
    const { versions, isLoading } = useHistoryVersions();
    
    const selectedVersion = useMemo(
        () => versions?.find((version) => version.id === selectedVersionId),
        [selectedVersionId, versions]
    );

    if (isLoading) {
        return <div>Loading version history...</div>;
    }
    
    return (
        <>
            {/* <div>
                {selectedVersion ? (
                    <HistoryVersionPreview
                        version={selectedVersion}
                        className="w-full h-full"
                        onVersionRestore={onVersionRestore}
                    />
                ) : (
                    <div>No version selected</div>
                )}
            </div> */}

            <div>
                <HistoryVersionSummaryList>
                    {versions?.map((version) => (
                        <HistoryVersionSummary
                            onClick={() => {
                                setSelectedVersionId(version.id);
                            }}
                            key={version.id}
                            version={version}
                            selected={version.id === selectedVersionId}
                        />
                    ))}
                </HistoryVersionSummaryList>
            </div>
        </>
    );
}

export default DocumentHistory