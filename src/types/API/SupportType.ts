export interface CreateSupportTicketPayload {
  topic: string;
  subTopic: string;
  description: string;
  messages: {
    message: string;
  }[];
}

export interface SupportTicketType {
  id: string;
  userId: string;
  topic: string;
  subTopic: string;
  status: string;
  remarks: string;
  messages: {
    senderId: string;
    senderName: string;
    message: string;
    createdAt: number;
    updatedAt: number;
  }[];
  createdAt: number;
  updatedAt: number;
}
