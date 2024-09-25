export default interface Author {
    id: number
    firstName: string
    lastName: string
}

export type AuthorCreate = Omit<Author, 'id'>
export type AuthorUpdate = AuthorCreate
