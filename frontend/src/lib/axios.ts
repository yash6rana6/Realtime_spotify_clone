import axios from "axios";


export const clearAllCaches = async () => {
	if ("caches" in window) {
	  const cacheNames = await caches.keys();
	  await Promise.all(cacheNames.map(cache => caches.delete(cache)));
	  console.log("Cache cleared after song upload!");
	}
  };
  
export const axiosInstance = axios.create({
	
	baseURL: import.meta.env.MODE === "development" ? "http://localhost:8000/api" : "/api",
});



