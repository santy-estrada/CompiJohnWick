import Axios from "axios";
import { url } from "../url"
import {sh} from "./shortCut"

const createRule = async () => {
    const response = await Axios.get(url+ sh + "/create");
    return response.data;
}

export default createRule;