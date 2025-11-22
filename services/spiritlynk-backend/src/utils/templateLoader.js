const fs = require("fs");
const path = require("path");

function loadTemplate(name, vars = {}) {
  const filePath = path.join(__dirname, "..", "templates", name + ".html");
  let html = fs.readFileSync(filePath, "utf8");

  for (const key in vars) {
    html = html.replace(new RegExp(`{{${key}}}`, "g"), vars[key]);
  }

  return html;
}

module.exports = { loadTemplate };
