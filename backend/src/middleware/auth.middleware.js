import { clerkClient } from "@clerk/express";



export const protectRoute = async (req, res, next) => {

	
	if (!req.auth.userId) {
		return res.status(401).json({ message: "Unauthorized - you must be logged in" });
	}
	next();
};

export const requireAdmin = async (req, res, next) => {
	try {
		const currentUser = await clerkClient.users.getUser(req.auth.userId);
		const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

		if (!isAdmin) {
			return res.status(403).json({ message: "Unauthorized - you must be an admin" });
		}

		next();
	} catch (error) {
		next(error);
	}
};



// export const authenticateUser = async (req, res, next) => {
//   try {

	
//     const { userId } = getAuth(req);
// 	console.log("Incoming Token:", req.headers.authorization);
//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized - No valid token" });
//     }
//     req.userId = userId; // Attach user ID to request
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Unauthorized - Invalid token" });
//   }
// };

