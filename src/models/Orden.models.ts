import {model, Schema} from 'mongoose';
import { Orden } from '../interfaces/Orden';

const OrdenSchema = new Schema<Orden>({
    creator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    executioner:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orden:{
        type: String,
        required: true,
        minlength: 8
    },
    objetivo:{
        type: String,
        required: true,
        minlength: 8
    },
    completado:{
        type: Boolean,
        required: true,
        default: false
    }
})

const ordenModel = model('Orden', OrdenSchema);
export default ordenModel;