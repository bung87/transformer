const { cd, exec, echo, touch,cp } = require("shelljs");
const { readFileSync } = require("fs");
const url = require("url");
const path = require("path");

let repoUrl;
let pkg = JSON.parse(readFileSync("package.json"));
if (typeof pkg.repository === "object") {
    if (!pkg.repository.hasOwnProperty("url")) {
        throw new Error("URL does not exist in repository section");
    }
    repoUrl = pkg.repository.url;
} else {
    repoUrl = pkg.repository;
}

let parsedUrl = url.parse(repoUrl);
let repository = (parsedUrl.host || "") + (parsedUrl.path || "");
let ghToken = "bung87"; // process.env.GH_TOKEN

echo("Deploying docs!!!");
cp(path.join(__dirname,"..","CNAME"),path.join(__dirname,"..","docs"))
cd("docs");
touch(".nojekyll");
exec("git init");
exec("git add .");
exec('git config user.name "bung87"');
exec('git config user.email "crc32@qq.com"');
exec('git commit -m "docs(docs): update gh-pages"');
exec(
    `git push --force --quiet "https://${ghToken}@${repository}" master:gh-pages`
);
echo("Docs deployed!!");