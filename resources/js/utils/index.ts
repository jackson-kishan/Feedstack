import { Active, DataRef, Over } from "@dnd-kit/core";
import { ColumnDragData } from "@/Components/BoardColumn";
import { TaskDragData } from "@/Components/TaskCard";

type DraggableData = ColumnDragData | TaskDragData;
export function formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);

    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    });
}

export function shortenText(text: string, wordLimit: number = 100): string {
    const words = text.split(/\s+/); // Split text into words using whitespace
    if (words.length <= wordLimit) {
        return text; // Return original text if it's within the limit
    }
    return words.slice(0, wordLimit).join(' ') + '...'; // Join first 100 words and add ellipsis
}

export function getFirstLetter(text: string): string {
    return text.toUpperCase().charAt(0); // Returns the first character
}

export const formatDate = (date: Date) => {
    const d = new Date();
    const month = d.toLocaleDateString('default' , {month: 'long'})
    const day = d.getDate();
    const year = d.getFullYear();

    return `${month} ${day}, ${year}`;
}

export function hasDraggableData<T extends Active | Over>(
    entry: T | null | undefined
  ): entry is T & {
    data: DataRef<DraggableData>;
  } {
    if (!entry) {
      return false;
    }

    const data = entry.data.current;

    if (data?.type === "Column" || data?.type === "Task") {
      return true;
    }

    return false;
  }

 export function checkRole(roles: any) {
    const arr = ["Admin", "Contributor"];
    let result = false;
    arr.forEach((role) => {
     let check = roles.includes(role);
    if(check) {
      return result = true;
    }
  })
  return result;
  }

