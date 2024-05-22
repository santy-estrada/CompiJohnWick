import Axios from "axios";
import { url } from "../url"

const login = async () => {
    const response = await Axios.get(url+ sh + "/login");
    return response.data;
}

export default login;