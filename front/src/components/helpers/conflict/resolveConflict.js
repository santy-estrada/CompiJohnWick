import Axios from "axios";
import { url } from "../url"
import {sh} from "./shortCut"

const resolveConflict = async () => {
    const response = await Axios.get(url+ sh + "/resolve-conflicts/");
    return response.data;
}

export default resolveConflict;