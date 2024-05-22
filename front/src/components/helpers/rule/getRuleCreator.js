import Axios from "axios";
import { url } from "../url"
import {sh} from "./shortCut"

const getRuleCreatorById = async () => {
    const response = await Axios.get(url+ sh + "/get-creator/");
    return response.data;
}

export default getRuleCreatorById;