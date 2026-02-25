import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

let cachedContent: Record<string, any> | null = null

export function getSiteContent(): Record<string, any> {
  if (cachedContent) return cachedContent

  const yamlPath = path.join(process.cwd(), 'src/content/site.yaml')
  const file = fs.readFileSync(yamlPath, 'utf8')
  cachedContent = yaml.load(file) as Record<string, any>
  return cachedContent
}
