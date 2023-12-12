import mongoose, { ConnectOptions } from "mongoose";

export default {
    init: async function (connectionString: string) {
        try {
            await mongoose.connect(connectionString, {
                useUnifiedTopology: true,
                useNewUrlParser: true
            } as ConnectOptions);
            console.log("Mongodb connected ");
        } catch (e) {
            console.log(`Error while connecting to mongoDB: ${e}`);
            process.exit(1);
        }
    },
    closeConnection: async function () {
        await mongoose.connection.close();
        console.log("Mongoose connection closed");
    }
};
