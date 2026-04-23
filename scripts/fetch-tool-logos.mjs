import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const outDir = path.resolve(__dirname, "../assets/tool-logos");
const logos = require("../node_modules/@iconify-json/logos/icons.json");
const simpleIcons = require("../node_modules/@iconify-json/simple-icons/icons.json");
const devicon = require("../node_modules/@iconify-json/devicon/icons.json");

const iconSets = {
    logos,
    "simple-icons": simpleIcons,
    devicon
};

const iconSpecs = [
    { tool: "GA4", file: "ga4.svg", set: "logos", id: "google-analytics" },
    { tool: "GTM", file: "gtm.svg", set: "logos", id: "google-tag-manager" },
    { tool: "Matomo", file: "matomo.svg", set: "logos", id: "matomo-icon" },
    { tool: "Segment", file: "segment.svg", set: "logos", id: "segment-icon" },
    { tool: "BigQuery", file: "bigquery.svg", set: "simple-icons", id: "googlebigquery", color: "#669DF6" },
    { tool: "Looker Studio", file: "looker-studio.svg", set: "logos", id: "google-data-studio" },
    { tool: "Power BI", file: "power-bi.svg", set: "logos", id: "microsoft-power-bi" },
    { tool: "Tableau", file: "tableau.svg", set: "logos", id: "tableau-icon" },
    { tool: "Mixpanel", file: "mixpanel.svg", set: "logos", id: "mixpanel" },
    { tool: "Amplitude", file: "amplitude.svg", set: "logos", id: "amplitude-icon" },
    { tool: "VWO", file: "vwo.svg", set: "logos", id: "vwo" },
    { tool: "Optimizely", file: "optimizely.svg", set: "logos", id: "optimizely-icon" },
    { tool: "PostHog", file: "posthog.svg", set: "logos", id: "posthog-icon" },
    { tool: "Hotjar", file: "hotjar.svg", set: "logos", id: "hotjar-icon" },
    { tool: "ClickUp", file: "clickup.svg", set: "simple-icons", id: "clickup", color: "#7B68EE" },
    { tool: "Notion", file: "notion.svg", set: "logos", id: "notion-icon" },
    { tool: "Asana", file: "asana.svg", set: "logos", id: "asana-icon" },
    { tool: "Monday.com", file: "monday.svg", set: "logos", id: "monday-icon" },
    { tool: "Trello", file: "trello.svg", set: "logos", id: "trello" },
    { tool: "Slack", file: "slack.svg", set: "logos", id: "slack-icon" },
    { tool: "Shopify", file: "shopify.svg", set: "logos", id: "shopify" },
    { tool: "BigCommerce", file: "bigcommerce.svg", set: "simple-icons", id: "bigcommerce", color: "#121118" },
    { tool: "WooCommerce", file: "woocommerce.svg", set: "logos", id: "woocommerce-icon" },
    { tool: "JavaScript", file: "javascript.svg", set: "logos", id: "javascript" },
    { tool: "Python", file: "python.svg", set: "logos", id: "python" },
    { tool: "GCP", file: "gcp.svg", set: "logos", id: "google-cloud-platform" },
    { tool: "Firebase", file: "firebase.svg", set: "logos", id: "firebase-icon" },
    { tool: "OpenAI (GPT)", file: "openai.svg", set: "logos", id: "openai-icon" },
    { tool: "Claude", file: "claude.svg", set: "logos", id: "claude-icon" },
    { tool: "Langflow", file: "langflow.svg", set: "simple-icons", id: "langflow", color: "#000000" },
    { tool: "REST APIs", file: "rest-apis.svg", set: "logos", id: "openapi-icon" }
];

const compositeSpecs = [
    {
        tool: "HTML / CSS",
        file: "html-css.svg",
        icons: [
            { set: "devicon", id: "html5" },
            { set: "devicon", id: "css3" }
        ]
    },
    {
        tool: "React / Next.js",
        file: "react-nextjs.svg",
        icons: [
            { set: "devicon", id: "react" },
            { set: "devicon", id: "nextjs" }
        ]
    }
];

