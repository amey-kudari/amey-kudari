const stringStartsWithCapitalLetter = (st) => {
  // const stringStartsWithCapitalLetter = function(st){
    console.log(arguments);
  // st += st;
  // st = st.toUpperCase();
  st = new String(st);
  const firstCharCode = st.charCodeAt(0);
  return (firstCharCode >= 'A'.charCodeAt(0) && firstCharCode <= 'Z'.charCodeAt(0))
}
// note, above funciton is not O(n), but O(1), run this code to check)
const st = new Array(5).fill('A').join("");
const start = Date.now();
for(let i=0;i<1;i++){ stringStartsWithCapitalLetter(st); }
const timeTaken = Date.now() - start;

console.log(timeTaken);