export interface BorrowHistory {

    borrowId: number;

    bookTitle: string;

    author: string;

    borrowDate: string;

    dueDate: string;

    returnedDate: string | null;

    status: string;

    overdue: boolean;
}