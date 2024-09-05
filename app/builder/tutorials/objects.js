// PRIMITIVE
/*
There are 8 basic data types in JavaScript.

Seven primitive data types:
number for numbers of any kind: integer or floating-point, integers are limited by ±(253-1).
bigint for integer numbers of arbitrary length.
string for strings. A string may have zero or more characters, there’s no separate single-character type.
boolean for true/false.
null for unknown values – a standalone type that has a single value null.
undefined for unassigned values – a standalone type that has a single value undefined.
symbol for unique identifiers.
And one non-primitive data type:
object for more complex data structures.
The typeof operator allows us to see which type is stored in a variable.

Usually used as typeof x, but typeof(x) is also possible.
Returns a string with the name of the type, like "string".
For null returns "object" – this is an error in the language, it’s not actually an object.

*/

//
console.log("OBJECTS");
let user = new Object(); // "object constructor" syntax
let user1 = {};  // "object literal" syntax

user.adsf = 'asdf';
delete user.asdf; // user = {}
key = "asdf";

const objwithKey = { [key + '_key'] : 'adsf' } // {asdf_key: 'asdf'}

// NO NAME LIMITATIONS, IE RESERVED KEYWORDS
let obj = { for: 1, let: 2, return: 3 };
alert( obj.for + obj.let + obj.return );  // 6

// KEYS CAN BE STRING || SYMBOL. ALL OTHER TYPES ARE CONVERTED TO STRINGS
let newobj = { 0: "test" } // same as "0": "test"
// both alerts access the same property (the number 0 is converted to string "0")
alert( obj["0"] ); // test
alert( obj[0] ); // test (same property)

console.log("0" in obj); // check for key in object

for(const key in obj){ console.log(key, obj[key])}; // iterate over object
// ORDER ABOVE WILL BE
// integer properties are sorted, others appear in creation order. The details follow.

const nb = {};
nb['adsf'] = 'qwer';
nb[1] = 'asdf';
nb['bdsf'] = 'qwer';
nb[0] = 'qewr';
nb['cdsf'] = 'qwer';

for(const key in nb) console.log(key); // 0 1 adsf bdsf cdsf

// COPYING OBJECTS
// copies all properties from permissions1 and permissions2 into user, shallow copy
Object.assign(user, permissions1, permissions2);
// If the copied property name already exists, it gets overwritten:

let clone = structuredClone(user); // structured clone
// also supports circular references
user.me = user;
clone = structuredClone(user);
alert(clone.me === clone); // true

// NOTE: functions are not cloned. 
// error
structuredClone({
  f: function() {}
});
// FOR THIS: _.cloneDeep(obj) from the JavaScript library lodash.

// GARBAGE COLLECTOR: “mark-and-sweep” algorithm
// MARK ALL ROOTS (<global>), then find everything else from there and mark, all reachable. Now delete all unmarked.


// this => REFERS TO THE OBJECT ITSELF
// In JavaScript this is “free”, its value is evaluated at call-time and does not depend on where the method was declared, 
// but rather on what object is “before the dot”.
user = { name: "John" };
admin = { name: "Admin" };

function sayHi() { alert( this.name );}

// use the same function in two objects
user.f = sayHi; admin.f = sayHi;

// these calls have different this
// "this" inside the function is the object "before the dot"
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

// ARROW FUNCTIONS DO NOT HAVE THIS
user = {
  firstName: "Ilya",
  sayHi() { let arrow = () => alert(this.firstName); arrow(); }
};
user.sayHi(); // Ilya

// CONSTRUCTOR FUNCTIONS= > used wiht new operator. constructor should start with CAPITAL letter.
// ARROW CANT BE CONSTRUCTOR CUZ this in arrow functions is lexically scoped
function Construc(name){
  this.name = name ?? 'NO NAME';
}
const obj_cons = new Construc('adsf');

// CHECK IF NEW WAS USED
function User() {alert(new.target);}
User(); // without "new": // undefined
new User(); // with "new": // function User { ... }

// CONSTRUCTORS DO NOT NEED TO DECLARE this={} or return this;
// If return is called with an object, then the object is returned instead of this.
// If return is called with a primitive, it’s ignored, and this is returned if new is used

function Constr(){ this.asdf = 'asdf'; return 1; }
Constr(); // 1
new Constr(); // {asdf : 'adsf'}

user = new User; // <-- no parentheses, works same but NOT RECOMMENDED
// same as
user = new User(); 


// OPTIONAL CHAINING
// asdf?.asdf or ?.(), ?.[]

// the ?. immediately stops (“short-circuits”) the evaluation if the left part doesn’t exist.
user = null; let x = 0;
user?.sayHi(x++); // no "user", so the execution doesn't reach sayHi call and x++

alert(x); // 0, value not incremented

delete user?.name; // delete user.name if user exists

// ERROR EROR ERROR
// user?.name = "John"; // Error, doesn't work. NOT SAFE EDIT, ONLY SAFE READ

// because it evaluates to: undefined = "John"

// SYMBOLS (apart from strings, only symbols can be keys)
let id1 = Symbol("id");
let id2 = Symbol("id");

alert(id1 == id2); // false
// useful when defining object properties while ensuing key does not override
obj = { [id1] : 'adsf' }
// Symbols are skipped by for…in, and in Object.keys =>  “hiding symbolic properties” principle
// BUT, Object.assign copies both string and symbol properties:

// Technically, symbols are not 100% hidden. There is a built-in method Object.getOwnPropertySymbols(obj) 
// that allows us to get all symbols. Also there is a method named Reflect.ownKeys(obj) that returns all keys of an object including symbolic ones. 
// But most libraries, built-in functions and syntax constructs don’t use these methods.

// GLOBAL SYMBOLS
// read from the global registry
let id = Symbol.for("id"); // if the symbol did not exist, it is created

// read it again (maybe from another part of the code)
let idAgain = Symbol.for("id");

// the same symbol
alert( id === idAgain ); // true

// GET NAME
let sym = Symbol.for("name");
alert( Symbol.keyFor(sym) ); // name

// https://javascript.info/object-toprimitive  => READ ONCE. #TODO

// ================================================================================================================================
// PRIMITIVES AND DATATYPES
// Here’s what actually happens in 
str = "asdf"; str.toUpperCase();

// 1. The string str is a primitive. So in the moment of accessing its property, 
//       a special object is created that knows the value of the string, and has useful methods, like toUpperCase().
// 2. That method runs and returns a new string (shown by alert).s
// 3. The special object is destroyed, leaving the primitive str alone.


let zero = new Number(0);
if (zero) { // zero is true, because it's an object
  alert( "zero is truthy!?!" );
}
alert( typeof new Number(0) ); // "object"!


let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25

// TEST FOR POLYFILLS // window is the global variable. In nodejs, it is global. Std: globalThis
// window === globalThis
if (!window.Promise) {
  alert("Your browser is really old!");
}

// functions have a name
function f(sayHi = function() {}) {
  alert(sayHi.name); // sayHi (works!)
}
f();

// ARROW FUNCTIONS ALSO WORK. sayHi = () => {}, works

// .length property
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2

// zero delay settimeout
setTimeout(() => alert("World"));
alert("Hello");
// first hello comes, and then world