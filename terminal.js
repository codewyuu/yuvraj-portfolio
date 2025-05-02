document.addEventListener('DOMContentLoaded', () => {
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const previewContent = document.getElementById('preview-content');
    const refreshPreviewBtn = document.getElementById('refresh-preview');
    const fullscreenPreviewBtn = document.getElementById('fullscreen-preview');
    
    // Command history functionality
    let commandHistory = [];
    let historyIndex = -1;
    
    // Available commands
    const commands = {
        goto: {
            description: 'Navigate directly to a page',
            execute: (args) => {
                if (!args || !args[0]) {
                    return { 
                        output: '<p class="output-text output-error">Please specify a page to navigate to. Available pages: home, gallery, content, resume</p>' 
                    };
                }
                
                const page = args[0].toLowerCase();
                let url = '';
                
                switch(page) {
                    case 'home':
                        url = './index.html';
                        break;
                    case 'gallery':
                        url = './gallery.html';
                        break;
                    case 'content':
                        url = './content.html';
                        break;
                    case 'resume':
                        url = './resume.html';
                        break;
                    default:
                        return { 
                            output: `<p class="output-text output-error">Page "${page}" not found. Available pages: home, gallery, content, resume</p>` 
                        };
                }
                
                const output = `<p class="output-text">Navigating to <span class="command">${page}</span> page...</p>`;
                
                // Redirect after a short delay
                setTimeout(() => {
                    window.location.href = url;
                }, 500);
                
                return { output };
            }
        },

        help: {
            description: 'Display available commands',
            execute: () => {
                let output = '<p class="output-text output-info">Available commands:</p>';
                Object.keys(commands).forEach(cmd => {
                    output += `<p class="output-text"><span class="command">${cmd}</span> - ${commands[cmd].description}</p>`;
                });
                return { output };
            }
        },
        clear: {
            description: 'Clear the terminal screen',
            execute: () => {
                terminalOutput.innerHTML = '';
                return { output: '' };
            }
        },
        about: {
            description: 'Display information about me',
            execute: () => {
                const output = `
                    <p class="output-text">Hi, I'm <span class="output-info">Yuvraj Sharma</span>!</p>
                    <p class="output-text">I'm a sophomore CSE undergrad at AKTU, currently residing in Delhi, India.</p>
                    <p class="output-text">I work as a Frontend developer and co-lead Pallets.</p>
                    <p class="output-text">In my spare time, I enjoy chess, content creation, and stargazing.</p>
                `;
                
                const preview = `
                    <div style="padding: 20px; text-align: center;">
                        <img src="images/train-window.jpg" alt="Yuvraj Sharma" class="preview-image" style="max-width: 300px; border-radius: 10px;">
                        <h2 style="margin-top: 20px; color: #3b82f6;">Yuvraj Sharma</h2>
                        <p style="margin-top: 10px; color: #aaa;">Frontend Developer | Content Creator</p>
                        <div style="margin-top: 20px; display: flex; justify-content: center; gap: 15px;">
                            <a href="https://github.com/codewyuu" target="_blank" style="color: #aaa; font-size: 24px;"><i class="fab fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/knowasyuvraj/" target="_blank" style="color: #aaa; font-size: 24px;"><i class="fab fa-linkedin"></i></a>
                            <a href="https://www.instagram.com/yxs20_/" target="_blank" style="color: #aaa; font-size: 24px;"><i class="fab fa-instagram"></i></a>
                        </div>
                    </div>
                `;
                
                return { output, preview };
            }
        },
        projects: {
            description: 'List my projects',
            execute: () => {
                const output = `
                    <p class="output-text output-info">My Projects:</p>
                    <p class="output-text">1. <span class="command">Portfolio Website</span> - Personal portfolio showcasing my work</p>
                    <p class="output-text">2. <span class="command">Pallets</span> - Co-leading this creative initiative</p>
                    <p class="output-text">3. <span class="command">Content Creation</span> - YouTube and social media content</p>
                    <p class="output-text">4. <span class="command">Photography</span> - Check out my gallery page</p>
                    <p class="output-text">Type <span class="command">project [number]</span> to see details about a specific project</p>
                `;
                
                return { output };
            }
        },
        project: {
            description: 'Show details about a specific project',
            execute: (args) => {
                if (!args || !args[0]) {
                    return { 
                        output: '<p class="output-text output-error">Please specify a project number. Example: project 1</p>' 
                    };
                }
                
                const projectNum = parseInt(args[0]);
                let output = '';
                let preview = '';
                
                switch(projectNum) {
                    case 1:
                        output = `
                            <p class="output-text output-info">Portfolio Website</p>
                            <p class="output-text">A personal portfolio website built with HTML, CSS, and JavaScript.</p>
                            <p class="output-text">Features include:</p>
                            <p class="output-text">- Responsive design</p>
                            <p class="output-text">- Dark/light mode</p>
                            <p class="output-text">- Interactive terminal</p>
                            <p class="output-text">- Gallery with filtering</p>
                        `;
                        preview = `
                            <div style="padding: 20px;">
                                <h2 style="color: #3b82f6; margin-bottom: 15px;">Portfolio Website</h2>
                                <img src="images/placeholder1.jpg" alt="Portfolio Preview" class="preview-image">
                                <div style="margin-top: 20px;">
                                    <p style="margin-bottom: 10px;">Technologies used:</p>
                                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                                        <span style="background: rgba(59, 130, 246, 0.2); padding: 5px 10px; border-radius: 4px;">HTML5</span>
                                        <span style="background: rgba(59, 130, 246, 0.2); padding: 5px 10px; border-radius: 4px;">CSS3</span>
                                        <span style="background: rgba(59, 130, 246, 0.2); padding: 5px 10px; border-radius: 4px;">JavaScript</span>
                                    </div>
                                </div>
                            </div>
                        `;
                        break;
                    case 2:
                        output = `
                            <p class="output-text output-info">Pallets</p>
                            <p class="output-text">Co-leading a creative initiative focused on design and development.</p>
                            <p class="output-text">Visit: <a href="https://www.instagram.com/palletsx4/" target="_blank" class="command">instagram.com/palletsx4</a></p>
                        `;
                        preview = `
                            <div style="padding: 20px; text-align: center;">
                                <h2 style="color: #3b82f6; margin-bottom: 15px;">Pallets</h2>
                                <img src="images/placeholder2.jpg" alt="Pallets Preview" class="preview-image">
                                <a href="https://www.instagram.com/palletsx4/" target="_blank" style="display: inline-block; margin-top: 20px; background: #3b82f6; color: white; padding: 10px 20px; border-radius: 4px; text-decoration: none;">Visit Instagram</a>
                            </div>
                        `;
                        break;
                    case 3:
                        output = `
                            <p class="output-text output-info">Content Creation</p>
                            <p class="output-text">Creating content for YouTube and other social media platforms.</p>
                            <p class="output-text">Visit: <a href="https://www.youtube.com/@yuudesu" target="_blank" class="command">youtube.com/@yuudesu</a></p>
                        `;
                        preview = `
                            <div style="padding: 20px; text-align: center;">
                                <h2 style="color: #3b82f6; margin-bottom: 15px;">Content Creation</h2>
                                <img src="images/placeholder3.jpg" alt="Content Creation Preview" class="preview-image">
                                <a href="https://www.youtube.com/@yuudesu" target="_blank" style="display: inline-block; margin-top: 20px; background: #ff0000; color: white; padding: 10px 20px; border-radius: 4px; text-decoration: none;">Visit YouTube</a>
                            </div>
                        `;
                        break;
                    case 4:
                        output = `
                            <p class="output-text output-info">Photography</p>
                            <p class="output-text">A collection of photographs taken during my travels and everyday life.</p>
                            <p class="output-text">Check out the <a href="./gallery.html" class="command">gallery page</a> to see more.</p>
                        `;
                        preview = `
                            <div style="padding: 20px; text-align: center;">
                                <h2 style="color: #3b82f6; margin-bottom: 15px;">Photography</h2>
                                <img src="images/train-window.jpg" alt="Photography Preview" class="preview-image">
                                <a href="./gallery.html" style="display: inline-block; margin-top: 20px; background: #3b82f6; color: white; padding: 10px 20px; border-radius: 4px; text-decoration: none;">View Gallery</a>
                            </div>
                        `;
                        break;
                    default:
                        return { 
                            output: `<p class="output-text output-error">Project ${projectNum} not found. Available projects are numbered 1-4.</p>` 
                        };
                }
                
                return { output, preview };
            }
        },
        skills: {
            description: 'List my technical skills',
            execute: () => {
                const output = `
                    <p class="output-text output-info">Technical Skills:</p>
                    <p class="output-text">Frontend: HTML, CSS, JavaScript, React</p>
                    <p class="output-text">Design: UI/UX, Figma, Adobe Creative Suite</p>
                    <p class="output-text">Other: Content Creation, Photography</p>
                `;
                
                const preview = `
                    <div style="padding: 20px;">
                        <h2 style="color: #3b82f6; margin-bottom: 20px;">Skills Breakdown</h2>
                        
                        <div style="margin-bottom: 20px;">
                            <h3 style="margin-bottom: 10px; color: #ddd;">Frontend Development</h3>
                            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                                <div style="background: rgba(59, 130, 246, 0.2); padding: 8px 15px; border-radius: 4px; display: flex; align-items: center;">
                                    <span style="margin-right: 5px;"><i class="fab fa-html5"></i></span>
                                    <span>HTML5</span>
                                </div>
                                <div style="background: rgba(59, 130, 246, 0.2); padding: 8px 15px; border-radius: 4px; display: flex; align-items: center;">
                                    <span style="margin-right: 5px;"><i class="fab fa-css3-alt"></i></span>
                                    <span>CSS3</span>
                                </div>
                                <div style="background: rgba(59, 130, 246, 0.2); padding: 8px 15px; border-radius: 4px; display: flex; align-items: center;">
                                    <span style="margin-right: 5px;"><i class="fab fa-js"></i></span>
                                    <span>JavaScript</span>
                                </div>
                                <div style="background: rgba(59, 130, 246, 0.2); padding: 8px 15px; border-radius: 4px; display: flex; align-items: center;">
                                    <span style="margin-right: 5px;"><i class="fab fa-react"></i></span>
                                    <span>React</span>
                                </div>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <h3 style="margin-bottom: 10px; color: #ddd;">Design</h3>
                            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                                <div style="background: rgba(59, 130, 246, 0.2); padding: 8px 15px; border-radius: 4px; display: flex; align-items: center;">
                                    <span style="margin-right: 5px;"><i class="fas fa-paint-brush"></i></span>
                                    <span>UI/UX</span>
                                </div>
                                <div style="background: rgba(59, 130, 246, 0.2); padding: 8px 15px; border-radius: 4px; display: flex; align-items: center;">
                                    <span style="margin-right: 5px;"><i class="fab fa-figma"></i></span>
                                    <span>Figma</span>
                                </div>
                                <div style="background: rgba(59, 130, 246, 0.2); padding: 8px 15px; border-radius: 4px; display: flex; align-items: center;">
                                    <span style="margin-right: 5px;"><i class="fas fa-palette"></i></span>
                                    <span>Adobe Creative Suite</span>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h3 style="margin-bottom: 10px; color: #ddd;">Other</h3>
                            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                                <div style="background: rgba(59, 130, 246, 0.2); padding: 8px 15px; border-radius: 4px; display: flex; align-items: center;">
                                    <span style="margin-right: 5px;"><i class="fab fa-youtube"></i></span>
                                    <span>Content Creation</span>
                                </div>
                                <div style="background: rgba(59, 130, 246, 0.2); padding: 8px 15px; border-radius: 4px; display: flex; align-items: center;">
                                    <span style="margin-right: 5px;"><i class="fas fa-camera"></i></span>
                                    <span>Photography</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                return { output, preview };
            }
        },
        contact: {
            description: 'Show contact information',
            execute: () => {
                const output = `
                    <p class="output-text output-info">Contact Information:</p>
                    <p class="output-text">Email: <span class="command">codewyuu@gmail.com</span></p>
                    <p class="output-text">GitHub: <a href="https://github.com/codewyuu" target="_blank" class="command">github.com/codewyuu</a></p>
                    <p class="output-text">LinkedIn: <a href="https://www.linkedin.com/in/knowasyuvraj/" target="_blank" class="command">linkedin.com/in/knowasyuvraj</a></p>
                    <p class="output-text">Instagram: <a href="https://www.instagram.com/yxs20_/" target="_blank" class="command">instagram.com/yxs20_</a></p>
                `;
                
                const preview = `
                    <div style="padding: 20px; text-align: center;">
                        <h2 style="color: #3b82f6; margin-bottom: 20px;">Get In Touch</h2>
                        
                        <div style="background: rgba(30, 30, 30, 0.5); border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                            <div style="font-size: 48px; margin-bottom: 15px; color: #3b82f6;">
                                <i class="fas fa-envelope"></i>
                            </div>
                            <p style="margin-bottom: 5px; color: #ddd;">Email</p>
                            <p style="color: #3b82f6;">codewyuu@gmail.com</p>
                        </div>
                        
                        <div style="display: flex; justify-content: center; gap: 15px; margin-top: 30px;">
                            <a href="https://github.com/codewyuu" target="_blank" style="color: #ddd; font-size: 28px;"><i class="fab fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/knowasyuvraj/" target="_blank" style="color: #ddd; font-size: 28px;"><i class="fab fa-linkedin"></i></a>
                            <a href="https://www.instagram.com/yxs20_/" target="_blank" style="color: #ddd; font-size: 28px;"><i class="fab fa-instagram"></i></a>
                            <a href="https://x.com/codewyuu" target="_blank" style="color: #ddd; font-size: 28px;"><i class="fab fa-twitter"></i></a>
                        </div>
                        
                        <p style="margin-top: 30px; color: #aaa;">I generally respond to every email under 300 characters with a clear ask.</p>
                    </div>
                `;
                
                return { output, preview };
            }
        },
        open: {
            description: 'Open a page from the portfolio in the preview panel',
            execute: (args) => {
                if (!args || !args[0]) {
                    return { 
                        output: '<p class="output-text output-error">Please specify a page to open. Available pages: home, gallery, content, resume</p>' 
                    };
                }
                
                const page = args[0].toLowerCase();
                let url = '';
                
                switch(page) {
                    case 'home':
                        url = './index.html';
                        break;
                    case 'gallery':
                        url = './gallery.html';
                        break;
                    case 'content':
                        url = './content.html';
                        break;
                    case 'resume':
                        url = './resume.html';
                        break;
                    default:
                        return { 
                            output: `<p class="output-text output-error">Page "${page}" not found. Available pages: home, gallery, content, resume</p>` 
                        };
                }
                
                const output = `<p class="output-text">Opening <span class="command">${page}</span> page in preview panel...</p>`;
                
                // Show the iframe and load the page
                const previewIframe = document.getElementById('preview-iframe');
                const previewPlaceholder = document.querySelector('.preview-placeholder');
                
                if (previewIframe && previewPlaceholder) {
                    previewPlaceholder.style.display = 'none';
                    previewIframe.style.display = 'block';
                    previewIframe.src = url;
                    
                    // Update the preview title
                    const previewTitle = document.querySelector('.preview-title');
                    if (previewTitle) {
                        previewTitle.textContent = `Preview: ${page.charAt(0).toUpperCase() + page.slice(1)}`;
                    }
                }
                
                return { output };
            }
        },
        date: {
            description: 'Display the current date and time',
            execute: () => {
                const now = new Date();
                const options = { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                };
                const dateTimeString = now.toLocaleDateString('en-US', options);
                
                return { 
                    output: `<p class="output-text">Current date and time: <span class="output-info">${dateTimeString}</span></p>` 
                };
            }
        },
        echo: {
            description: 'Echo back the provided text',
            execute: (args) => {
                if (!args || args.length === 0) {
                    return { 
                        output: '<p class="output-text output-error">Please provide text to echo</p>' 
                    };
                }
                
                const text = args.join(' ');
                return { 
                    output: `<p class="output-text">${text}</p>` 
                };
            }
        }
    };
    
    // Process command input
    function processCommand(input) {
        const args = input.trim().split(' ');
        const cmd = args.shift().toLowerCase();
        
        if (commands[cmd]) {
            return commands[cmd].execute(args);
        } else {
            return { 
                output: `<p class="output-text output-error">Command not found: ${cmd}. Type <span class="command">help</span> to see available commands.</p>` 
            };
        }
    }
    
    // Handle command input
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const input = terminalInput.value.trim();
            
            if (input) {
                // Add command to history
                commandHistory.push(input);
                historyIndex = commandHistory.length;
                
                // Display command in output
                terminalOutput.innerHTML += `<p class="output-text"><span class="prompt">yuvraj@terminal:~$</span> ${input}</p>`;
                
                // Process command
                const result = processCommand(input);
                
                // Display command output
                if (result.output) {
                    terminalOutput.innerHTML += result.output;
                }
                
                // Update preview if available
                if (result.preview) {
                    // Hide iframe and show regular preview content
                    const previewIframe = document.getElementById('preview-iframe');
                    const previewPlaceholder = document.querySelector('.preview-placeholder');
                    
                    if (previewIframe && previewPlaceholder) {
                        previewIframe.style.display = 'none';
                        previewPlaceholder.style.display = 'none';
                    }
                    
                    // Update the preview title to default
                    const previewTitle = document.querySelector('.preview-title');
                    if (previewTitle) {
                        previewTitle.textContent = 'Preview';
                    }
                    
                    // Insert the preview content
                    previewContent.innerHTML = result.preview;
                }
                
                // Clear input
                terminalInput.value = '';
                
                // Scroll to bottom of output
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            
            const input = terminalInput.value.trim();
            if (input) {
                const args = input.split(' ');
                const partialCmd = args[0].toLowerCase();
                
                // Simple command completion
                if (args.length === 1) {
                    const matches = Object.keys(commands).filter(cmd => cmd.startsWith(partialCmd));
                    
                    if (matches.length === 1) {
                        terminalInput.value = matches[0] + ' ';
                    }
                }
            }
        }
    });
    
    // Focus input when clicking anywhere in the terminal
    document.querySelector('.terminal-interface').addEventListener('click', () => {
        terminalInput.focus();
    });
    
    // Refresh preview button
    refreshPreviewBtn.addEventListener('click', () => {
        const previewIframe = document.getElementById('preview-iframe');
        
        // If iframe is visible and has content, refresh it
        if (previewIframe && previewIframe.style.display !== 'none' && previewIframe.src) {
            previewIframe.src = previewIframe.src;
        } else {
            // Simple animation to indicate refresh for regular content
            previewContent.style.opacity = '0.5';
            setTimeout(() => {
                previewContent.style.opacity = '1';
            }, 300);
        }
    });
    
    // Fullscreen preview button
    fullscreenPreviewBtn.addEventListener('click', () => {
        const previewPanel = document.querySelector('.preview-panel');
        const previewIframe = document.getElementById('preview-iframe');
        
        // If iframe is visible and has content, make it fullscreen
        if (previewIframe && previewIframe.style.display !== 'none' && previewIframe.src) {
            if (!document.fullscreenElement) {
                if (previewIframe.requestFullscreen) {
                    previewIframe.requestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        } else {
            // Otherwise make the preview panel fullscreen
            if (!document.fullscreenElement) {
                if (previewPanel.requestFullscreen) {
                    previewPanel.requestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        }
    });
    
    // Initialize with focus on input
    terminalInput.focus();
});
