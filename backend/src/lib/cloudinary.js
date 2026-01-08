import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Validate environment variables
const requiredEnvVars = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
	console.error("❌ Missing required Cloudinary environment variables:", missingEnvVars);
	console.error("Please check your .env file and ensure all Cloudinary credentials are set");
}

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
	api_key: process.env.CLOUDINARY_API_KEY?.trim(),
	api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
	secure: true, // Force HTTPS URLs
});

// Test connection on startup (only in development)
if (process.env.NODE_ENV === "development") {
	cloudinary.api.ping().then(() => {
		console.log("✅ Cloudinary connection verified");
	}).catch((error) => {
		console.error("❌ Cloudinary connection failed:", error);
	});
}

export default cloudinary;
