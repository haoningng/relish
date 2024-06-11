
export default function localStorageSetter({access, refresh}) {
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    console.log("LOCAL is SET")
}