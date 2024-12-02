# Code Complexity Analyzer
The **Code Complexity Analyzer** is a VS Code extension designed to help developers understand and improve their code by analyzing its complexity usint OpenAi API calls.
The extension identifies the most complex function in a file, provides optimization suggestions, and highlights the function directly in the editor for easy identification.
## The Output
![image](https://github.com/user-attachments/assets/762e4245-274d-4908-a4b9-d3bcbbe76a28)

## Features

- **Analyze Code Complexity:**
  - Calculates the total time complexity of a file.
  - Identifies the most complex function in the code.
- **Optimization Suggestions:**
  - Provides actionable tips to improve the efficiency of the most complex function.
- **Visual Highlights:**
  - Highlights the most complex function in the editor for easy identification.
  
## Technologies Used
- **TypeScript**: The code is written in TypeScript.
- **Visual Studio Code API**: To interact with the VSCode environment, including commands, decorations, and settings.
- **OpenAI API**: To analyze code complexity and generate optimization tips.
- **Axios**: For making HTTP requests to the OpenAI API.
- **dotenv**: To securely manage environment variables, such as the OpenAI API key.

## Known Issues
- **Error Handling:** Ensure your API key is valid and set in the settings. Invalid keys or network issues may cause errors.
- **Large Files:** Performance might degrade for very large files due to API processing limits.
