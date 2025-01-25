import React from "react";
import { SidebarInput } from "../ui/sidebar"
import { LabelText } from "@/lib/label-text";

interface SearchBarProps {
    searchRef: React.MutableRefObject<HTMLInputElement>
    onSearchQueryChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchRef, onSearchQueryChange }) => {

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