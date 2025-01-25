import { useState } from "react";
import { Bot, Mic, Send, Paperclip } from "lucide-react";
import { BotMessageSquare, Brain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  file?: File | null; 
}

export function SupportChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "What is POS and how it's going to help me?",
      sender: "user",
      timestamp: new Date(),
    },
    {
      id: "2",
      content:
        "A Point of Sale (POS) system is a combination of software and hardware that allows business owners to take transactions and simplify key day-to-day business operations.\n\nPOS systems can help you:\n- Process payments quickly and securely\n- Track inventory in real-time\n- Manage customer relationships\n- Generate detailed sales reports\n- Streamline staff management",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() && !attachedFile) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
      file: attachedFile,
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
    setAttachedFile(null);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm processing your request. Please wait a moment...",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file);
    }
  };

  return (
    <Card className="mx-auto max-w-4xl">
      <CardHeader className="flex flex-row items-center justify-between border-b px-6">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-blue-900">
          <Brain /> Support Genie
        </CardTitle>
        <Button variant="ghost" size="icon" className="size-10">
          <BotMessageSquare />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex h-[calc(100vh-280px)] flex-col justify-between">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex max-w-[80%] items-start gap-3 ${
                      message.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {message.sender === "bot" && (
                      <Avatar className="mt-0.5 h-8 w-8">
                        <AvatarImage />
                        <AvatarFallback>{<BotMessageSquare className="size-10" />}</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                      {message.file && (
                        <div className="mt-2">
                          <a
                            href={URL.createObjectURL(message.file)}
                            download={message.file.name}
                            className="text-blue-500 underline"
                          >
                            {message.file.name}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Input
                placeholder="Ask me anything about your POS"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1"
              />
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                <Paperclip className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" type="button">
                <Mic className="h-5 w-5" />
              </Button>
              <Button size="icon" type="submit" disabled={!inputValue.trim() && !attachedFile}>
                <Send className="h-5 w-5" />
              </Button>
            </form>
            {attachedFile && (
              <p className="mt-2 text-sm text-gray-600">
                Attached File: <strong>{attachedFile.name}</strong>
              </p>
            )}
          </div>
        </div>
      </CardContent>                        
    </Card>
  );
}
