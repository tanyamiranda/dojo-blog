export const URI_POSTS_JSON = "http://localhost:2222/posts";

export function searchUserName(users, userId){
  const user = users.find((rec) => rec.id == userId);
  return user.name
}

export async function fetchData(uri) {

  try {
      console.log("Fetching data " + uri)
      const response = await fetch(uri);
      const data = await response.json();
      return data
  } catch (error) {
      console.error("Error fetching or parsing JSON", uri);
      console.error(error);
      return null;
  }
}  

export async function fetchPosts() {
  return fetchData(URI_POSTS_JSON)
}
