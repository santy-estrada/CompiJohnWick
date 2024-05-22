import Axios from "axios";
import { url } from "../url"
import {sh} from "./shortCut"

const updateSanction = async () => {
    const response = await Axios.get(url+ sh + "/update/");
    return response.data;
}

export default updateSanction;