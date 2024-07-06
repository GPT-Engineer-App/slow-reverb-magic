import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [file, setFile] = useState(null);
  const [speed, setSpeed] = useState(1);
  const [reverb, setReverb] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    const audioURL = URL.createObjectURL(uploadedFile);
    audioRef.current.src = audioURL;
  };

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleStop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSpeedChange = (value) => {
    setSpeed(value);
    audioRef.current.playbackRate = value;
  };

  const handleReverbChange = (value) => {
    setReverb(value);
    // Apply reverb effect here
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Upload and Modify MP3</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input type="file" accept=".mp3" onChange={handleFileChange} />
            {file && <p className="mt-2">Uploaded File: {file.name}</p>}
          </div>
          <div className="mb-4">
            <label>Speed</label>
            <Slider
              value={[speed]}
              onValueChange={(value) => handleSpeedChange(value[0])}
              max={2}
              step={0.1}
              className="mt-2"
            />
          </div>
          <div className="mb-4">
            <label>Reverb</label>
            <Slider
              value={[reverb]}
              onValueChange={(value) => handleReverbChange(value[0])}
              max={100}
              step={1}
              className="mt-2"
            />
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <Button onClick={handlePlay} disabled={isPlaying}>
              Play
            </Button>
            <Button onClick={handlePause} disabled={!isPlaying}>
              Pause
            </Button>
            <Button onClick={handleStop}>Stop</Button>
          </div>
          <div>
            <p>
              Current Time: {currentTime.toFixed(2)} / {duration.toFixed(2)}
            </p>
          </div>
          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;