const siteIconSpecs = [
    { tool: "Convert.com", fileBase: "convert-com", site: "https://www.convert.com/" },
    { tool: "Intelligems", fileBase: "intelligems", site: "https://intelligems.ai/" },
    { tool: "AB Tasty", fileBase: "ab-tasty", site: "https://www.abtasty.com/" },
    { tool: "Varify.io", fileBase: "varify-io", site: "https://varify.io/" },
    { tool: "Microsoft Clarity", fileBase: "microsoft-clarity", site: "https://clarity.microsoft.com/" },
    { tool: "PickFu", fileBase: "pickfu", site: "https://www.pickfu.com/" },
    { tool: "Userbrain", fileBase: "userbrain", site: "https://www.userbrain.com/" },
    { tool: "Crazy Egg", fileBase: "crazy-egg", site: "https://www.crazyegg.com/" },
    { tool: "Heatmap.com", fileBase: "heatmap-com", site: "https://heatmap.com/" },
    { tool: "Make.com", fileBase: "make-com", site: "https://www.make.com/" }
];

const manifest = {};

function svgFromIcon(icon, color) {
    const width = icon.width || 24;
    const height = icon.height || 24;
    const style = color ? ` style="color:${color}"` : "";
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"${style}>${icon.body}</svg>\n`;
}

function getIcon(spec) {
    const data = iconSets[spec.set];
    const icon = data?.icons?.[spec.id];
    if (!icon) {
        throw new Error(`Missing icon: ${spec.set}/${spec.id}`);
    }
    return {
        ...icon,
        width: icon.width || data.width || data.height || 24,
        height: icon.height || data.height || data.width || 24
    };
}

function compositeSvg(spec) {
    const size = 128;
    const cell = 48;
    const gap = 8;
    const totalWidth = (cell * spec.icons.length) + (gap * (spec.icons.length - 1));
    const startX = (size - totalWidth) / 2;
    const startY = (size - cell) / 2;

    const groups = spec.icons.map((iconSpec, index) => {
        const icon = getIcon(iconSpec);
        const width = icon.width || icon.height || 24;
        const height = icon.height || icon.width || 24;
        const scale = Math.min(cell / width, cell / height);
        const scaledWidth = width * scale;
        const scaledHeight = height * scale;
        const x = startX + (index * (cell + gap)) + ((cell - scaledWidth) / 2);
        const y = startY + ((cell - scaledHeight) / 2);
        return `<g transform="translate(${x} ${y}) scale(${scale})">${icon.body}</g>`;
    }).join("");

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">${groups}</svg>\n`;
}

function normaliseIconHref(href, baseUrl) {
    try {
        return new URL(href, baseUrl).toString();
    } catch {
        return null;
    }
}

function inferExtension(url, contentType = "") {
    if (contentType.includes("image/svg")) return ".svg";
    if (contentType.includes("image/png")) return ".png";
    if (contentType.includes("image/x-icon") || contentType.includes("image/vnd.microsoft.icon")) return ".ico";
    if (contentType.includes("image/jpeg")) return ".jpg";

    try {
        const pathname = new URL(url).pathname;
        const ext = path.extname(pathname);
        if (ext) return ext;
    } catch {}

    return ".ico";
}

function toRootDomain(siteUrl) {
    const hostname = new URL(siteUrl).hostname.replace(/^www\./, "");
    const parts = hostname.split(".");
    if (parts.length <= 2) {
        return hostname;
    }
    return parts.slice(-2).join(".");
}

function scoreIconCandidate(candidate) {
    let score = 0;
    const rel = candidate.rel.toLowerCase();
    const href = candidate.href.toLowerCase();

    if (rel.includes("icon")) score += 20;
    if (rel.includes("shortcut")) score += 5;
    if (rel.includes("apple-touch")) score += 2;
    if (href.endsWith(".svg")) score += 8;
    if (href.endsWith(".png")) score += 6;
    if (href.endsWith(".ico")) score += 4;
    if (href.includes("favicon")) score += 6;
    if (href.includes("icon")) score += 3;

    return score;
}

