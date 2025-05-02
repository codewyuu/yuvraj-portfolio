// 3D Terminal Implementation

// Global variables
let Canvas = document.getElementById('Canvas3D');
let WebGL = Canvas.getContext('webgl2');
let Time = 0;
let IsMuted = false;

// Terminal variables
let OutputsText = "";
let ScrollOffset = 0;
let InputText = "";
let Blinker = {Index: 0, Time: Date.now() * 0.001};
let Directory = "C:/Users/guest";
let DisplayPlasma = false;

// Audio elements
const ComputerBoot = document.getElementById('ComputerBoot');
const ComputerAmbient = document.getElementById('ComputerAmbient');
const ComputerBeep = document.getElementById('ComputerBeep');
const KeyboardPressed = document.getElementById('KeyboardPressed');

// DOM elements
const terminalContent = document.getElementById('terminal-content');
const bootBtn = document.getElementById('boot-btn');
const clearBtn = document.getElementById('clear-btn');
const helpBtn = document.getElementById('help-btn');
const muteBtn = document.getElementById('mute-btn');
const mouseGlow = document.getElementById('MouseGlow');
const mouseGlowBlur = document.getElementById('MouseGlowBlur');
const clock = document.getElementById('clock');

// File system structure
const FileSystem = {
    "root": {type: "directory", contents: {
        "projects": {type: "directory", contents: {
            "lighting_engine.lnk": {type: "link", content: "https://github.com/LuckeyDuckey/Pygame_Lighting_Engine"},
            "wakeword_engine.lnk": {type: "link", content: "https://github.com/LuckeyDuckey/Python-Wake-Word-Engine"},
            "square_game.lnk": {type: "link", content: "https://github.com/LuckeyDuckey/Square-Game-Halloween"},
            "personal_website.lnk": {type: "link", content: "https://github.com/LuckeyDuckey/luckeyduckey.github.io"},
            "password_vault.lnk": {type: "link", content: "#"},
            "jarvis.lnk": {type: "link", content: "#"},
        }},
        "documents": {type: "directory", contents: {
            "readme.txt": {type: "file", content: "Welcome to the 3D Terminal!\n\nThis terminal is a WebGL2 implementation with sound effects.\n\nType 'help' to see available commands.\n\nEnjoy exploring!"},
            "about.txt": {type: "file", content: "This 3D terminal was created by integrating the luckeyduckey WebGL2 implementation with Yuvraj's portfolio.\n\nThe terminal features a 3D background, sound effects, and a command-line interface."}
        }},
        "plasma.exe": {type: "executable", content: "plasma"},
    }},
};

// Initialize the terminal
document.addEventListener('DOMContentLoaded', function() {
    // Set up canvas
    ResizeCanvasToDisplaySize(Canvas);
    
    // Set up event listeners
    window.addEventListener('resize', function() {
        ResizeCanvasToDisplaySize(Canvas);
    });
    
    document.addEventListener('keydown', function(event) {
        KeyPressed(event.key);
    });
    
    document.addEventListener('mousemove', function(event) {
        mouseGlow.style.left = (event.clientX - 10) + 'px';
        mouseGlow.style.top = (event.clientY - 10) + 'px';
        mouseGlowBlur.style.left = (event.clientX - 20) + 'px';
        mouseGlowBlur.style.top = (event.clientY - 20) + 'px';
    });
    
    // Button event listeners
    bootBtn.addEventListener('click', function() {
        BootSequence();
        if (!IsMuted) {
            ComputerBoot.play();
        }
    });
    
    clearBtn.addEventListener('click', function() {
        OutputsText = "";
        UpdateTerminalContent();
        if (!IsMuted) {
            ComputerBeep.play();
        }
    });
    
    helpBtn.addEventListener('click', function() {
        OutputsText += "\nPress 'tab' for auto complete and press 'esc' to exit\na program (.exe file)\n\nLS       Lists current directory contents\nCD       Change directory, '..' moves back, '/' to root\nSTART    Opens specified file in current directory\nCLEAR    Clears all previous terminal outputs\nCAT      Display the contents of a file\n\n";
        UpdateTerminalContent();
        if (!IsMuted) {
            ComputerBeep.play();
        }
    });
    
    muteBtn.addEventListener('click', function() {
        IsMuted = !IsMuted;
        muteBtn.innerHTML = IsMuted ? 'Unmute' : 'Mute';
        
        if (IsMuted) {
            ComputerAmbient.pause();
        } else {
            ComputerAmbient.play();
        }
    });
    
    // Initialize the terminal
    BootSequence();
    
    // Start the animation loop
    requestAnimationFrame(Animate);
    
    // Update the clock
    setInterval(updateClock, 1000);
});

// Function to update the clock
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    clock.textContent = `${hours}:${minutes}:${seconds}`;
}

