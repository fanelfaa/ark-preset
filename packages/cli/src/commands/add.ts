import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

/**
 * usage: npx create-ui add {component_name}
 * this command will copy the whole code in the component source file @ui/solid/src{component_name}.tsx to folder src/component/{component_name}.tsx
 * and update src/component/index.ts
 * and also copy the whole recipes code from the recipes source file @ui/core/src/recipes/{component_name}.ts to src/recipes/{component_name}.ts
 * and update src/recipes/index.ts
 * and ensure the import is correct
 * import from '@ui/core' changed to '../recipes'
 */

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '../../..')

const COMPONENTS = [
  'accordion', 'button', 'checkbox', 'collapsible', 'date-picker',
  'dialog', 'drawer', 'input', 'menu', 'number-input',
  'popover', 'radio-group', 'select', 'slider', 'switch',
  'tabs', 'toast', 'tooltip',
]

export async function addComponent(componentName: string, outputDir: string, framework: string = 'solid') {
  const component = componentName.toLowerCase()
  const fw = framework.toLowerCase()

  if (!COMPONENTS.includes(component)) {
    console.error(`Unknown component: ${componentName}`)
    console.log(`Available components: ${COMPONENTS.join(', ')}`)
    process.exit(1)
  }

  // Source paths
  const compSourceBase = fw === 'react' ? 'packages/react/src' : 'packages/solid/src'
  const recipeSourceBase = 'packages/core/src/recipes'
  const sourceDir = path.join(repoRoot, compSourceBase)
  const recipeSourceDir = path.join(repoRoot, recipeSourceBase)

  // Target paths
  const compTargetDir = path.resolve(outputDir)
  const recipeTargetDir = path.join(path.dirname(compTargetDir), 'recipes')

  // 1. Copy component file with import fix (@ui/core → ../recipes)
  const sourceFile = path.join(sourceDir, `${component}.tsx`)
  const targetFile = path.join(compTargetDir, `${component}.tsx`)

  await fs.ensureDir(compTargetDir)
  let content = await fs.readFile(sourceFile, 'utf-8')
  content = content.replace(/from\s+['"]@ui\/core['"]/g, "from '../recipes'")
  await fs.writeFile(targetFile, content, 'utf-8')
  console.log(`✓ Copied ${component} to ${targetFile}`)

  // 2. Copy recipe file
  const recipeSourceFile = path.join(recipeSourceDir, `${component}.ts`)
  const recipeTargetFile = path.join(recipeTargetDir, `${component}.ts`)

  if (await fs.pathExists(recipeSourceFile)) {
    await fs.ensureDir(recipeTargetDir)
    await fs.copy(recipeSourceFile, recipeTargetFile)
    console.log(`✓ Copied recipe to ${recipeTargetFile}`)
  } else {
    console.warn(`⚠ Recipe not found: ${recipeSourceFile}`)
  }

  // 3. Update component index.ts
  const compIndexFile = path.join(compTargetDir, 'index.ts')
  const compExportLine = `export * from './${component}'`

  if (await fs.pathExists(compIndexFile)) {
    const indexContent = await fs.readFile(compIndexFile, 'utf-8')
    if (!indexContent.includes(compExportLine)) {
      await fs.appendFile(compIndexFile, `\n${compExportLine}\n`, 'utf-8')
      console.log(`✓ Updated ${compIndexFile}`)
    }
  } else {
    await fs.writeFile(compIndexFile, `${compExportLine}\n`, 'utf-8')
    console.log(`✓ Created ${compIndexFile}`)
  }

  // 4. Update recipes index.ts
  const recipeIndexFile = path.join(recipeTargetDir, 'index.ts')
  const recipeExportLine = `export * from './${component}'`

  if (await fs.pathExists(recipeIndexFile)) {
    const indexContent = await fs.readFile(recipeIndexFile, 'utf-8')
    if (!indexContent.includes(recipeExportLine)) {
      await fs.appendFile(recipeIndexFile, `\n${recipeExportLine}\n`, 'utf-8')
      console.log(`✓ Updated ${recipeIndexFile}`)
    }
  } else {
    await fs.ensureDir(recipeTargetDir)
    await fs.writeFile(recipeIndexFile, `${recipeExportLine}\n`, 'utf-8')
    console.log(`✓ Created ${recipeIndexFile}`)
  }

  // 5. Copy theme.css (only if not exists)
  const themeSource = 'packages/core/src/theme.css'
  const themeSourcePath = path.join(repoRoot, themeSource)
  const themeTarget = path.join(compTargetDir, 'theme.css')
  if (!await fs.pathExists(themeTarget)) {
    await fs.copy(themeSourcePath, themeTarget)
    console.log(`✓ Copied theme.css to ${compTargetDir}`)
  }
}