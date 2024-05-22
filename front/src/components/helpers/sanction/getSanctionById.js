import Axios from "axios";
import { url } from "./url"
import {sh} from "./shortCut"

const getSanctionById = async () => {
    const response = await Axios.get(url+ sh + "/get/");
    return response.data;
}

export default getSanctionById;