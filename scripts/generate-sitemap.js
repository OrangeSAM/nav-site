import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { sites } from "../src/config/sites.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 基础URL，根据实际部署环境配置
const BASE_URL = "https://orangesam.github.io/nav-site";

// 生成sitemap XML内容
function generateSitemapXML() {
  const xmlContent = [];
  xmlContent.push('<?xml version="1.0" encoding="UTF-8"?>');
  xmlContent.push(
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  );

  // 添加首页
  xmlContent.push("  <url>");
  xmlContent.push(`    <loc>${BASE_URL}</loc>`);
  xmlContent.push("    <changefreq>daily</changefreq>");
  xmlContent.push("    <priority>1.0</priority>");
  xmlContent.push("  </url>");

  // 遍历所有分类和站点
  sites.forEach((category) => {
    category.sites.forEach((site) => {
      xmlContent.push("  <url>");
      xmlContent.push(
        `    <loc>${BASE_URL}/#${encodeURIComponent(category.category)}</loc>`
      );
      xmlContent.push("    <changefreq>weekly</changefreq>");
      xmlContent.push("    <priority>0.8</priority>");
      xmlContent.push("  </url>");
    });
  });

  xmlContent.push("</urlset>");
  return xmlContent.join("\n");
}

// 确保dist目录存在
const distPath = path.resolve(__dirname, "../dist");
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

// 生成sitemap.xml文件
const sitemapPath = path.join(distPath, "sitemap.xml");
fs.writeFileSync(sitemapPath, generateSitemapXML());

console.log("Sitemap generated successfully at:", sitemapPath);