// Function to resize the canvas
function ResizeCanvasToDisplaySize(Canvas) {
    const DisplayWidth = window.innerWidth;
    const DisplayHeight = window.innerHeight;

    if (Canvas.width !== DisplayWidth || Canvas.height !== DisplayHeight) {
        Canvas.width = DisplayWidth;
        Canvas.height = DisplayHeight;

        WebGL.viewport(0, 0, DisplayWidth, DisplayHeight);
    }
}

// Animation loop
function Animate() {
    Time = Date.now() * 0.001;
    
    // Clear the canvas
    WebGL.clearColor(0.05, 0.05, 0.05, 1.0);
    WebGL.clear(WebGL.COLOR_BUFFER_BIT | WebGL.DEPTH_BUFFER_BIT);
    
    // Update the terminal content
    UpdateTerminalContent();
    
    // Continue the animation loop
    requestAnimationFrame(Animate);
}

// Function to update the terminal content
function UpdateTerminalContent() {
    terminalContent.textContent = GetText();
}

// Function to give text for rendering
function GetText() {
    // Text to be displayed
    let FinalText = "";

    if (Time < 5 || OutputsText.split("\n").length < 19) { // If in boot sequence
        BootSequence();
        FinalText = OutputsText;
    } else if (!DisplayPlasma) { // If not in boot sequence
        // Trim the previous output to be displayed
        let Lines = OutputsText.split("\n");
        FinalText += Lines.slice(ScrollOffset, Math.min(ScrollOffset + 30, Lines.length)).join("\n");

        // Check if command input is on screen
        if (ScrollOffset + 30 >= Lines.length) {
            if ((Date.now() * 0.001 - Blinker.Time) % 1 < 0.5) { // Show blinker
                FinalText += `${Directory}> ${InputText.slice(0, Blinker.Index)}█${InputText.slice(Blinker.Index + 1, InputText.length)}`;
            } else { // Dont show blinker
                FinalText += `${Directory}> ${InputText}`;
            }
        }
    } else {
        return GetTextPlasma();
    }

    return FinalText;
}

// Function to handle key press and text input
function KeyPressed(key) {
    if (DisplayPlasma) {
        if (key === "Escape") {
            DisplayPlasma = false;
        }
    } else if (Time > 5) {
        let LinesCount = OutputsText.split("\n").length;

        if (key.length === 1 && InputText.length + Directory.length + 3 < 55) { // Add character
            InputText = InputText.slice(0, Blinker.Index) + key.toLowerCase() + InputText.slice(Blinker.Index, InputText.length);
            Blinker = {Index: Blinker.Index + 1, Time: Date.now() * 0.001}; // Update blinker pos and reset its time
            if (ScrollOffset < LinesCount - 30) {ScrollOffset = Math.max(0, LinesCount - 30);} // Reset the scroll if off screen
            
            if (!IsMuted) {
                KeyboardPressed.currentTime = 0;
                KeyboardPressed.play();
            }
        } else if (key === "Backspace" && InputText && Blinker.Index > 0) { // Remove character
            InputText = InputText.slice(0, Blinker.Index - 1) + InputText.slice(Blinker.Index, InputText.length);
            Blinker = {Index: Blinker.Index - 1, Time: Date.now() * 0.001}; // Update blinker pos and reset its time
            if (ScrollOffset < LinesCount - 30) {ScrollOffset = Math.max(0, LinesCount - 30);} // Reset the scroll if off screen
            
            if (!IsMuted) {
                KeyboardPressed.currentTime = 0;
                KeyboardPressed.play();
            }
        } else if (key === "ArrowLeft") { // Move blinker left
            Blinker = {Index: Math.max(0, Blinker.Index - 1), Time: Date.now() * 0.001};
        } else if (key === "ArrowRight") { // Move blinker right
            Blinker = {Index: Math.min(InputText.length, Blinker.Index + 1), Time: Date.now() * 0.001};
        } else if (key === "ArrowUp") { // Scroll text upwards
            ScrollOffset = Math.max(0, ScrollOffset - 1);
        } else if (key === "ArrowDown") { // Scroll text downwards
            ScrollOffset = Math.min(LinesCount - 1, ScrollOffset + 1);
        } else if (key === "Tab") { // Auto complete
            AutoComplete(); // Complete input text
            Blinker = {Index: InputText.length, Time: Date.now() * 0.001}; // Update blinker pos and reset its time
            if (ScrollOffset < LinesCount - 30) {ScrollOffset = Math.max(0, LinesCount - 30);} // Reset the scroll if off screen
        } else if (key === "Enter") { // Submit text
            OutputsText += `${Directory}> ${InputText}\n`;
            ExecuteCommand();
            InputText = "";
            Blinker = {Index: 0, Time: Date.now() * 0.001};
            ScrollOffset = Math.max(0, OutputsText.split("\n").length - 30);
        }
    }
}

