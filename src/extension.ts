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
                const complexityResult = await analyzeComplexity(code);

                // Extract the most complex function name from the result
                const match = complexityResult.match(/Most Complex Function: (.+)/);
                const mostComplexFunction = match ? match[1].trim() : null;

                // Display the result in an information message
                vscode.window.showInformationMessage(`${complexityResult}`);

                if (mostComplexFunction) {
                    // Highlight the most complex function
                    const regex = new RegExp(`function\\s+${mostComplexFunction}\\s*\\(`, 'g');
                    const decorationType = vscode.window.createTextEditorDecorationType({
                        backgroundColor: 'rgba(255,0,0,0.3)',
                    });

                    const ranges: vscode.DecorationOptions[] = [];
                    for (let match; (match = regex.exec(code)); ) {
                        const startPos = editor.document.positionAt(match.index);
                        const endPos = editor.document.positionAt(
                            match.index + match[0].length
                        );
                        ranges.push({ range: new vscode.Range(startPos, endPos) });
                    }

                    editor.setDecorations(decorationType, ranges);

                    // Remove the decoration after a timeout
                    setTimeout(() => {
                        editor.setDecorations(decorationType, []);
                    }, 10000);
                } else {
                    vscode.window.showWarningMessage(
                        'Could not identify the most complex function.'
                    );
                }
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
