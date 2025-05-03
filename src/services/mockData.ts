
import { ProjectRequest, Proposal, User, Message, TimelineUpdate } from "@/types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "user1",
    name: "Emma Johnson",
    email: "emma@example.com",
    role: "customer",
  },
  {
    id: "user2",
    name: "Alex Chen",
    email: "alex@example.com",
    role: "designer",
  },
  {
    id: "user3",
    name: "Sophia Davis",
    email: "sophia@example.com",
    role: "designer",
  }
];

// Mock Project Requests
export const mockRequests: ProjectRequest[] = [
  {
    id: "request1",
    title: "Custom Wedding Gown",
    description: "Looking for a designer to create a custom wedding gown inspired by vintage 1920s style. I prefer silk material with delicate beadwork.",
    customerId: "user1",
    customerName: "Emma Johnson",
    images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80"],
    material: "Silk",
    budget: 2500,
    timeframe: "3+ months",
    status: "open",
    createdAt: "2025-04-15T10:30:00Z",
    additionalDetails: "I'm 5'7\", size 8, and would need this by September for my wedding."
  },
  {
    id: "request2",
    title: "Tailored Business Suit",
    description: "Need a well-tailored business suit for professional meetings. Prefer dark colors and modern cut.",
    customerId: "user1",
    customerName: "Emma Johnson",
    images: ["https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=300&q=80"],
    material: "Wool",
    budget: 800,
    timeframe: "1-2 months",
    status: "assigned",
    createdAt: "2025-04-10T15:45:00Z"
  },
  {
    id: "request3",
    title: "Custom Casual Jacket",
    description: "Looking for a unique casual jacket design that combines denim and leather elements.",
    customerId: "user1",
    customerName: "Emma Johnson",
    images: ["https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=300&q=80"],
    material: "Denim",
    budget: 350,
    timeframe: "1-2 weeks",
    status: "open",
    createdAt: "2025-05-01T09:15:00Z"
  }
];

// Mock Proposals
export const mockProposals: Proposal[] = [
  {
    id: "proposal1",
    requestId: "request1",
    designerId: "user2",
    designerName: "Alex Chen",
    price: 2700,
    estimatedTime: "2 months",
    message: "I specialize in vintage-inspired wedding gowns and would love to create this for you. I've included hand-beading in my quote, which would really elevate the 1920s aesthetic you're looking for.",
    status: "pending",
    createdAt: "2025-04-16T14:20:00Z"
  },
  {
    id: "proposal2",
    requestId: "request1",
    designerId: "user3",
    designerName: "Sophia Davis",
    price: 2300,
    estimatedTime: "3 months",
    message: "I have 10+ years of experience with bridal wear and can create your dream 1920s-inspired gown. I work with the finest silks and my beadwork has been featured in Vogue Bridal.",
    status: "pending",
    createdAt: "2025-04-17T11:05:00Z"
  },
  {
    id: "proposal3",
    requestId: "request2",
    designerId: "user2",
    designerName: "Alex Chen",
    price: 850,
    estimatedTime: "1 month",
    message: "I can create a perfectly tailored suit that will make you look sharp in all your professional meetings. I recommend a navy wool blend for versatility.",
    status: "accepted",
    createdAt: "2025-04-11T09:30:00Z"
  }
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: "msg1",
    senderId: "user1",
    receiverId: "user2",
    content: "Hello Alex, I'm excited about your proposal for my suit!",
    timestamp: "2025-04-12T10:15:00Z",
    read: true
  },
  {
    id: "msg2",
    senderId: "user2",
    receiverId: "user1",
    content: "Hi Emma, thank you for accepting my proposal. When would be a good time to schedule a fitting?",
    timestamp: "2025-04-12T10:30:00Z",
    read: true
  },
  {
    id: "msg3",
    senderId: "user1",
    receiverId: "user2",
    content: "Would next Monday at 2pm work for you?",
    timestamp: "2025-04-12T10:45:00Z",
    read: true
  },
  {
    id: "msg4",
    senderId: "user2",
    receiverId: "user1",
    content: "Monday at 2pm works perfectly. I'll send you the address for my studio.",
    timestamp: "2025-04-12T11:00:00Z",
    read: true
  }
];

// Mock Timeline Updates
export const mockTimelineUpdates: TimelineUpdate[] = [
  {
    id: "update1",
    requestId: "request2",
    status: "design",
    message: "Design sketches have been approved. Moving to pattern creation.",
    timestamp: "2025-04-15T14:30:00Z"
  },
  {
    id: "update2",
    requestId: "request2",
    status: "material",
    message: "Premium wool blend fabric has been selected and ordered.",
    timestamp: "2025-04-18T09:45:00Z"
  },
  {
    id: "update3",
    requestId: "request2",
    status: "production",
    message: "Cutting and sewing has begun following the first fitting measurements.",
    timestamp: "2025-04-22T16:20:00Z"
  }
];

// Mock Authentication Function
let currentUser: User | null = null;

export const mockLogin = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    // For mock purposes, just check if email exists in mockUsers
    const user = mockUsers.find(user => user.email === email);
    
    if (user) {
      currentUser = user;
      setTimeout(() => resolve(user), 500);
    } else {
      setTimeout(() => reject(new Error("Invalid email or password")), 500);
    }
  });
};

