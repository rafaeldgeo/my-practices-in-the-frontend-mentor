import { fetchData, getSkills, getSessions } from '../store/data.store.js';

const data = await fetchData();
const skills = await getSkills();
const sessions = await getSessions();

console.log(data);
console.log(sessions);
console.log(skills);
