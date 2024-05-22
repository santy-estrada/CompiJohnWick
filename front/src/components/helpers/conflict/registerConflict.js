import Axios from "axios";
import { url } from "../url"
import {sh} from "./shortCut"

const registerConflict = async () => {
    const response = await Axios.get(url+ sh + "/register-conflict");
    return response.data;
}

export default registerConflict;