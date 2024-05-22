import Axios from "axios";
import { url } from "../url"

const getUsers = async () => {
    const response = await Axios.get(url+ sh);
    return response.data;
}

export default getUsers;