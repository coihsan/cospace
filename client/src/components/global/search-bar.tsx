import React from "react";
import { SidebarInput } from "../ui/sidebar"
import { LabelText } from "@/lib/label-text";
import { useAppSelector } from "@/lib/redux/store";
import { getApp, getNotes } from "@/lib/redux/selector";
import { selectAllNotes } from "@/lib/redux/slice/notes.slice";
import { MenuType } from "@/lib/enums";

interface SearchBarProps {
    searchRef: React.MutableRefObject<HTMLInputElement>
    onSearchQueryChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchRef, onSearchQueryChange }) => {
    const { activeMenu } = useAppSelector(getApp)
    const { activeFolderId } = useAppSelector(getNotes)
    const notes = useAppSelector(selectAllNotes)

    const handleSearchQuery = (query: string) => {
        if(activeMenu === MenuType.NOTES){ 
            return notes.map(item => item)
        } else if(activeMenu === MenuType.FOLDER){
            return notes.filter(item => item.folderId === activeFolderId)
        }   
    }
    return (
        <SidebarInput
            type="search"
            ref={searchRef}
            onChange={(event) => {
                event.preventDefault()
                const searchValue = event.target.value
                onSearchQueryChange(searchValue)
            }}
            placeholder={LabelText.SEARCH_NOTES}
        />
    )
}
export default SearchBar