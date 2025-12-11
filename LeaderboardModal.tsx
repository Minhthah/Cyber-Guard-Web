import { X, Trophy, Medal, Award } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { LeaderboardEntry } from "@shared/schema";

interface LeaderboardModalProps {
  onClose: () => void;
}

export function LeaderboardModal({ onClose }: LeaderboardModalProps) {
  const { data: entries, isLoading, error } = useQuery<LeaderboardEntry[]>({
    queryKey: ["/api/leaderboard"],
  });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-[#ffd700]" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 text-center text-muted-foreground">{rank}</span>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-lg max-h-[90vh] bg-cyber-panel border-2 border-[#00f3ff] rounded-sm overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-[#333]">
          <h2 className="font-display text-xl text-[#00f3ff]">BẢNG XẾP HẠNG</h2>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-white transition-colors"
            data-testid="button-close-leaderboard"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-muted-foreground animate-pulse">Đang tải...</div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-[#ff0055]">Không thể tải bảng xếp hạng</div>
            </div>
          ) : !entries || entries.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-muted-foreground">Chưa có ai trên bảng xếp hạng</div>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#444]">
                  <th className="py-3 px-4 text-left text-[#00ff9d] font-normal">#</th>
                  <th className="py-3 px-4 text-left text-[#00ff9d] font-normal">AGENT</th>
                  <th className="py-3 px-4 text-right text-[#00ff9d] font-normal">XP</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr 
                    key={entry.id} 
                    className="border-b border-[#222] hover:bg-[#111] transition-colors"
                    data-testid={`leaderboard-row-${index}`}
                  >
                    <td className="py-3 px-4">
                      {getRankIcon(index + 1)}
                    </td>
                    <td className="py-3 px-4 text-foreground">
                      {entry.playerName}
                    </td>
                    <td className="py-3 px-4 text-right text-[#ffd700] font-bold">
                      {entry.score.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}