// Boot sequence function
function BootSequence() {
    OutputsText = "TERMINAL BOOT SEQUENCE INITIATED...\n";
    OutputsText += "LOADING SYSTEM FILES...\n";
    OutputsText += "INITIALIZING MEMORY...\n";
    OutputsText += "CHECKING HARDWARE...\n";
    OutputsText += "LOADING USER INTERFACE...\n";
    OutputsText += "ESTABLISHING CONNECTION...\n";
    OutputsText += "SYSTEM READY.\n\n";
    OutputsText += "Welcome to the 3D Terminal!\n";
    OutputsText += "Type 'help' for a list of available commands.\n\n";
    
    if (!IsMuted) {
        ComputerBoot.play();
        ComputerAmbient.play();
    }
}

// Function to list files in the current directory
function ListFiles() {
    // Move to current folder
    let DirectoryContents = FileSystem.root;
    for (let Dir of Directory.slice(15).split("/").filter(Boolean)) {
        DirectoryContents = DirectoryContents.contents[Dir];
    }

    // Print all files in current folder
    OutputsText += "\n";
    for (let FileName in DirectoryContents.contents) {
        const FileType = DirectoryContents.contents[FileName].type;
        if (FileType === "directory") {
            OutputsText += `${FileName}/\n`;
        } else {
            OutputsText += `${FileName}\n`;
        }
    }
    OutputsText += "\n";
}

// Function to change directory
function ChangeDirectory(InputDirectory) {
    if (!InputDirectory) {
        OutputsText += `\nCurrent directory: ${Directory}\n\n`;
        return;
    }

    // If going to root
    if (InputDirectory === "/") {
        Directory = "C:/Users/guest";
        OutputsText += "\n";
        return;
    }

    // If going back
    if (InputDirectory === "..") {
        const Dirs = Directory.split("/");
        if (Dirs.length > 3) {
            Dirs.pop();
            Directory = Dirs.join("/");
        }
        OutputsText += "\n";
        return;
    }

    // Move to current folder
    let DirectoryContents = FileSystem.root;
    for (let Dir of Directory.slice(15).split("/").filter(Boolean)) {
        DirectoryContents = DirectoryContents.contents[Dir];
    }

    // Check if directory exists
    if (DirectoryContents.contents[InputDirectory] && DirectoryContents.contents[InputDirectory].type === "directory") {
        Directory += "/" + InputDirectory;
        OutputsText += "\n";
    } else {
        OutputsText += `\nDirectory not found: ${InputDirectory}\n\n`;
    }
}

// Function to start a file
function StartFile(InputFile) {
    if (!InputFile) {
        OutputsText += "\nError: No file specified\n\n";
        return;
    }

    // Move to current folder
    let DirectoryContents = FileSystem.root;
    for (let Dir of Directory.slice(15).split("/").filter(Boolean)) {
        DirectoryContents = DirectoryContents.contents[Dir];
    }

    // Check if file exists
    if (DirectoryContents.contents[InputFile]) {
        const FileType = DirectoryContents.contents[InputFile].type;
        const FileContent = DirectoryContents.contents[InputFile].content;

        if (FileType === "link") {
            OutputsText += `\nOpening link: ${InputFile}\n\n`;
            window.open(FileContent, "_blank");
        } else if (FileType === "executable") {
            if (FileContent === "plasma") {
                OutputsText += "\nStarting plasma visualization...\n\nPress ESC to exit\n\n";
                DisplayPlasma = true;
            }
        } else {
            OutputsText += `\nCannot execute: ${InputFile}\n\n`;
        }
    } else {
        OutputsText += `\nFile not found: ${InputFile}\n\n`;
    }
}

// Function to display file contents
function CatFile(InputFile) {
    if (!InputFile) {
        OutputsText += "\nError: No file specified\n\n";
        return;
    }

    // Move to current folder
    let DirectoryContents = FileSystem.root;
    for (let Dir of Directory.slice(15).split("/").filter(Boolean)) {
        DirectoryContents = DirectoryContents.contents[Dir];
    }

    // Check if file exists
    if (DirectoryContents.contents[InputFile]) {
        const FileType = DirectoryContents.contents[InputFile].type;
        const FileContent = DirectoryContents.contents[InputFile].content;

        if (FileType === "file") {
            OutputsText += `\n${FileContent}\n\n`;
        } else {
            OutputsText += `\nCannot display contents of: ${InputFile}\n\n`;
        }
    } else {
        OutputsText += `\nFile not found: ${InputFile}\n\n`;
    }
}

