import Author from "./author.model"

export default interface Book {
    id: number
    title: string
    coverText: string
    comment: string
    author: Author
}

export type BookCreate = Omit<Book, 'id'>
export type BookUpdate = BookCreate

