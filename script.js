// Lista de músicas de teste (Áudios grátis do arquivo Open Source Archive/Pixabay)
const trackList = [
    {
        title: "Lost in the City Lights",
        artist: "Cosmo Sheldrake",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        cover: "https://picsum.photos/id/101/300/300"
    },
    {
        title: "Forest Echoes",
        artist: "Nature Beats",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        cover: "https://picsum.photos/id/102/300/300"
    },
    {
        title: "Neon Dreams",
        artist: "Synthwave Project",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        cover: "https://picsum.photos/id/103/300/300"
    }
];

// Elementos do DOM
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const trackCover = document.getElementById('track-cover');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const playlistTracks = document.getElementById('playlist-tracks');

let trackIndex = 0;
let isPlaying = false;

// Inicializar o Player
function loadTrack(track) {
    trackTitle.innerText = track.title;
    trackArtist.innerText = track.artist;
    audioPlayer.src = track.src;
    trackCover.src = track.cover;
    updatePlaylistUI();
}

// Tocar Música
function playTrack() {
    isPlaying = true;
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    audioPlayer.play();
}

// Pausar Música
function pauseTrack() {
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    audioPlayer.pause();
}

// Alternar Play/Pause
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
});

// Música Anterior
prevBtn.addEventListener('click', () => {
    trackIndex = (trackIndex - 1 + trackList.length) % trackList.length;
    loadTrack(trackList[trackIndex]);
    playTrack();
});

// Próxima Música
function nextTrack() {
    trackIndex = (trackIndex + 1) % trackList.length;
    loadTrack(trackList[trackIndex]);
    playTrack();
}
nextBtn.addEventListener('click', nextTrack);

// Atualizar Barra de Progresso e Tempo
audioPlayer.addEventListener('timeupdate', (e) => {
    const { duration, currentTime } = e.srcElement;
    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;

        // Formatar tempo
        currentTimeEl.innerText = formatTime(currentTime);
        durationEl.innerText = formatTime(duration);
    }
});

// Tornar a Barra de Progresso Clicável
progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (clickX / width) * duration;
});

// Avançar automaticamente ao acabar a música
audioPlayer.addEventListener('ended', nextTrack);

// Auxiliar: Formatar segundos para MM:SS
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

// Criar Playlist Visual Dinâmica
function buildPlaylist() {
    playlistTracks.innerHTML = '';
    trackList.forEach((track, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${track.title}</span> <span>${track.artist}</span>`;
        li.addEventListener('click', () => {
            trackIndex = index;
            loadTrack(trackList[trackIndex]);
            playTrack();
        });
        playlistTracks.appendChild(li);
    });
}

// Destacar música ativa na playlist
function updatePlaylistUI() {
    const items = playlistTracks.querySelectorAll('li');
    items.forEach((item, index) => {
        if (index === trackIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Configuração Inicial ao carregar a página
buildPlaylist();
loadTrack(trackList[trackIndex]);