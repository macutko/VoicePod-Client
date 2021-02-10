const config = {
    baseURL: "http://192.168.1.24:12345/",
};
//TODO: import Config from 'react-native-config';


const recordingSettings = {
    sampleRate: 16000, // default 44100
    channels: 1, // 1 or 2, default 1
    bitsPerSample: 16, // 8 or 16, default 16
    audioSource: 6, // android only
    // wavFile: 'test.wav' // default 'audio.wav'
}


export default config;

export {recordingSettings};