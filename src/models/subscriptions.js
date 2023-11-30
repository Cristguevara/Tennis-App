import { Schema, model, models } from "mongoose";

const SubscriptionSchema = new Schema(
    {
        tournament:{
            id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
        } ,
        player:{
            id: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
        }
    },
    {
        timestamps: true,
    }
);
const Subscription = models.Subscription || model('Subscription', SubscriptionSchema)
export default Subscription