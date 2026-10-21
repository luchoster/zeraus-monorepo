import { Conversation } from "../../types/chat";
import { Folder } from "../../types/folder";
import { IconFileExport, IconMoon, IconSun } from "@tabler/icons-react";
import { FC } from "react";
import { SidebarButton } from "../Sidebar/SidebarButton";
import { ClearConversations } from "./ClearConversations";

interface Props {
  lightMode: "light" | "dark";
  apiKey: string;
  conversationsCount: number;
  onToggleLightMode: (mode: "light" | "dark") => void;
  onApiKeyChange: (apiKey: string) => void;
  onClearConversations: () => void;
  onExportConversations: () => void;
  onImportConversations: (data: {
    conversations: Conversation[];
    folders: Folder[];
  }) => void;
}

export const ChatbarSettings: FC<Props> = ({
  lightMode,
  apiKey,
  conversationsCount,
  onToggleLightMode,
  onApiKeyChange,
  onClearConversations,
  onExportConversations,
  onImportConversations,
}) => {
  return (
    <div className="flex flex-col items-center space-y-1 border-t border-white/20 pt-1 text-sm">
      {conversationsCount > 0 ? (
        <ClearConversations onClearConversations={onClearConversations} />
      ) : null}

      <SidebarButton
        text="Export conversations"
        icon={<IconFileExport size={18} />}
        onClick={() => onExportConversations()}
      />

      <SidebarButton
        text={lightMode === "light" ? "Dark mode" : "Light mode"}
        icon={
          lightMode === "light" ? <IconMoon size={18} /> : <IconSun size={18} />
        }
        onClick={() =>
          onToggleLightMode(lightMode === "light" ? "dark" : "light")
        }
      />
    </div>
  );
};
