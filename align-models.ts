import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

export interface EntityModel {
  fileContent: string
  classNames: string[],
  outputPath: string,
  relativePath: string,
  type: 'enum' | 'class'
}

const abstractEntitiesPaths = [
  path.join(__dirname, 'api/src/app/shared/base-entity.ts'),
  path.join(__dirname, 'api/src/app/shared/base-filter.ts')
]

const inputDir = process.argv[2]

const enumDir = path.join(__dirname, 'api/src/app/models/enums');
const entitiesDir = path.join(__dirname, 'api/src/app/models');
const outputDir = path.join(__dirname, inputDir);


function readEntityFiles(dir: string): string[] {
  return fs.readdirSync(dir).filter(file => file.endsWith('.ts'));
}

function extractEnumContent(entityFilePath: string, sourceFiles: Map<string, ts.SourceFile>): { interfaceContent: string, classNames: string[] } {
  const fileContent = fs.readFileSync(entityFilePath, 'utf8');
  const sourceFile = ts.createSourceFile(entityFilePath, fileContent, ts.ScriptTarget.Latest, true);

  sourceFiles.set(entityFilePath, sourceFile);

  let interfaceContent = fileContent;
  let classNames: string[] = []
  function visit(node: ts.Node) {
    console.log(ts.isEnumDeclaration(node));

    if (ts.isEnumDeclaration(node) && node.name) {
      classNames.push(node.name.getText())
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile)
  return { interfaceContent, classNames };
}


function extractInterfaceContent(entityFilePath: string, sourceFiles: Map<string, ts.SourceFile>): { interfaceContent: string, classNames: string[] } {
  const fileContent = fs.readFileSync(entityFilePath, 'utf8');
  const sourceFile = ts.createSourceFile(entityFilePath, fileContent, ts.ScriptTarget.Latest, true);

  sourceFiles.set(entityFilePath, sourceFile);

  let interfaceContent = '';
  let classNames: string[] = []
  function visit(node: ts.Node) {
    if (ts.isClassDeclaration(node) && node.name) {
      const className = node.name.getText()
      classNames.push(className);
      let extendsClause = '';

      if (node.heritageClauses) {
        const extendsClauseNode = node.heritageClauses.find(clause => clause.token === ts.SyntaxKind.ExtendsKeyword);
        if (extendsClauseNode) {
          const parentClass = extendsClauseNode.types[0].expression.getText();
          extendsClause = ` extends ${parentClass}`;
        }
      }

      interfaceContent += `export interface ${className}${extendsClause} {\n`;

      node.members.forEach(member => {
        if (ts.isPropertyDeclaration(member) && member.name) {
          const propertyName = member.name.getText();
          const type = member.type ? member.type.getText() : 'any';
          interfaceContent += `  ${propertyName}?: ${type};\n`;
        }
      });

      interfaceContent += `}\n`;
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return { interfaceContent, classNames };
}

async function generateInterfaces() {
  const entityFiles = readEntityFiles(entitiesDir);

  await fs.promises.mkdir(outputDir, { recursive: true });
  await fs.promises.mkdir(`${outputDir}/enums`, { recursive: true });

  entityFiles.forEach(file => {
    const filePath = path.join(entitiesDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);
    sourceFiles.set(filePath, sourceFile);
  });


  let entities: EntityModel[] = []
  for (const entityFile of entityFiles) {
    const entityFilePath = path.join(entitiesDir, entityFile);

    const res = extractInterfaceContent(entityFilePath, sourceFiles);
    const interfaceContent = res.interfaceContent
    const classNames = res.classNames
    const interfaceFileName = entityFile.replace('.entity.ts', '.ts');
    entities.push({
      fileContent: interfaceContent,
      classNames: classNames,
      outputPath: path.join(outputDir, interfaceFileName),
      relativePath: './' + interfaceFileName.replace('.ts', ''),
      type: 'class'
    })
    // await fs.promises.writeFile(path.join(outputDir, interfaceFileName), interfaceContent, 'utf8');
  }
  console.log(entities);


  //read sharedFiles
  abstractEntitiesPaths.forEach(file => {
    const filePath = file;
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);
    sourceFiles.set(filePath, sourceFile);
  })

  let abstractEntities: EntityModel[] = []
  for (const entityFile of abstractEntitiesPaths) {
    const entityFilePath = entityFile;
    const res = extractInterfaceContent(entityFilePath, sourceFiles);
    const interfaceContent = res.interfaceContent
    const classNames = res.classNames
    const t = entityFile.split('/')
    const interfaceFileName = t[t.length - 1].replace('.entity.ts', '.ts');
    abstractEntities.push({
      fileContent: interfaceContent,
      classNames: classNames,
      outputPath: path.join(outputDir, interfaceFileName),
      relativePath: './' + interfaceFileName.replace('.ts', ''),
      type: 'class'
    })
    //await fs.promises.writeFile(path.join(outputDir, interfaceFileName), interfaceContent, 'utf8');
  }

  //enums
  const enumFiles = readEntityFiles(enumDir)


  enumFiles.forEach(file => {
    const filePath = path.join(enumDir, file);
    console.log(filePath);

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);
    sourceFiles.set(filePath, sourceFile);
  })

  let enumEntities: EntityModel[] = []
  for (const entityFile of enumFiles) {
    const entityFilePath = path.join(enumDir, entityFile);
    console.log(entityFilePath);

    const res = extractEnumContent(entityFilePath, sourceFiles);
    const interfaceContent = res.interfaceContent
    const classNames = res.classNames
    enumEntities.push({
      fileContent: interfaceContent,
      classNames: classNames,
      outputPath: path.join(outputDir, 'enums', entityFile),
      relativePath: './' + 'enums/' + entityFile.replace('.ts', ''),
      type: 'enum'
    })
  }

  console.log(enumEntities);
  console.log(entities);
  console.log(abstractEntities);

  const allEntities = [...enumEntities, ...entities, ...abstractEntities]

  const allEntitiesWithImports = addImportStatements(allEntities)
  allEntitiesWithImports.push(generateIndexFile(allEntitiesWithImports))

  await writeFile(allEntitiesWithImports)
  console.log('Interfaces generated successfully.');


}

const sourceFiles = new Map<string, ts.SourceFile>();
console.log('Start ');

generateInterfaces().catch(err => {
  console.error('Error generating interfaces:', err);
});

function addImportStatements(entities: EntityModel[]) {
  return entities.map(entity => {
    let modifiedFileContent = entity.fileContent
    if (entity.type !== 'enum') {



      entities.forEach(e => {
        if (!entity.classNames.some(cn => e.classNames.includes(cn))
          && (e.classNames.some(cn => entity.fileContent.includes(' ' + cn + ';'))
            || e.classNames.some(cn => entity.fileContent.includes(' ' + cn + ' '))
            || e.classNames.some(cn => entity.fileContent.includes(' ' + cn + '[];')))) {
          modifiedFileContent = `import {${e.classNames.join(',')}} from '${e.relativePath}' \n` + modifiedFileContent
        }
      });
    }
    return {
      ...entity,
      fileContent: modifiedFileContent
    }
  });
}

function writeFile(entities: EntityModel[]) {
  return Promise.all(entities.map(entity => {
    console.log(entity.outputPath);
    console.log(entity.fileContent);

    fs.promises.writeFile(entity.outputPath, entity.fileContent, 'utf8');
  }))
}

function generateIndexFile(entities: EntityModel[]): EntityModel {
  let indexFileContent = ''
  entities.forEach(entity => {
    indexFileContent += `export * from '${entity.relativePath}'; \n`
  });


  return {
    classNames: [],
    fileContent: indexFileContent,
    outputPath: path.join(outputDir, 'index.ts'),
    relativePath: '',
    type: 'class'
  }
}