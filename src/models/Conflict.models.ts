import {model, Schema} from 'mongoose';
import { Conflict } from '../interfaces/Conflict';

const ConflictSchema = new Schema<Conflict>({
    involucrados: [{
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    }],
    solucion: {
        type: String,
        required: true,
        minlength: 8
    }
})

const conflictModel = model('Conflic', ConflictSchema);
export default conflictModel;