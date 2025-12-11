import { X, Coins, Check } from "lucide-react";
import { CyberButton, getIcon } from "@/components/CyberButton";
import { shopItems } from "@shared/gameData";
import type { Player, ShopItem } from "@shared/schema";

interface ShopModalProps {
  type: "items" | "avatars";
  player: Player;
  onClose: () => void;
  onPurchase: (itemId: string) => void;
  onEquipAvatar: (avatarId: string) => void;
}

export function ShopModal({ type, player, onClose, onPurchase, onEquipAvatar }: ShopModalProps) {
  const items = shopItems.filter(item => 
    type === "items" ? item.type === "item" : item.type === "avatar"
  );

  const isOwned = (itemId: string) => {
    if (type === "items") {
      return player.ownedItems.includes(itemId);
    }
    return player.ownedAvatars.includes(itemId);
  };

  const isEquipped = (avatarId: string) => {
    return player.avatarIcon === avatarId.replace("avatar-", "");
  };

  const handleAction = (item: ShopItem) => {
    if (isOwned(item.id)) {
      if (type === "avatars") {
        const avatarIcon = item.icon;
        onEquipAvatar(avatarIcon);
      }
    } else if (player.money >= item.price) {
      onPurchase(item.id);
    }
  };

  const getButtonText = (item: ShopItem) => {
    if (type === "avatars" && isOwned(item.id)) {
      return isEquipped(item.id) ? "ĐANG DÙNG" : "SỬ DỤNG";
    }
    if (isOwned(item.id)) return "ĐÃ SỞ HỮU";
    if (player.money < item.price) return "KHÔNG ĐỦ TIỀN";
    return `MUA ${item.price}$`;
  };

  const getButtonVariant = (item: ShopItem): "blue" | "green" | "gold" | "red" => {
    if (type === "avatars" && isOwned(item.id)) {
      return isEquipped(item.id) ? "blue" : "green";
    }
    if (isOwned(item.id)) return "blue";
    if (player.money < item.price) return "red";
    return "gold";
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-2xl max-h-[90vh] bg-cyber-panel border-2 border-[#00f3ff] rounded-sm overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-[#333]">
          <h2 className="font-display text-xl text-[#ffd700]">
            {type === "items" ? "CỬA HÀNG VẬT PHẨM" : "CỬA HÀNG SKIN"}
          </h2>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-white transition-colors"
            data-testid="button-close-shop"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 border-b border-[#333] flex items-center gap-2">
          <Coins className="w-5 h-5 text-[#00f3ff]" />
          <span className="text-muted-foreground">TÀI SẢN:</span>
          <span className="text-[#00f3ff] font-bold" data-testid="text-shop-money">
            {player.money} $
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid gap-3">
            {items.map((item) => {
              const Icon = getIcon(item.icon);
              const owned = isOwned(item.id);
              
              return (
                <div 
                  key={item.id}
                  className={`flex items-center gap-4 p-4 border rounded-sm transition-colors ${
                    owned 
                      ? "bg-[#111] border-[#00ff9d]/50" 
                      : "bg-[#0a0a0a] border-[#444] hover:border-[#ffd700]"
                  }`}
                  data-testid={`shop-item-${item.id}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    owned ? "bg-[#00ff9d]/20" : "bg-[#ffd700]/10"
                  }`}>
                    <Icon className={`w-6 h-6 ${owned ? "text-[#00ff9d]" : "text-[#ffd700]"}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-foreground">{item.name}</h3>
                      {owned && <Check className="w-4 h-4 text-[#00ff9d]" />}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {item.description}
                    </p>
                  </div>

                  <CyberButton
                    variant={getButtonVariant(item)}
                    fullWidth={false}
                    onClick={() => handleAction(item)}
                    disabled={!isOwned(item.id) && player.money < item.price}
                    className="text-sm px-4 py-2"
                    data-testid={`button-buy-${item.id}`}
                  >
                    {getButtonText(item)}
                  </CyberButton>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}