// Function to execute commands
function ExecuteCommand() {
    const [Command, ...Arguments] = InputText.split(" ");

    if (Command && !IsMuted) {
        ComputerBeep.play();
        ComputerBeep.currentTime = 0;
    }

    switch (Command) {
        case "ls":
            if (Arguments.length) {
                OutputsText += "\nError: 'ls' doesn't accept any arguments\n\n";
            } else {
                ListFiles();
            }
            break;

        case "cd":
            if (Arguments.length > 1) {
                OutputsText += "\nError: 'cd' doesn't accept more than one argument\n\n";
            } else {
                ChangeDirectory(Arguments[0]);
            }
            break;

        case "start":
            if (Arguments.length > 1) {
                OutputsText += "\nError: 'start' doesn't accept more than one argument\n\n";
            } else {
                StartFile(Arguments[0]);
            }
            break;

        case "cat":
            if (Arguments.length > 1) {
                OutputsText += "\nError: 'cat' doesn't accept more than one argument\n\n";
            } else {
                CatFile(Arguments[0]);
            }
            break;

        case "clear":
            if (Arguments.length) {
                OutputsText += "\nError: 'clear' doesn't accept any arguments\n\n";
            } else {
                BootSequence();
            }
            break;

        case "help":
            if (Arguments.length) {
                OutputsText += "\nError: 'help' doesn't accept any arguments\n\n";
            } else {
                OutputsText += "\nPress 'tab' for auto complete and press 'esc' to exit\na program (.exe file)\n\nLS       Lists current directory contents\nCD       Change directory, '..' moves back, '/' to root\nSTART    Opens specified file in current directory\nCLEAR    Clears all previous terminal outputs\nCAT      Display the contents of a file\n\n";
            }
            break;

        case "":
            break;

        default:
            OutputsText += `\nCommand not found: '${Command}'\n\n`;
    }
}

// Autocomplete function
function AutoComplete() {
    const [Command, ...Arguments] = InputText.split(" ");
    const CommandsList = ["ls", "cd", "start", "clear", "help", "cat"];
    
    // Auto completing a command
    if (!Arguments.length) {
        const CompletedCommand = CommandsList.filter(Element => Element.startsWith(Command));
        if (CompletedCommand.length) {
            InputText = CompletedCommand[0];
        }
    }
  
    // Auto completing a file name
    if (["cd", "start", "cat"].includes(Command) && Arguments.length < 2) {
        // Move to current folder
        let DirectoryContents = FileSystem.root;
        for (let Dir of Directory.slice(15).split("/").filter(Boolean)) {
            DirectoryContents = DirectoryContents.contents[Dir];
        }

        // Possible file names
        const Arg = Arguments[0] || "";
        const PossibleCompletions = Object.keys(DirectoryContents.contents).filter(Item => Item.startsWith(Arg));
        if (PossibleCompletions.length) {
            InputText = `${Command} ${PossibleCompletions[0]}`;
        }
    }
}

// Function to generate plasma text
function GetTextPlasma() {
    const Letters = [" ", "_", "a", "b", "c", "ö", "õ", "ö", "#", "$", "%", "1", "2", "3", "A", "B", "C"];
    let Text = "";

    for (let Row = 1; Row < 31; Row++) {
        for (let Col = 1; Col < 56; Col++) {
            const Intensity = GetIntensityPlasma(Row / 30, Col / 55);
            Text += Letters[Math.max(Math.min(Math.floor(Intensity) - 1, Letters.length - 1), 0)];
        }

        Text += "\n";
    }

    return Text;
}

// Function to calculate plasma intensity
function GetIntensityPlasma(Row, Col) { 
    let Intensity = 0.0;

    Intensity += 0.7 * Math.sin(0.5 * Row + Time / 5);
    Intensity += 3 * Math.sin(1.6 * Col + Time / 5);
    Intensity += 1 * Math.sin(10 * (Col * Math.sin(Time / 2) + Row * Math.cos(Time / 5)) + Time / 2);

    const CyclicX = Row + 0.5 * Math.sin(Time / 2);
    const CyclicY = Col + 0.5 * Math.cos(Time / 4);

    Intensity += 0.4 * Math.sin(Math.sqrt(100 * CyclicX ** 2 + 100 * CyclicY ** 2 + 1) + Time);
    Intensity += 0.9 * Math.sin(Math.sqrt(75 * CyclicX ** 2 + 25 * CyclicY ** 2 + 1) + Time);
    Intensity += -1.4 * Math.sin(Math.sqrt(256 * CyclicX ** 2 + 25 * CyclicY ** 2 + 1) + Time);
    Intensity += 0.3 * Math.sin(0.5 * Col + Row + Math.sin(Time));

    return 17 * (0.5 + 0.499 * Math.sin(Intensity)) * (0.7 + Math.sin(Time) * 0.3);
}
