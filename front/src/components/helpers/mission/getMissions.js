import Axios from "axios";
import { url } from "../url"
import {sh} from "./shortCut"

const getMissions = async () => {
    const response = await Axios.get(url+ sh + "/get-missions");
    return response.data;
}

export default getMissions;