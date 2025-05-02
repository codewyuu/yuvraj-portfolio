
// All previous outputs from commands and such
let OutputsText = "";
// Lets user scroll through the past outputs
let ScrollOffset = 0;

// String to store the current text input
let InputText = "";
// Dictionary to store info about the text blinker
let Blinker = {Index: 0, Time: Date.now() * 0.001};

// Current directory
let Directory = "C:/Users/guest";

// Stores weather to render plasma or normal terminal
let DisplayPlasma = false;

// Function to give text for rendering
function GetText()
{
    // Text to be displayed
    let FinalText = "";

    if (Time < 5 || OutputsText.split("\n").length < 19) // If in boot sequence
    {
        BootSequence();
        FinalText = OutputsText;
    }

    else if (!DisplayPlasma) // If not in boot sequence
    {
        // Trim the previous output to be displayed
        let Lines = OutputsText.split("\n");
        FinalText += Lines.slice(ScrollOffset, Math.min(ScrollOffset + 30, Lines.length)).join("\n");

        // Check if command input is on screen
        if (ScrollOffset + 30 >= Lines.length)
        {
            if ((Date.now() * 0.001 - Blinker.Time) % 1 < 0.5) // Show blinker
            {
                FinalText += `${Directory}> ${InputText.slice(0, Blinker.Index)}█${InputText.slice(Blinker.Index + 1, InputText.length)}`;
            }

            else // Dont show blinker
            {
                FinalText += `${Directory}> ${InputText}`;
            }
        }
    }

    else
    {
        return GetTextPlasma();
    }

    return FinalText;
}

// Function to handle key press and text input
function KeyPressed(key)
{
    if (DisplayPlasma)
    {
        if (key === "Escape")
        {
            DisplayPlasma = false;
        }
    }

    else if (Time > 5)
    {
        let LinesCount = OutputsText.split("\n").length;

        if (key.length === 1 && InputText.length + Directory.length + 3 < 55) // Add character
        {
            InputText = InputText.slice(0, Blinker.Index) + key.toLowerCase() + InputText.slice(Blinker.Index, InputText.length);
            Blinker = {Index: Blinker.Index + 1, Time: Date.now() * 0.001}; // Update blinker pos and reset its time
            if (ScrollOffset < LinesCount - 30) {ScrollOffset = Math.max(0, LinesCount - 30);} // Reset the scroll if off screen
        }
        
        else if (key === "Backspace" && InputText && Blinker.Index > 0) // Remove character
        {
            InputText = InputText.slice(0, Blinker.Index - 1) + InputText.slice(Blinker.Index, InputText.length);
            Blinker = {Index: Blinker.Index - 1, Time: Date.now() * 0.001}; // Update blinker pos and reset its time
            if (ScrollOffset < LinesCount - 30) {ScrollOffset = Math.max(0, LinesCount - 30);} // Reset the scroll if off screen
        }

        else if (key === "ArrowLeft") // Move blinker left
        {
            Blinker = {Index: Math.max(0, Blinker.Index - 1), Time: Date.now() * 0.001};
        }

        else if (key === "ArrowRight") // Move blinker right
        {
            Blinker = {Index: Math.min(InputText.length, Blinker.Index + 1), Time: Date.now() * 0.001};
        }

        else if (key === "ArrowUp") // Scroll text upwards
        {
            ScrollOffset = Math.max(0, ScrollOffset - 1);
        }

        else if (key === "ArrowDown") // Scroll text downwards
        {
            ScrollOffset = Math.min(LinesCount - 1, ScrollOffset + 1);
        }

        else if (key === "Tab") // Auto complete
        {
            AutoComplete(); // Complete input text
            Blinker = {Index: InputText.length, Time: Date.now() * 0.001}; // Update blinker pos and reset its time
            if (ScrollOffset < LinesCount - 30) {ScrollOffset = Math.max(0, LinesCount - 30);} // Reset the scroll if off screen
        }

        else if (key === "Enter") // Submit text
        {
            OutputsText += `${Directory}> ${InputText}\n`;
            ExecuteCommand();

            InputText = "";
            Blinker = {Index: 0, Time: Date.now() * 0.001};

            LinesCount = OutputsText.split("\n").length;
            if (ScrollOffset < LinesCount - 30) {ScrollOffset = Math.max(0, LinesCount - 30);}
        }
    }
}

