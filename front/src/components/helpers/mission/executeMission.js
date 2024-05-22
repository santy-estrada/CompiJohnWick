import Axios from "axios";
import { url } from "../url"
import {sh} from "./shortCut"

const executeMission = async () => {
    const response = await Axios.get(url+ sh + "/execute/");
    return response.data;
}

export default executeMission;