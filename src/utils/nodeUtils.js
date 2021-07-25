export const createNode = (htmlTempate) => {
  const template = document.createElement("template");
  template.innerHTML = htmlTempate.trim();

  return template.content.firstChild;
};

export const insertNode = (nodeTempate, node) => {
  node.appendChild(nodeTempate);
};
