import Axios from "axios";
import { url } from "../url"
import {sh} from "./shortCut"

const login = async () => {
    const response = await Axios.get(url+ sh + "/login");
    return response.data;
}

export default login;