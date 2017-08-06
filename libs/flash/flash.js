////////////////////
//// HELPERS

// Calculate Depth from a number of transactions
export const calculateDepth = num => {
  return Math.ceil(Math.log(num) / Math.log(3));
};

// Generate an empty flash object
export const initialFlash = depth => {
  var counter = [];
  var addresses = [];

  // Add the correct amount of counters and arrays
  for (var i of Array(depth).keys()) {
    counter[i] = 0;
    addresses[i] = [];
  }
  return {
    depth: depth,
    addressIndex: 0,
    bundles: [],
    counter,
    addresses
  };
};

// This recurisvly walks the tree from the tip and update values
export const walkTree = counters => {
  // New Obj
  var arr = Object.assign([], counters);

  // ADD FLAGS TO INDICATE NEW BUNDLES TO BE GENERATED
  var requiredBundles = [];

  // Set a counter for the loop
  var index = counters.length - 1;
  // Flag to kill the loop when done
  var again = true;
  // While loop.... lol
  while (again) {
    // Check to see if we need another loop and to reset this level counter
    if (counters[index] === 2) {
      requiredBundles.push(index);
      // Set the counter to 0
      arr[index] = 0;
      // Move the index up a level
      index--;
    } else {
      requiredBundles.push(index);

      // Increase counter
      arr[index]++;

      // Break loop
      again = false;
    }
  }
  console.log(requiredBundles);
  return { counter: arr, reqBundles: requiredBundles };
};

/// Will ocme back to this func
//////////
// export const walkies = (tree, index) => {
//   let move = false;
//   for (var depth of Object.keys(tree).reverse()) {
//     if (move || tree[depth].uses === 2) {
//       console.log(tree[depth]);
//       tree[depth].keyIndex = index++;
//       tree[depth].uses = 0;
//       move = true;
//     } else {
//       tree[depth].uses++;
//     }
//   }
//   return tree;
// };