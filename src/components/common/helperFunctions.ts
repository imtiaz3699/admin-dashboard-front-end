export const convertToISODate = (date:any) => {
    if (!date) return null;

    return new Date(date).toISOString();
};