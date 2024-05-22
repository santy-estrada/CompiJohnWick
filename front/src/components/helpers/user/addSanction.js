import Axios from "axios";
import { url } from "../url"

const userAddSanction = async () => {
    const response = await Axios.get(url+sh+"/add-sanction");
    return response.data;
}

export default userAddSanction;