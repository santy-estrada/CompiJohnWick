import Axios from "axios";
import { url } from "../url"
import {sh} from "./shortCut"

const updateRule = async () => {
    const response = await Axios.get(url+ sh + "/modify/");
    return response.data;
}

export default updateRule;