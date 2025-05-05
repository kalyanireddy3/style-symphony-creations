
// User object structure
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'designer';
  profileImage?: string;
}

// ProjectRequest object structure
export interface ProjectRequest {
  id: string;
  title: string;
  description: string;
  customerId: string;
  customerName: string;
  images: string[];
  material: string;
  budget?: number;
  timeframe?: string;
  status: 'open' | 'assigned' | 'completed';
  createdAt: string;
  additionalDetails?: string;
  acceptedProposalId?: string;
  acceptedPrice?: number;
  designerId?: string;
  designerName?: string;
  size?: string;
}

// Proposal object structure
export interface Proposal {
  id: string;
  requestId: string;
  designerId: string;
  designerName: string;
  designerImage?: string;
  price: number;
  estimatedTime: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

// Message object structure
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
  image?: string;
}

// TimelineUpdate object structure
export interface TimelineUpdate {
  id: string;
  requestId: string;
  status: string;
  message: string;
  timestamp: string;
  paymentRequired?: boolean;
  paymentAmount?: number;
  paymentStatus?: 'pending' | 'paid' | 'not_required';
}

// AuthState object structure
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Payment object structure
export interface Payment {
  id: string;
  requestId: string;
  timelineUpdateId: string;
  amount: number;
  status: 'pending' | 'paid' | 'failed';
  timestamp: string;
}

// Product object structure
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'custom' | 'clothing' | 'accessories';
  images: string[];
  sizes?: string[];
  colors?: string[];
  inStock: boolean;
}
