import { Content } from "@tiptap/react"
import { LabelText } from "./label-text"
import { useEffect, useRef } from "react"

export const getNotesTitle = (title: Content): string => {
    const titles = title?.toString()
    const noteText = titles?.trim().match(/[^#]{1,55}/)
    return noteText ? noteText[0].trim().split(/\r?\n/)[0] : LabelText.CREATE_NEW_NOTE
}

export const getContrastColor = (hexColor: string): string => {
    const r = parseInt(hexColor?.slice(1, 3), 16)
    const g = parseInt(hexColor?.slice(3, 5), 16)
    const b = parseInt(hexColor?.slice(5, 7), 16)
    const yiq = (r * 299 + g * 587 + b * 114) / 1000
    return yiq >= 128 ? "#000000" : "#FFFFFF"
}

export const debounceEvent = <T extends Function>(cb: T, wait = 20) => {
    let h = 0
    const callable = (...args: any) => {
        clearTimeout(h)
        h = window.setTimeout(() => cb(...args), wait)
    }

    return <T>(<any>callable)
}

export const copyToClipboard = (noteId: string, content: string) => {
    if (noteId) {
        navigator.clipboard.writeText(content)
    } else {
        console.log('Failed copy to clipboard')
    }
}

export function useForwardedRef<T>(ref: React.ForwardedRef<T>) {
    const innerRef = useRef<T>(null);
  
    useEffect(() => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(innerRef.current);
      } else {
        ref.current = innerRef.current;
      }
    });
  
    return innerRef;
  }

export const getRandomElement = (list : string[] | string) => list[Math.floor(Math.random() * list.length)]