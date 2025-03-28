const getColor = document.querySelector('.color');
const rangeValue = document.querySelector('.range-input');
const gridLabel = document.querySelector('.grid-label');
const sketchContainer = document.querySelector('.sketch-container');
const toolsContainer = document.querySelector('.tools');
const toolsChildren = document.querySelectorAll('.tools div *');

const createGrids = () => {
  sketchContainer.innerHTML = '';
  const numberOfGridsRow = rangeValue.value;
  const sketchContainerHeight = 560;
  const heightOfGrids = (sketchContainerHeight / (numberOfGridsRow));
  const numberOfGridsRowSquared = numberOfGridsRow ** 2;

  sketchContainer.style.width = `${sketchContainerHeight}px`;
  sketchContainer.style.height = `${sketchContainerHeight}px`;

  const fragment = new DocumentFragment();

  const createGridElement = (count) => {
    let gridDiv = document.createElement('div');
    gridDiv.classList.add(`grid-box`, count);
    fragment.appendChild(gridDiv);
    gridDiv.style.width = `${heightOfGrids}px`;
    gridDiv.style.height = `${heightOfGrids}px`;
  }

  for (let i = 0; i < numberOfGridsRowSquared; i++) {
    createGridElement(i + 1);
  }

  sketchContainer.appendChild(fragment);
}

const paintColor = (event, currentColor) => {
  if (event.target.classList.value === 'container' || 
    event.target.style.background || 
    event.target.style.background !== '' ||
    event.target.style.opacity === 1)
  {
    return;
  }

  return event.target.style.background = currentColor;
}

const randomColor = () => {
  let rgbValueArray = []
  for (let i = 0; i < 3; i++) {
    let randomNumber = Math.floor(Math.random() * 256);
    rgbValueArray.push(randomNumber);
  }

  return `rgba(${rgbValueArray[0]}, ${rgbValueArray[1]}, ${rgbValueArray[2]}, 1)`
}

const resetTools = () => {
  toolsChildren.forEach(item => {
    item.style.background = 'var(--fg-color)';//reset to default 
    item.style.color = 'var(--bg-color)';//reset to default 
    item.style.boxShadow = '-2px -2px var(--secondary-color)';//reset to default 
  });
}

const startSketchColor = (event) => {
  paintColor(event, getColor.value);
}

const randomSketchColor = (event) => {
  paintColor(event, randomColor());
}

const eraseSketchColor = (event) => {
  event.target.style.background = '';
}

const resetSketchColor = () => {
  resetTools();
  createGrids();
}

let currentToolName;

toolsChildren.forEach(item => {
  item.addEventListener('click', (e) => {
    if (e.target.name === 'reset') {
     return resetSketchColor();
    }
    resetTools();
    e.target.style.background = 'var(--highlight-btn)';
    e.target.style.color = 'var(--secondary-color)';
    currentToolName = e.target.name;
  });
});

const currentTool = (event) => {
  switch(currentToolName) {
    case 'color':
      return  startSketchColor(event);

    case 'random':
      return randomSketchColor(event);

    case 'erase':
      return eraseSketchColor(event);

    case 'reset':
      return resetSketchColor();
  }
}

sketchContainer.addEventListener('mousedown', (mousedownEvent) => {
  if (mousedownEvent.button === 0) {
    currentTool(mousedownEvent);
  }
  sketchContainer.addEventListener('mousemove', currentTool);
});

sketchContainer.addEventListener('mouseup', (mousedownEvent) => {
  if (mousedownEvent.button === 0) {
    currentTool(mousedownEvent);
  }
  sketchContainer.removeEventListener('mousemove', currentTool);
});

rangeValue.addEventListener('mousedown', createGrids);
rangeValue.addEventListener('keydown', createGrids);
rangeValue.addEventListener('mousemove', () => {
  gridLabel.textContent = `${rangeValue.value}x${rangeValue.value}`;
  rangeValue.addEventListener('mouseup', createGrids);
});

document.addEventListener('DOMContentLoaded', createGrids);