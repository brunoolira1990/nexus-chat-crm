import { useState } from "react";
import { chats } from "@/data/mockData";
import { ChatList } from "@/components/inbox/ChatList";
import { ChatArea } from "@/components/inbox/ChatArea";
import { CrmPanel } from "@/components/inbox/CrmPanel";
import { MessageSquare } from "lucide-react";

export default function InboxPage() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(chats[0]?.id || null);
  const selectedChat = chats.find(c => c.id === selectedChatId) || null;

  return (
    <div className="flex h-screen">
      <ChatList chats={chats} selectedChatId={selectedChatId} onSelectChat={setSelectedChatId} />
      {selectedChat ? (
        <>
          <ChatArea chat={selectedChat} />
          <CrmPanel chat={selectedChat} />
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          <div className="text-center space-y-3">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground/30" />
            <p className="text-sm">Selecione uma conversa</p>
          </div>
        </div>
      )}
    </div>
  );
}
