import { Schema, model, models } from "mongoose";

const TournamentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    details: {
        type: String,
        required: true,
        unique: true
    },
    players: [
        {
            player :{ type:String},
            id     :{ type:String}
        }
    ],
});
const Tournament = models.Tournament || model('Tournament', TournamentSchema)
export default Tournament