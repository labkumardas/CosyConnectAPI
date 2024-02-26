let a = [
  {
    address: "Ambala",
    preference: "100 km",
  },
  {
    address: "Mohali",
    preference: "100 km",
  }
];

let b = {
  address: "Mohali sector 71",
  preference: "110 km"
};

// Extracting the addresses from array a and the new address from object b
let addressesToSearch = a.map(item => item.address);
let newAddress = b.address;

// Building a regular expression pattern for the text search
let regexPattern = addressesToSearch.map(address => `(${address})`).join('|');
let regex = new RegExp(regexPattern, 'i');

// MongoDB query using $regex and $text
let query = {
  $or: [
    { address: { $regex: regex, $options: 'i' } },
    { $text: { $search: newAddress } }
  ]
};

console.log(query);
