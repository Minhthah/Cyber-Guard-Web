import { useState } from "react";
import { Gamepad2 } from "lucide-react";
import { CyberButton } from "@/components/CyberButton";
import { GlassPanel } from "@/components/GlassPanel";

interface LoginScreenProps {
  onLogin: (username: string) => void;
  isLoading?: boolean;
}

export function LoginScreen({ onLogin, isLoading }: LoginScreenProps) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
      <GlassPanel className="w-full max-w-md text-center" neonBorder="blue">
        <Gamepad2 className="w-20 h-20 text-[#00f3ff] mx-auto mb-6" />
        
        <h1 className="font-display text-4xl font-bold text-[#00f3ff] mb-2 neon-glow-blue">
          CYBER HERO
        </h1>
        <p className="text-muted-foreground mb-8">
          Bảo Mật An Ninh Mạng
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="NHẬP TÊN ĐIỆP VIÊN..."
            maxLength={12}
            className="w-full bg-black/50 border border-[#00f3ff] p-4 text-center text-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00f3ff] focus:ring-opacity-50 rounded-sm"
            data-testid="input-username"
            disabled={isLoading}
          />
          
          <CyberButton 
            type="submit" 
            variant="blue"
            disabled={!username.trim() || isLoading}
            data-testid="button-login"
          >
            {isLoading ? "ĐANG TẢI..." : "VÀO GAME NGAY"}
          </CyberButton>
        </form>

        <p className="text-xs text-muted-foreground mt-6">
          Học cách nhận diện và phòng chống lừa đảo trực tuyến
        </p>
      </GlassPanel>
    </div>
  );
}