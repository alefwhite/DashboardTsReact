const formatDate = (date: string): string => {
    const dateFormatted = new Date(date);

    const year = dateFormatted.getFullYear();
    
    const day = dateFormatted.getDate() + 1 > 9 ? 
        dateFormatted.getDate() + 1: `0${dateFormatted.getDate()}`;
    
    const month = dateFormatted.getMonth() + 1 > 9 ? 
        dateFormatted.getMonth() + 1 : `0${dateFormatted.getMonth() + 1}`;

    return `${day}/${month}/${year}`;
}

export default formatDate;