async function fetchText(url) {
    const response = await fetch(url, {
        headers: {
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.status}`);
    }

    return response.text();
}

async function fetchBinary(url) {
    const response = await fetch(url, {
        headers: {
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch binary ${url}: ${response.status}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    return {
        buffer,
        contentType: response.headers.get("content-type") || ""
    };
}

async function fetchSiteIcon(spec) {
    let candidates = [];

    try {
        const html = await fetchText(spec.site);
        const matches = [...html.matchAll(/<link\b[^>]*rel=["']([^"']+)["'][^>]*href=["']([^"']+)["'][^>]*>/gi)];
        candidates = matches
            .map(([, rel, href]) => ({ rel, href: normaliseIconHref(href, spec.site) }))
            .filter((candidate) => candidate.href && candidate.rel.toLowerCase().includes("icon"))
            .sort((a, b) => scoreIconCandidate(b) - scoreIconCandidate(a));
    } catch {}

    const fallbacks = [
        new URL("/favicon.svg", spec.site).toString(),
        new URL("/favicon.png", spec.site).toString(),
        new URL("/favicon.ico", spec.site).toString()
    ];

    const urls = [...new Set([...candidates.map((candidate) => candidate.href), ...fallbacks])];

    for (const url of urls) {
        try {
            const { buffer, contentType } = await fetchBinary(url);
            const extension = inferExtension(url, contentType);
            const fileName = `${spec.fileBase}${extension}`;
            const outputPath = path.join(outDir, fileName);
            await fs.writeFile(outputPath, buffer);
            manifest[spec.tool] = `./assets/tool-logos/${fileName}`;
            return;
        } catch {}
    }

    const rootDomain = toRootDomain(spec.site);
    const clearbitUrl = `https://logo.clearbit.com/${rootDomain}?size=128`;
    const googleFaviconUrl = `https://www.google.com/s2/favicons?domain=${rootDomain}&sz=128`;

    try {
        const { buffer, contentType } = await fetchBinary(clearbitUrl);
        const extension = inferExtension(clearbitUrl, contentType);
        const fileName = `${spec.fileBase}${extension}`;
        const outputPath = path.join(outDir, fileName);
        await fs.writeFile(outputPath, buffer);
        manifest[spec.tool] = `./assets/tool-logos/${fileName}`;
        return;
    } catch {}

    try {
        const { buffer, contentType } = await fetchBinary(googleFaviconUrl);
        const extension = inferExtension(googleFaviconUrl, contentType);
        const fileName = `${spec.fileBase}${extension}`;
        const outputPath = path.join(outDir, fileName);
        await fs.writeFile(outputPath, buffer);
        manifest[spec.tool] = `./assets/tool-logos/${fileName}`;
        return;
    } catch {}

    throw new Error(`Unable to download icon for ${spec.tool}`);
}

async function build() {
    await fs.mkdir(outDir, { recursive: true });

    for (const spec of iconSpecs) {
        const icon = getIcon(spec);
        const svg = svgFromIcon(icon, spec.color);
        const outputPath = path.join(outDir, spec.file);
        await fs.writeFile(outputPath, svg, "utf8");
        manifest[spec.tool] = `./assets/tool-logos/${spec.file}`;
    }

    for (const spec of compositeSpecs) {
        const svg = compositeSvg(spec);
        const outputPath = path.join(outDir, spec.file);
        await fs.writeFile(outputPath, svg, "utf8");
        manifest[spec.tool] = `./assets/tool-logos/${spec.file}`;
    }

    for (const spec of siteIconSpecs) {
        await fetchSiteIcon(spec);
    }

    const manifestPath = path.join(outDir, "manifest.json");
    await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

    console.log(`Generated ${Object.keys(manifest).length} tool logo assets in ${outDir}`);
}

async function buildPackagedOnly() {
    await fs.mkdir(outDir, { recursive: true });

    for (const spec of iconSpecs) {
        const icon = getIcon(spec);
        const svg = svgFromIcon(icon, spec.color);
        const outputPath = path.join(outDir, spec.file);
        await fs.writeFile(outputPath, svg, "utf8");
    }

    for (const spec of compositeSpecs) {
        const svg = compositeSvg(spec);
        const outputPath = path.join(outDir, spec.file);
        await fs.writeFile(outputPath, svg, "utf8");
    }

    console.log(`Regenerated ${iconSpecs.length + compositeSpecs.length} packaged logo assets in ${outDir}`);
}

const task = process.argv.includes("--packaged-only") ? buildPackagedOnly : build;

task().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
