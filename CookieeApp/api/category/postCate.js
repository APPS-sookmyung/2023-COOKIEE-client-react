import axios from "axios";

export const postCate = async (categoryData, userId) => {
    try {
        const response = await axios.post(`http://cookiee.site:8080/category/${userId}`, categoryData); // categoryData를 요청에 포함하여 전달

        if (response.status !== 200) {
            throw new Error("Network response was not ok");
        }
        return response.data.result; // 업데이트된 데이터 반환 또는 처리
        
    } catch (error) {
        console.error("Error updating category data:", error);
        return null;
    }
};
