import Axios from "axios";
import { url } from "./url"
import {sh} from "./shortCut"

const registerSanction = async () => {
    const response = await Axios.get(url+ sh + "/register");
    return response.data;
}

export default registerSanction;