export const mockRegister = (name: string, email: string, password: string, role: 'customer' | 'designer'): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Check if email already exists
    const existingUser = mockUsers.find(user => user.email === email);
    
    if (existingUser) {
      setTimeout(() => reject(new Error("Email already in use")), 500);
      return;
    }
    
    const newUser: User = {
      id: `user${mockUsers.length + 1}`,
      name,
      email,
      role
    };
    
    mockUsers.push(newUser);
    currentUser = newUser;
    setTimeout(() => resolve(newUser), 500);
  });
};

export const mockGetCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(currentUser), 200);
  });
};

export const mockLogout = (): Promise<void> => {
  return new Promise((resolve) => {
    currentUser = null;
    setTimeout(() => resolve(), 200);
  });
};

// Mock Data Access Functions
export const mockGetAllRequests = (): Promise<ProjectRequest[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockRequests), 500);
  });
};

export const mockGetRequestById = (id: string): Promise<ProjectRequest | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockRequests.find(req => req.id === id)), 300);
  });
};

export const mockGetProposalsByRequestId = (requestId: string): Promise<Proposal[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProposals.filter(prop => prop.requestId === requestId)), 300);
  });
};

export const mockGetMessagesByUsers = (user1Id: string, user2Id: string): Promise<Message[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const messages = mockMessages.filter(
        msg => (msg.senderId === user1Id && msg.receiverId === user2Id) || 
              (msg.senderId === user2Id && msg.receiverId === user1Id)
      );
      resolve(messages);
    }, 300);
  });
};

export const mockGetTimelineByRequestId = (requestId: string): Promise<TimelineUpdate[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTimelineUpdates.filter(update => update.requestId === requestId)), 300);
  });
};

export const mockCreateRequest = (request: Omit<ProjectRequest, "id" | "customerId" | "customerName" | "status" | "createdAt">): Promise<ProjectRequest> => {
  return new Promise((resolve) => {
    if (!currentUser) {
      throw new Error("Not authenticated");
    }
    
    const newRequest: ProjectRequest = {
      id: `request${mockRequests.length + 1}`,
      ...request,
      customerId: currentUser.id,
      customerName: currentUser.name,
      status: "open",
      createdAt: new Date().toISOString()
    };
    
    mockRequests.push(newRequest);
    setTimeout(() => resolve(newRequest), 500);
  });
};

export const mockSubmitProposal = (requestId: string, proposal: { price: number, estimatedTime: string, message: string }): Promise<Proposal> => {
  return new Promise((resolve) => {
    if (!currentUser) {
      throw new Error("Not authenticated");
    }
    
    const newProposal: Proposal = {
      id: `proposal${mockProposals.length + 1}`,
      requestId,
      designerId: currentUser.id,
      designerName: currentUser.name,
      ...proposal,
      status: "pending",
      createdAt: new Date().toISOString()
    };
    
    mockProposals.push(newProposal);
    setTimeout(() => resolve(newProposal), 500);
  });
};

export const mockUpdateProposalStatus = (proposalId: string, status: 'accepted' | 'rejected'): Promise<Proposal> => {
  return new Promise((resolve, reject) => {
    const proposalIndex = mockProposals.findIndex(prop => prop.id === proposalId);
    
    if (proposalIndex === -1) {
      reject(new Error("Proposal not found"));
      return;
    }
    
    mockProposals[proposalIndex] = {
      ...mockProposals[proposalIndex],
      status
    };
    
    // If a proposal is accepted, also update the request status
    if (status === 'accepted') {
      const requestIndex = mockRequests.findIndex(req => req.id === mockProposals[proposalIndex].requestId);
      if (requestIndex !== -1) {
        mockRequests[requestIndex] = {
          ...mockRequests[requestIndex],
          status: 'assigned'
        };
      }
    }
    
    setTimeout(() => resolve(mockProposals[proposalIndex]), 300);
  });
};

export const mockSendMessage = (receiverId: string, content: string): Promise<Message> => {
  return new Promise((resolve, reject) => {
    if (!currentUser) {
      reject(new Error("Not authenticated"));
      return;
    }
    
    const newMessage: Message = {
      id: `msg${mockMessages.length + 1}`,
      senderId: currentUser.id,
      receiverId,
      content,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    mockMessages.push(newMessage);
    setTimeout(() => resolve(newMessage), 200);
  });
};

export const mockAddTimelineUpdate = (requestId: string, status: TimelineUpdate['status'], message: string): Promise<TimelineUpdate> => {
  return new Promise((resolve) => {
    const newUpdate: TimelineUpdate = {
      id: `update${mockTimelineUpdates.length + 1}`,
      requestId,
      status,
      message,
      timestamp: new Date().toISOString()
    };
    
    mockTimelineUpdates.push(newUpdate);
    
    // If the status is 'delivered', update the request status to 'completed'
    if (status === 'delivered') {
      const requestIndex = mockRequests.findIndex(req => req.id === requestId);
      if (requestIndex !== -1) {
        mockRequests[requestIndex] = {
          ...mockRequests[requestIndex],
          status: 'completed'
        };
      }
    }
    
    setTimeout(() => resolve(newUpdate), 300);
  });
};
