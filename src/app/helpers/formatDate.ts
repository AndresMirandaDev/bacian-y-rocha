export function formatDate(date:string) {
    const originalDate = new Date(date);

const year = originalDate.getFullYear();
const month = String(originalDate.getMonth() + 1).padStart(2, '0');
const day = String(originalDate.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;
return formattedDate
}