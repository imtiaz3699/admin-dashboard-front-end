import axios from "axios";
export const getProductList = async () => {
    try {
        const res = await axios.get("/api/stock-movement/get-stock-movements");
        return res;
    } catch (e) {
        console.log(e);
    }
}
export const getBranchesList = async () => {
    try {
        const res = await axios.get("/api/branch/get-branches");
        return res;
    } catch (e) {
        console.log(e);
    }
}

