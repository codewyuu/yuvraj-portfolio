// Terminal and Music Player Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Music Player Functionality
    const playPauseBtn = document.getElementById('play-pause');
    const prevTrackBtn = document.getElementById('prev-track');
    const nextTrackBtn = document.getElementById('next-track');
    const volumeBtn = document.getElementById('volume');
    const waveformBars = document.querySelectorAll('.bar');
    const currentTimeEl = document.querySelector('.current-time');
    const totalTimeEl = document.querySelector('.total-time');
    const trackTitleEl = document.querySelector('.track-title');
    const trackArtistEl = document.querySelector('.track-artist');
    
    // Sample tracks
    const tracks = [
        {
            title: 'Lofi Study',
            artist: 'Chill Beats',
            duration: '3:45'
        },
        {
            title: 'Coding Focus',
            artist: 'Deep Concentration',
            duration: '4:20'
        },
        {
            title: 'Ambient Workspace',
            artist: 'Productivity Sounds',
            duration: '5:15'
        }
    ];
    
    let currentTrackIndex = 0;
    let isPlaying = false;
    let progressInterval;
    
    // Initialize with first track
    updateTrackInfo();
    
    // Play/Pause button functionality
    playPauseBtn.addEventListener('click', function() {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            animateWaveform();
        } else {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            stopWaveformAnimation();
        }
    });
    
    // Previous track button
    prevTrackBtn.addEventListener('click', function() {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        updateTrackInfo();
        if (isPlaying) {
            resetWaveform();
            animateWaveform();
        }
    });
    
    // Next track button
    nextTrackBtn.addEventListener('click', function() {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        updateTrackInfo();
        if (isPlaying) {
            resetWaveform();
            animateWaveform();
        }
    });
    
    // Volume button
    let isMuted = false;
    volumeBtn.addEventListener('click', function() {
        isMuted = !isMuted;
        volumeBtn.innerHTML = isMuted ? 
            '<i class="fas fa-volume-mute"></i>' : 
            '<i class="fas fa-volume-up"></i>';
    });
    
    // Update track info
    function updateTrackInfo() {
        const currentTrack = tracks[currentTrackIndex];
        trackTitleEl.textContent = currentTrack.title;
        trackArtistEl.textContent = currentTrack.artist;
        totalTimeEl.textContent = currentTrack.duration;
        currentTimeEl.textContent = '0:00';
    }
    
    // Animate waveform bars
    function animateWaveform() {
        // Clear any existing animation
        stopWaveformAnimation();
        
        // Animate bars randomly
        progressInterval = setInterval(() => {
            waveformBars.forEach(bar => {
                const height = Math.floor(Math.random() * 80) + 20;
                bar.style.height = `${height}%`;
            });
            
            // Update time (simplified)
            const currentTime = currentTimeEl.textContent;
            const [mins, secs] = currentTime.split(':').map(Number);
            let totalSecs = mins * 60 + secs + 1;
            
            const newMins = Math.floor(totalSecs / 60);
            const newSecs = totalSecs % 60;
            currentTimeEl.textContent = `${newMins}:${newSecs.toString().padStart(2, '0')}`;
            
            // Check if track ended
            const totalTime = tracks[currentTrackIndex].duration;
            const [totalMins, totalSecsInTrack] = totalTime.split(':').map(Number);
            const totalTimeInSecs = totalMins * 60 + totalSecsInTrack;
            
            if (totalSecs <= totalTimeInSecs) {
                // Track still playing
            } else {
                // Track ended, play next
                nextTrackBtn.click();
            }
        }, 1000);
    }
    
    // Stop waveform animation
    function stopWaveformAnimation() {
        clearInterval(progressInterval);
    }
    
    // Reset waveform
    function resetWaveform() {
        waveformBars.forEach(bar => {
            const height = Math.floor(Math.random() * 60) + 20;
            bar.style.height = `${height}%`;
        });
        currentTimeEl.textContent = '0:00';
    }
    
    // Terminal Functionality
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const previewContent = document.getElementById('preview-content');
    const previewPlaceholder = document.querySelector('.preview-placeholder');
    const previewIframe = document.getElementById('preview-iframe');
    
    // Available commands
    const commands = {
        help: function() {
            return `
                <p class="output-text">Available commands:</p>
                <p class="output-text output-info">help</p>
                <p class="output-text">- Show available commands</p>
                <p class="output-text output-info">clear</p>
                <p class="output-text">- Clear terminal output</p>
                <p class="output-text output-info">open [page]</p>
                <p class="output-text">- Open a page in preview (e.g., open content)</p>
                <p class="output-text output-info">play</p>
                <p class="output-text">- Play/pause music</p>
                <p class="output-text output-info">next</p>
                <p class="output-text">- Play next track</p>
                <p class="output-text output-info">prev</p>
                <p class="output-text">- Play previous track</p>
            `;
        },
        clear: function() {
            terminalOutput.innerHTML = '';
            return '';
        },
        open: function(args) {
            if (!args || args.length === 0) {
                return '<p class="output-text output-error">Error: Please specify a page to open</p>';
            }
            
            const page = args[0];
            const validPages = ['home', 'gallery', 'content', 'resume'];
            
            if (validPages.includes(page)) {
                previewPlaceholder.style.display = 'none';
                previewIframe.style.display = 'block';
                previewIframe.src = `./${page}.html`;
                return `<p class="output-text output-success">Opening ${page} page in preview panel...</p>`;
            } else {
                return `<p class="output-text output-error">Error: Page '${page}' not found</p>`;
            }
        },
        play: function() {
            playPauseBtn.click();
            return `<p class="output-text output-success">${isPlaying ? 'Playing' : 'Paused'} music</p>`;
        },
        next: function() {
            nextTrackBtn.click();
            return `<p class="output-text output-success">Playing next track: ${tracks[currentTrackIndex].title}</p>`;
        },
        prev: function() {
            prevTrackBtn.click();
            return `<p class="output-text output-success">Playing previous track: ${tracks[currentTrackIndex].title}</p>`;
        }
    };
    
    // Handle terminal input
    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            
            const input = terminalInput.value.trim();
            if (input === '') return;
            
            // Add command to output
            terminalOutput.innerHTML += `
                <p class="output-text">
                    <span class="prompt">yuvraj@terminal:~$</span> 
                    <span class="command">${input}</span>
                </p>
            `;
            
            // Process command
            const args = input.split(' ');
            const cmd = args.shift().toLowerCase();
            
            if (commands[cmd]) {
                const output = commands[cmd](args);
                if (output) {
                    terminalOutput.innerHTML += output;
                }
            } else {
                terminalOutput.innerHTML += `<p class="output-text output-error">Command not found: ${cmd}</p>`;
            }
            
            // Clear input and scroll to bottom
            terminalInput.value = '';
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });
    
    // Focus terminal input when clicking anywhere in terminal content
    document.querySelector('.terminal-content').addEventListener('click', function() {
        terminalInput.focus();
    });
    
    // Initialize terminal with focus
    terminalInput.focus();
});
