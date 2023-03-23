export interface CreateSupportTicketPayload {
  topic: string;
  subTopic: string;
  description: string;
  messages: {
    message: string;
  }[];
}

export interface MessageItem {
  senderId: string;
    senderName: string;
    message: string;
    createdAt: number;
    updatedAt: number;
}

export interface SupportTicketType {
  id: string;
  userId: string;
  topic: string;
  subTopic: string;
  status: string;
  remarks: string;
  messages: MessageItem[];
  createdAt: number;
  updatedAt: number;
}
