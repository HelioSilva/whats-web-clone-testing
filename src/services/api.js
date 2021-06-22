import axios from "axios";

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGlvIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpbnN0YW5jZSI6IjEiLCJpYXQiOjE2MjM1NTEyNzIsImV4cCI6MTY1NTA4NzI3Mn0.SMEqSy9qeQXOHHPWexS7ruQAJAK2MvW0iiEgoo77Whg"

const api = axios.create({
  //baseURL: "http://3.91.230.251:3333",
  baseURL: "http://127.0.0.1:3333",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default api;
