export interface Book {

    id: number;

    title: string;

    author: string;

    isbn: string;

    category: string;

    description: string;

    availableCopies: number;

    totalCopies: number;

    available: boolean;

    coverImageUrl?: string;
}