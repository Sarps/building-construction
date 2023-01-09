const {Artboard} = require("scenegraph");

const showDialog = (message) => {
    const dialog = document.createElement("dialog");
    dialog.innerHTML = `
    <style>
      .container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }
      h1 {
        margin: 0;
      }
      p {
        margin: 12px 0 0 0;
      }
      .buttons {
        display: flex;
        justify-content: flex-end;
        margin-top: 24px;
      }
      button {
        min-width: 64px;
      }
    </style>
    <div class="container">
      <h1>Total Length</h1>
      <p>${message}</p>
      <div class="buttons">
        <button id="ok-button">OK</button>
      </div>
    </div>
  `;
    dialog.querySelector("#ok-button").addEventListener("click", () => {
        dialog.close();
    });
    document.appendChild(dialog);
    return dialog.showModal();
}

function getArtboard(node) {
    let currentNode = node;
    while (currentNode && !(currentNode instanceof Artboard)) {
        currentNode = currentNode.parent;
    }
    return currentNode;
}

function getAllItemsInNode(node) {
    let items = [node];
    node.children.forEach((node) => {
        items.push(node);
        if (node.children && node.children.length > 0) {
            items = items.concat(getAllItemsInNode(node));
        }
    });
    return items;
}

module.exports = {
    showDialog, getArtboard, getAllItemsInNode
}