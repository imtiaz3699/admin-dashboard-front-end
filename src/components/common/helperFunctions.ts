export const convertToISODate = (date:any) => {
    if (!date) return null;

    return new Date(date).toISOString();
};
export const formatDate = (date:string) => {

    if (!date) return "";

    const newDate = new Date(date);

    return newDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
};