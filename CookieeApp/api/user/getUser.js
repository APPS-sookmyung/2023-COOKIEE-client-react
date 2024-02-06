import axios from "axios";

export const getUser = async (userId) => {
  try {
    const response = await axios.get(`https://cookiee.site/users/${userId}`);

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    return response.data.result;
  } catch (error) {
    console.error("Error updating category data:", error);
    return null;
  }
};

export default getUser;
