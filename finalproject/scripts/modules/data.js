export async function getJson(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
    return res.json();
  }
  
  export async function loadCV() {
    return getJson('data/cv.json');
  }
  
  export async function loadLectures() {
    return getJson('data/lectures.json');
}
  