import {model, Schema} from 'mongoose';
import { Mision } from '../interfaces/Mision';

const MisionSchema = new Schema<Mision>({
    ejecutor: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    completado:{
        type: Boolean,
        required: true,
        default: false
    },
    descripcion:{
        type: String,
        required: true,
        minlength: 8
    }
})

const misionModel = model('Mision', MisionSchema);
export default misionModel;