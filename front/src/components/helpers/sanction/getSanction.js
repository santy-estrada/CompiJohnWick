import Axios from "axios";
import { url } from "./url"
import {sh} from "./shortCut"

const getSanction = async () => {
    const response = await Axios.get(url+ sh + "/get");
    return response.data;
}

export default getSanction;