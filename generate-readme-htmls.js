import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')
const outputDir = join(rootDir, 'maaf_web')

// Simple markdown to HTML converter
function markdownToHtml(markdown) {
  let html = markdown
  
  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  
  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  
  // Code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
  
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
  
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  
  // Lists
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>')
  html = html.replace(/^(\d+)\. (.*$)/gim, '<li>$2</li>')
  
  // Wrap consecutive list items in ul/ol
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
    return '<ul>' + match + '</ul>'
  })
  
  // Paragraphs
  html = html.split('\n\n').map(para => {
    if (para.trim().startsWith('<')) return para
    if (para.trim() === '') return ''
    return '<p>' + para.trim() + '</p>'
  }).join('\n\n')
  
  return html
}

function generateReadmeHtml(packageName) {
  const readmePath = join(rootDir, packageName, 'README.md')
  
  if (!existsSync(readmePath)) {
    console.log(`⚠️  README.md not found: ${readmePath}`)
    return null
  }
  
  const markdown = readFileSync(readmePath, 'utf-8')
  const htmlContent = markdownToHtml(markdown)
  
  const html = `<!doctype html>
<html lang="hu">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${packageName} - MAAF Framework</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem;
      background: #f5f5f5;
    }
    .container {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h1 {
      color: #667eea;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #e5e7eb;
    }
    h2 {
      color: #374151;
      margin-top: 2rem;
      margin-bottom: 1rem;
    }
    h3 {
      color: #4b5563;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
    }
    p {
      margin-bottom: 1rem;
    }
    code {
      background: #f3f4f6;
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
    }
    pre {
      background: #1f2937;
      color: #f9fafb;
      padding: 1rem;
      border-radius: 6px;
      overflow-x: auto;
      margin: 1rem 0;
    }
    pre code {
      background: none;
      padding: 0;
      color: inherit;
    }
    ul, ol {
      margin-left: 2rem;
      margin-bottom: 1rem;
    }
    li {
      margin-bottom: 0.5rem;
    }
    a {
      color: #667eea;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    .back-link {
      display: inline-block;
      margin-bottom: 1rem;
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }
    .back-link:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <a href="index.html" class="back-link">← Vissza a főoldalra</a>
    ${htmlContent}
  </div>
</body>
</html>`
  
  // Ensure output directory exists
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
  }
  
  const outputPath = join(outputDir, `${packageName}-readme.html`)
  writeFileSync(outputPath, html)
  console.log(`✅ Generated: ${packageName}-readme.html`)
  
  return outputPath
}

// Generate HTMLs for all packages
const packages = [
  'maaf-core',
  'maaf-app',
  'maaf-auth',
  'maaf-tenant',
  'maaf-module',
  'maaf-config',
  'maaf-runtime',
  'maaf-queue',
  'maaf-monitor',
  'maaf-search',
  'maaf-storage',
  'maaf-permissions',
  'maaf-flags',
  'maaf-workflow',
  'maaf-billing',
  'maaf-social',
  'maaf-devtools',
  'maaf-testing',
  'maaf-style',
  'maaf-starter-api',
  'maaf-starter-web',
  'maaf-starter-admin',
]

console.log('🚀 Generating README HTML files...\n')

packages.forEach(pkg => {
  generateReadmeHtml(pkg)
})

console.log('\n✅ Done!')
