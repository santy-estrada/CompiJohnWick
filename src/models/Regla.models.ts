import {model, Schema} from 'mongoose';
import { Regla } from '../interfaces/Regla';

const ReglaSchema = new Schema<Regla>({
    creator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    description: {
        type: String,
        required: true,
        minlength: 8
    }
})

const reglaModel = model('Regla', ReglaSchema);
export default reglaModel;