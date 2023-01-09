const {Path} = require("scenegraph");
const clipboard = require("clipboard");
const path = require("./node_modules/svg-path-properties/dist/svg-path-properties.cjs");
const {showDialog, getArtboard, getAllItemsInNode} = require("./dialog");

const getTotalLength = async (selection) => {
    const artboard = getArtboard(selection.items[0])
    const items = getAllItemsInNode(artboard);
    const totalMessage = pathsLength(items)
    await showDialog(totalMessage);
}

const getSelectionsLength = async (selection) => {
    const items = getAllItemsInNode(selection.items[0]);
    const totalMessage = pathsLength(items);
    await showDialog(totalMessage);
}

function pathsLength(items) {
    let totalLength = items
        .filter(item => item instanceof Path)
        .reduce((acc, item) => {
            const properties = new path.svgPathProperties(item.pathData)
            console.log(item, item.length)
            return acc + properties.getTotalLength();
        }, 0);
    clipboard.copyText(totalLength);
    console.log(totalLength)
    return `Wall length: ${totalLength}`;
}

module.exports = {
    commands: {
        getTotalLength, getSelectionsLength
    }
};
