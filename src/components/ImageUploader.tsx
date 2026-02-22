import { useState, useRef } from "react";
import { useGame } from "@/context/GameContext";
import { Upload, Camera, Sparkles } from "lucide-react";

const ImageUploader = () => {
  const { classifyWaste } = useGame();
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
    setAnalyzing(true);
    setTimeout(() => {
      classifyWaste(file);
      setAnalyzing(false);
    }, 1500);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) handleFile(file);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
        <Camera className="w-5 h-5 text-primary" />
        Upload Waste Image
      </h3>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        onClick={() => fileRef.current?.click()}
        className="relative border-2 border-dashed border-primary/30 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-all duration-300 min-h-[200px]"
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={onChange}
          className="hidden"
        />
        {preview ? (
          <div className="relative w-full">
            <img
              src={preview}
              alt="Uploaded waste"
              className="w-full max-h-48 object-contain rounded-lg"
            />
            {analyzing && (
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 rounded-lg backdrop-blur-sm">
                <div className="flex items-center gap-2 text-primary-foreground bg-primary px-4 py-2 rounded-full">
                  <Sparkles className="w-4 h-4 animate-float" />
                  <span className="font-display font-semibold text-sm">Analyzing...</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Upload className="w-10 h-10 text-primary/50 mb-3" />
            <p className="text-sm font-medium text-muted-foreground">
              Drop an image here or <span className="text-primary">browse</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
