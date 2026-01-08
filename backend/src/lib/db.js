import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URI);
		console.log(`Connected to MongoDB ${conn.connection.host}`);
	} catch (error) {
		console.log("Failed to connect to MongoDB", error);
		// process.exit(1); 
		// Retry logic? For now keeping it simple but removing immediate exit or making it softer could be requested.
		// User asked to "handle error" better. 
		// Let's implement a simple retry mechanism.
		console.log("Retrying connection in 5 seconds...");
		setTimeout(connectDB, 5000);
	}
};
