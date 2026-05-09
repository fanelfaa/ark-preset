import fs from 'fs-extra'
import path from 'path'

const COMPONENTS = ['button', 'input', 'dialog', 'select', 'toast']

export async function addComponent(componentName: string, outputDir: string) {
  const component = componentName.toLowerCase()
  
  if (!COMPONENTS.includes(component)) {
    console.error(`Unknown component: ${componentName}`)
    console.log(`Available components: ${COMPONENTS.join(', ')}`)
    process.exit(1)
  }
  
  const sourceDir = path.join(process.cwd(), 'packages/ui/src')
  const targetDir = path.resolve(outputDir)
  
  // Copy component
  const sourceFile = path.join(sourceDir, `${component}.tsx`)
  const targetFile = path.join(targetDir, `${component}.tsx`)
  
  await fs.ensureDir(targetDir)
  await fs.copy(sourceFile, targetFile)
  
  // Copy theme.css if not exists
  const themeSource = path.join(sourceDir, 'theme.css')
  const themeTarget = path.join(targetDir, 'theme.css')
  if (!await fs.pathExists(themeTarget)) {
    await fs.copy(themeSource, themeTarget)
  }
  
  console.log(`✓ Copied ${component} to ${targetFile}`)
}