import {model, Schema} from 'mongoose';
import { Sancion } from '../interfaces/Sancion';

const SancionSchema = new Schema<Sancion>({
    causa: [{
        type: String,
        required: true,
        ref: 'User'
    }],
    tipo: {
        type: String,
        required: true,
    }
})

const sancionModel = model('Sancion', SancionSchema);
export default sancionModel;