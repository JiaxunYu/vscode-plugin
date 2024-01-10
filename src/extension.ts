/*
 * @Author: yujiaxun
 * @Date: 2024-01-09 18:15:28
 * @LastEditTime: 2024-01-09 18:16:19
 * @Description: xxx
 */

// import * as vscode from 'vscode';
// import * as path from 'path';
// import * as os from 'os';
// import * as child_process from 'child_process';

// export function activate(context: vscode.ExtensionContext) {
//   let disposable = vscode.commands.registerCommand('my-extension.activate', () => {
//     const activeEditor = vscode.window.activeTextEditor;
//     if (activeEditor && activeEditor.document.languageId === 'python') {
//       const currentDocumentUri = activeEditor.document.uri;
//       const selectedWorkspaceFolder = vscode.workspace.getWorkspaceFolder(currentDocumentUri);
//       if (selectedWorkspaceFolder) {
//         const scriptPath = path.join(selectedWorkspaceFolder.uri.fsPath, 'update.sh');
//         child_process.execFile(scriptPath, (error, stdout, stderr) => {
//           if (error) {
//             vscode.window.showErrorMessage(`Failed to execute ${scriptPath}: ${error.message}`);
//           } else if (stderr) {
//             vscode.window.showErrorMessage(`Failed to execute ${scriptPath}: ${stderr}`);
//           } else {
//             vscode.window.showInformationMessage(`Executed ${scriptPath}: ${stdout}`);
//           }
//           //   vscode.window.showInformationMessage(selectedWorkspaceFolder.uri.fsPath);
//           // }

//         });
//       }
//     });

//   context.subscriptions.push(disposable);
// }

import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('my-extension.activate', function () {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const filePath = editor.document.fileName;
    if (!filePath.endsWith('.py')) {
      return;
    }

    const projectPath = vscode.workspace.workspaceFolders![0].uri.fsPath;
    const relativePath = path.relative(projectPath, filePath);
    const moduleName = relativePath.replace(/[\\/]/g, '.').slice(0, -3);

    vscode.env.clipboard.writeText(moduleName);
    vscode.window.showInformationMessage("update " + moduleName);
    const updateFilePath = path.join(projectPath, 'update');
    fs.appendFileSync(updateFilePath, moduleName + '\n');
  });

  context.subscriptions.push(disposable);
}