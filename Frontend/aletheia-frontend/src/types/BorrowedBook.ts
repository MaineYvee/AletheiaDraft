export interface BorrowedBook {

    borrowId: number;

    bookTitle: string;

    author: string;

    borrowDate: string;

    dueDate: string;

    returnedDate?: string;

    status: string;

    overdue: boolean;
}