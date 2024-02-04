import axios from "axios";

export const putCate = async (userId, categoryId, categoryData) => {
  try {
    const response = await axios.put(`https://cookiee.site/category/${userId}/${categoryId}`, categoryData);

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    return response.data.result;
  } catch (error) {
    console.error("Error updating category data:", error);
    return null;
  }
};

export default putCate;