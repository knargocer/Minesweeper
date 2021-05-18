
export const shown = (arr, x, y, newNonMinesCount) => {

  if (arr[x][y].shown) {
    return;
  }

  let toOpen = [];
  toOpen.push(arr[x][y]);
  
  while (toOpen.length !== 0) {
    
    let tile = toOpen.pop();

    if (!tile.shown) {
      newNonMinesCount--;
      tile.shown = true;
    }
    
//To stop when there is a tile opened
    if (tile.value !== 0) {
      break;
    }

    if (
      tile.x > 0 &&
      tile.y > 0 &&
      arr[tile.x - 1][tile.y - 1].value === 0 &&
      !arr[tile.x - 1][tile.y - 1].shown
    ) {
      toOpen.push(arr[tile.x - 1][tile.y - 1]);
    }
    if (
      tile.x < arr.length - 1 &&
      tile.y < arr[0].length - 1 &&
      arr[tile.x + 1][tile.y + 1].value === 0 &&
      !arr[tile.x + 1][tile.y + 1].shown
    ) {
      toOpen.push(arr[tile.x + 1][tile.y + 1]);
    }
    if (
      tile.x < arr.length - 1 &&
      tile.y > 0 &&
      arr[tile.x + 1][tile.y - 1].value === 0 &&
      !arr[tile.x + 1][tile.y - 1].shown
    ) {
      toOpen.push(arr[tile.x + 1][tile.y - 1]);
    }
    if (
      tile.x > 0 &&
      tile.y < arr[0].length - 1 &&
      arr[tile.x - 1][tile.y + 1].value === 0 &&
      !arr[tile.x - 1][tile.y + 1].shown
    ) {
      toOpen.push(arr[tile.x - 1][tile.y + 1]);
    }

    // Single ones
    if (
      tile.x > 0 &&
      arr[tile.x - 1][tile.y].value === 0 &&
      !arr[tile.x - 1][tile.y].shown
    ) {
      toOpen.push(arr[tile.x - 1][tile.y]);
    }
    if (
      tile.x < arr.length - 1 &&
      arr[tile.x + 1][tile.y].value === 0 &&
      !arr[tile.x + 1][tile.y].shown
    ) {
      toOpen.push(arr[tile.x + 1][tile.y]);
    }
    if (
      tile.y > 0 &&
      arr[tile.x][tile.y - 1].value === 0 &&
      !arr[tile.x][tile.y - 1].shown
    ) {
      toOpen.push(arr[tile.x][tile.y - 1]);
    }
    if (
      tile.y < arr[0].length - 1 &&
      arr[tile.x][tile.y + 1].value === 0 &&
      !arr[tile.x][tile.y + 1].shown
    ) {
      toOpen.push(arr[tile.x][tile.y + 1]);
    }

    if (
      tile.x > 0 &&
      tile.y > 0 &&
      !arr[tile.x - 1][tile.y - 1].shown
    ) {
      //Top Left Reveal

      arr[tile.x - 1][tile.y - 1].shown = true;
      newNonMinesCount--;
    }

    if (tile.y > 0 && !arr[tile.x][tile.y - 1].shown) {
      // Top Reveal
      arr[tile.x][tile.y - 1].shown = true;
      newNonMinesCount--;
    }

    if (
      tile.x < arr.length - 1 &&
      tile.y > 0 &&
      !arr[tile.x + 1][tile.y - 1].shown
    ) {
      //Top Right Reveal
      arr[tile.x + 1][tile.y - 1].shown = true;
      newNonMinesCount--;
    }

    if (tile.x > 0 && !arr[tile.x - 1][tile.y].shown) {
      //Left Reveal
      arr[tile.x - 1][tile.y].shown = true;
      newNonMinesCount--;
    }

    if (tile.x < arr.length - 1 && !arr[tile.x + 1][tile.y].shown) {
      // Right Reveal
      arr[tile.x + 1][tile.y].shown = true;
      newNonMinesCount--;
    }

    if (
      tile.x > 0 &&
      tile.y < arr[0].length - 1 &&
      !arr[tile.x - 1][tile.y + 1].shown
    ) {
      // Bottom Left Reveal
      arr[tile.x - 1][tile.y + 1].shown = true;
      newNonMinesCount--;
    }

    if (tile.y < arr[0].length - 1 && !arr[tile.x][tile.y + 1].shown) {
      //Bottom Reveal
      arr[tile.x][tile.y + 1].shown = true;
      newNonMinesCount--;
      console.log(toOpen)
    }

    if (
      tile.x < arr.length - 1 &&
      tile.y < arr[0].length - 1 &&
      !arr[tile.x + 1][tile.y + 1].shown
    ) {
      // Bottom Right Reveal
      arr[tile.x + 1][tile.y + 1].shown = true;
      newNonMinesCount--;
    }
  }
  return { arr, newNonMinesCount };
};
