const flamesMeaning = {
  F: { label: "Friends", img: "https://img.icons8.com/3d-fluency/200/friends--v1.png" },
  L: { label: "Lovers", img: "https://img.icons8.com/3d-fluency/200/hearts.png" },
  A: { label: "Attraction", img: "https://img.icons8.com/3d-fluency/200/like.png" },
  M: { label: "Marriage", img: "https://img.icons8.com/3d-fluency/200/wedding-rings.png" },
  E: { label: "Enemies", img: "https://img.icons8.com/3d-fluency/200/broken-heart.png" },
  S: { label: "Siblings", img: "https://img.icons8.com/3d-fluency/200/siblings.png" }
};

function cleanName(name) {
  return name.toLowerCase().replace(/\s/g, '');
}

function getRemainingCount(name1, name2) {
  let arr1 = name1.split('');
  let arr2 = name2.split('');

  for (let i = 0; i < arr1.length; i++) {
    let index = arr2.indexOf(arr1[i]);
    if (index !== -1) {
      arr1.splice(i, 1);
      arr2.splice(index, 1);
      i--;
    }
  }

  return arr1.length + arr2.length;
}

function getFlamesLetter(count) {
  let flames = ['F', 'L', 'A', 'M', 'E', 'S'];
  let index = 0;
  while (flames.length > 1) {
    index = (index + count - 1) % flames.length;
    flames.splice(index, 1);
  }
  return flames[0];
}

function flamesGame() {
  const name1 = cleanName(document.getElementById("name1").value);
  const name2 = cleanName(document.getElementById("name2").value);

  if (!name1 || !name2) {
    alert("Please enter both names!");
    return;
  }

  const count = getRemainingCount(name1, name2);
  const letter = getFlamesLetter(count);

  // Redirect to result page with final letter as a parameter
  window.location.href = `result.html?letter=${letter}`;
}