function BootSequence()
{
    OutputsText = "";
    let LoadingChars = ["-", "\\", "|", "/"];

    if (Time > 0.1) {OutputsText += "██╗   ██╗██╗   ██╗██╗   ██╗██╗   ██╗\n";}
    if (Time > 0.2) {OutputsText += "╚██╗ ██╔╝██║   ██║██║   ██║╚██╗ ██╔╝\n";}
    if (Time > 0.3) {OutputsText += " ╚████╔╝ ██║   ██║██║   ██║ ╚████╔╝ \n";}
    if (Time > 0.4) {OutputsText += "  ╚██╔╝  ██║   ██║╚██╗ ██╔╝  ╚██╔╝  \n";}
    if (Time > 0.5) {OutputsText += "   ██║   ╚██████╔╝ ╚████╔╝    ██║   \n";}
    if (Time > 0.6) {OutputsText += "   ╚═╝    ╚═════╝   ╚═══╝     ╚═╝   \n\n\n";}
    if (Time > 1.1) {OutputsText += "Welcome to yuvy//cli 2.9.0 x86_64\n";}
    if (Time > 1.2) {OutputsText += "Type 'help' to list available commands\n\n\n";}
    if (Time > 1.7) {OutputsText += `Loading ${LoadingChars[Math.ceil((Math.min(3.7, Time) % 0.4) / 0.1) - 1]} ${Math.ceil(Math.min(100, (Time - 1.7) / 0.02))}%\n`;}
    if (Time > 3.7) {OutputsText += ".\n";}
    if (Time > 3.8) {OutputsText += ".\n";}
    if (Time > 3.9) {OutputsText += ".\n";}
    if (Time > 4.0) {OutputsText += "Complete!\n\n";}

    ScrollOffset = Math.min(OutputsText.split("\n").length - 1, ScrollOffset);
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

// File system structure with information about Yuvraj and his website
const FileSystem = {
    "root": {type: "directory", contents: {
        "info.txt": {type: "file", content: "ABOUT YUVRAJ SHARMA\n=================\n\nComputer Science and Engineering undergraduate at\nDr. APJ Abdul Kalam Technical University (AKTU).\n\nPassionate about software development with skills in\nfrontend development, graphic design, and AI.\n\nContact: 9650297776 | codewyuu@gmail.com\nLinkedIn: linkedin.com/in/knowasyuvraj/"},
        "projects.txt": {type: "file", content: "PROJECTS\n========\n\n1. CURSLATE - A Cursor translation tool\n   - Chrome extension with 40% faster translations\n   - Supports 10+ major languages with auto-detection\n   - Responsive UI with customizable settings\n   - Duration: Feb 2025 - Present\n\n2. YUVV - A locally hosted password manager\n   - Secure system using Python, Flask, and Cryptography\n   - Interactive web interface for password management\n   - Implemented error handling and CSV-based storage\n   - Duration: Sept 2024 - Dec 2024"},
        "skills.txt": {type: "file", content: "SKILLS\n======\n\nLANGUAGES AND DATABASES:\n- C/C++, Python, HTML, CSS, JavaScript\n- Pandas, Numpy, SQL, MySQL\n\nVISUALIZATION TOOLS:\n- Tableau, Power BI\n\nOTHER SKILLS:\n- AI prompting, Debugging, Deployment\n- Graphic Design, Ms-Office\n- Videography, Video editing\n\nLANGUAGES:\n- English, Hindi, Japanese"},
        "experience.txt": {type: "file", content: "EXPERIENCE\n==========\n\nPALLETS | Frontend developer, Core member, Co-founder\nMar 2025 - Present | Delhi, India\n- Created landing pages and dynamic websites for hackathons\n- Developed website for 'veryoww' that won XLRB 2025 hackathon\n\nSPIC | Graphic Designer, Core member\nOct 2024 - Present | Delhi, India\n- Created designs for upcoming events\n\nSTHAPATYA | Graphic Designer, Core member\nOct 2024 - Jan 2024 | Delhi, India\n- Created designs for upcoming events\n- Created video teaser for 'Smart-Site Sprint' event"},
        "education.txt": {type: "file", content: "EDUCATION\n=========\n\nDr. APJ Abdul Kalam Technical University\nBachelor of Technology in Computer Science and Engineering\nSept 2023 - Present | Delhi, India\n\nACHIEVEMENTS:\n- XLR8 2025 Hackathon winners held at\n  Sri Venkateswara College, Delhi University"},
        "contact.txt": {type: "file", content: "CONTACT\n=======\n\nPHONE: 9650297776\nEMAIL: codewyuu@gmail.com\nLINKEDIN: linkedin.com/in/knowasyuvraj/\nGITHUB: github.com/codewyuu\nTWITTER: x.com/codewyuu\nINSTAGRAM: instagram.com/yxs20_/\nYOUTUBE: youtube.com/@yuudesu"},
        "help.txt": {type: "file", content: "AVAILABLE COMMANDS\n=================\n\nls        - List files in current directory\ncat       - Display file contents (e.g., 'cat info.txt')\nclear     - Clear terminal screen\nback      - Return to main website\nboot      - Restart terminal\nmute      - Toggle audio on/off\nhelp      - Show this help message"},
        "plasma.exe": {type: "executable", content: "plasma"}
    }}
};

function ListFiles()
{
    // Move to current folder
    let DirectoryContents = FileSystem.root;
    for (let Dir of Directory.slice(15).split("/").filter(Boolean)) {DirectoryContents = DirectoryContents.contents[Dir];}

    // Print directory being listed
    OutputsText += `\nC:/../${Directory.split("/").slice(-1)}`;

    // Print each file
    const Files = Object.keys(DirectoryContents.contents);
    for (let [Index, File] of Files.entries()) {OutputsText += `\n${Index == Files.length - 1 ? "┗" : "┣"}${File.includes(".") ? "━▷" : "━━━━"} ${File}`;}

    OutputsText += "\n\n";
}

function ChangeDirectory(InputDirectory)
{
    let CurrentDirectory = Directory.slice(15).split("/").filter(Boolean);

    // Go back a folder
    if (InputDirectory === "..") {CurrentDirectory.pop();}
    
    // Return to root folder
    else if (InputDirectory === "/") {CurrentDirectory = [];}
    
    // Move to new folder
    else
    {
        // Move to current folder
        let DirectoryContents = FileSystem.root;
        for (let Dir of CurrentDirectory) {DirectoryContents = DirectoryContents.contents[Dir];}

        // Add new folder to path
        if (DirectoryContents.contents[InputDirectory] && DirectoryContents.contents[InputDirectory].type === "directory")
        {CurrentDirectory.push(InputDirectory);}
        
        // Desired path dousnt exist
        else {OutputsText += `\ncd: '${InputDirectory}' No such directory\n\n`;return;}
    }

    Directory = `C:/Users/guest${CurrentDirectory.length ? "/" : ""}${CurrentDirectory.join("/")}`;
}

function StartFile(InputFile)
{
    // Move to current folder
    let DirectoryContents = FileSystem.root;
    for (let Dir of Directory.slice(15).split("/").filter(Boolean)) {DirectoryContents = DirectoryContents.contents[Dir];}

    // Perform action based on what file is opened
    if (DirectoryContents.contents[InputFile] && DirectoryContents.contents[InputFile].type === "file")
    {
        OutputsText += `\n${DirectoryContents.contents[InputFile].content}\n\n`;
    }

    else if (DirectoryContents.contents[InputFile] && DirectoryContents.contents[InputFile].type === "link")
    {
        OutputsText += `\nRedirecting to '${DirectoryContents.contents[InputFile].content}'\n\n`;
        window.open(DirectoryContents.contents[InputFile].content);
    }

    else if (DirectoryContents.contents[InputFile] && DirectoryContents.contents[InputFile].type === "executable")
    {
        OutputsText += `\n'${InputFile}' Started successfully\n\n`;
        DisplayPlasma = true;
    }
    
    // Selected file dousnt exist
    else {OutputsText += `\nstart: '${InputFile}' No such file\n\n`;}
}

// Modified ExecuteCommand function
function ExecuteCommand()
{
    const [Command, ...Arguments] = InputText.split(" ");

    if (Command)
    {
        ComputerBeep.play();
        ComputerBeep.currentTime = 0;
    }

    switch (Command)
    {
        case "ls":
            if (Arguments.length) {OutputsText += "\nError: 'ls' doesn't accept any arguments\n\n";}
            else {ListFiles();}
            break;

        case "cd":
            if (Arguments.length > 1) {OutputsText += "\nError: 'cd' doesn't accept more that one argument\n\n";}
            else {ChangeDirectory(Arguments[0]);}
            break;

        case "cat":
            if (Arguments.length !== 1) {OutputsText += "\nError: 'cat' requires exactly one argument\n\n";}
            else {StartFile(Arguments[0]);}
            break;

        case "start":
            if (Arguments.length > 1) {OutputsText += "\nError: 'start' doesn't accept more that one argument\n\n";}
            else {StartFile(Arguments[0]);}
            break;

        case "clear":
            if (Arguments.length) {OutputsText += "\nError: 'clear' doesn't accept any arguments\n\n";}
            else {BootSequence();}
            break;

        case "help":
            if (Arguments.length) {OutputsText += "\nError: 'help' doesn't accept any arguments\n\n";}
            else {OutputsText += "\nWELCOME TO YUVY//CLI\n=================\n\nBASIC COMMANDS:\n\nls        - List files in current directory\ncat       - Display file contents (e.g., 'cat info.txt')\nclear     - Clear terminal screen\nback      - Return to main website\nboot      - Restart terminal\nmute      - Toggle audio on/off\nhelp      - Show this help message\n\nAVAILABLE FILES:\n\ninfo.txt       - About Yuvraj Sharma\nprojects.txt   - My projects and portfolio\nskills.txt     - Technical skills and expertise\nexperience.txt - Work experience and education\ncontact.txt    - Contact information\nhelp.txt       - List of available commands\n\nTip: Try 'cat info.txt' to learn about me!\n\n";}
            break;

        case "back":
            if (Arguments.length) {OutputsText += "\nError: 'back' doesn't accept any arguments\n\n";}
            else {
                OutputsText += "\nReturning to main website...\n\n";
                // Add a small delay before redirecting
                setTimeout(() => {
                    window.location.href = "../index.html";
                }, 1000);
            }
            break;

        case "boot":
            if (Arguments.length) {OutputsText += "\nError: 'boot' doesn't accept any arguments\n\n";}
            else {
                // Play boot sound
                ComputerBoot.currentTime = 0;
                ComputerBoot.play();
                // Reset terminal state
                OutputsText = "";
                ScrollOffset = 0;
                InputText = "";
                Blinker = {Index: 0, Time: Date.now() * 0.001};
                // Force boot sequence
                Time = 0;
            }
            break;

        case "mute":
            if (Arguments.length) {OutputsText += "\nError: 'mute' doesn't accept any arguments\n\n";}
            else {
                // Toggle mute state for all audio elements
                const audioElements = [ComputerBoot, ComputerAmbient, ComputerBeep, KeyboardPressed];
                const isMuted = ComputerAmbient.muted;
                
                audioElements.forEach(audio => {
                    audio.muted = !isMuted;
                });
                
                OutputsText += `\nAudio ${!isMuted ? "muted" : "unmuted"}\n\n`;
            }
            break;

        case "":
            break;

        default:
            OutputsText += `\nCommand not found '${Command}'\n\n`;
    }
}
  
// Autocomplete function
function AutoComplete()
{
    const [Command, ...Arguments] = InputText.split(" ");
    const CommandsList = ["ls", "cd", "cat", "start", "clear", "help", "back", "boot", "mute"];
    
    // Auto completing a command
    if (!Arguments.length)
    {
        const CompletededCommand = CommandsList.filter(Element => Element.startsWith(Command));
        if (CompletededCommand.length) {InputText = CompletededCommand[0]};
    }
  
    // Auto comepleting a file name
    if (["cd", "start"].includes(Command) && Arguments.length < 2)
    {
        // Move to current folder
        let DirectoryContents = FileSystem.root;
        for (let Dir of Directory.slice(15).split("/").filter(Boolean)) {DirectoryContents = DirectoryContents.contents[Dir];}

        // Possible file names
        const PossibleCompletions = Object.keys(DirectoryContents.contents).filter(Item => Item.startsWith(Arguments));
        if (PossibleCompletions.length) {InputText = `${Command} ${PossibleCompletions[0]}`;}
    }
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

function GetTextPlasma()
{
    const Letters = [" ", "_", "a", "b", "c", "ö", "õ", "ö", "#", "$", "%", "1", "2", "3", "A", "B", "C"];
    let Text = "";

    for (let Row = 1; Row < 31; Row++)
    {
        for (let Col = 1; Col < 56; Col++)
        {
            const Intensity = GetIntensityPlasma(Row / 30, Col / 55);
            Text += Letters[Math.max(Math.min(Math.floor(Intensity) - 1, Letters.length - 1), 0)];
        }

        Text += "\n";
    }

    return Text
}

function GetIntensityPlasma(Row, Col)
{ 
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
