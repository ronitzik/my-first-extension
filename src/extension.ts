import * as vscode from 'vscode';
import { analyzeComplexity } from './openaiHelper';

export function activate(context: vscode.ExtensionContext) {
    // Register the command to analyze code complexity
    let disposable = vscode.commands.registerCommand('extension.analyzeComplexity', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const code = editor.document.getText();

            // Show a loading message
            vscode.window.setStatusBarMessage('Calculating code complexity...', 5000);

            try {
                const complexity = await analyzeComplexity(code);

                // Display the result in an information message
                vscode.window.showInformationMessage(`${complexity}`);

                // Optionally display in status bar
                const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
                statusBar.text = `Complexity: ${complexity}`;
                statusBar.show();

                setTimeout(() => statusBar.dispose(), 10000);
            } catch (error) {
                // Safely handle the error by typecasting to `Error`
                if (error instanceof Error) {
                    vscode.window.showErrorMessage(`Error: ${error.message}`);
                } else {
                    vscode.window.showErrorMessage('An unknown error occurred.');
                }
            }
        } else {
            vscode.window.showWarningMessage('No active editor found. Open a file to analyze its complexity.');
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
