
// This file previously contained TypeScript interfaces
// Converting to JavaScript object definitions for reference

// User object structure
// {
//   id: String,
//   name: String,
//   email: String, 
//   role: String ('customer' or 'designer'),
//   profileImage: String (optional)
// }

// ProjectRequest object structure
// {
//   id: String,
//   title: String,
//   description: String,
//   customerId: String,
//   customerName: String,
//   images: Array of Strings,
//   material: String,
//   budget: Number (optional),
//   timeframe: String (optional),
//   status: String ('open', 'assigned', or 'completed'),
//   createdAt: String,
//   additionalDetails: String (optional),
//   acceptedProposalId: String (optional),
//   acceptedPrice: Number (optional),
//   designerId: String (optional),
//   designerName: String (optional),
//   size: String (optional)
// }

// Proposal object structure
// {
//   id: String,
//   requestId: String,
//   designerId: String,
//   designerName: String,
//   designerImage: String (optional),
//   price: Number,
//   estimatedTime: String,
//   message: String,
//   status: String ('pending', 'accepted', or 'rejected'),
//   createdAt: String
// }

// Message object structure
// {
//   id: String,
//   senderId: String,
//   receiverId: String,
//   content: String,
//   timestamp: String,
//   read: Boolean,
//   image: String (optional)
// }

// TimelineUpdate object structure
// {
//   id: String,
//   requestId: String,
//   status: String,
//   message: String,
//   timestamp: String,
//   paymentRequired: Boolean (optional),
//   paymentAmount: Number (optional),
//   paymentStatus: String (optional, 'pending', 'paid', or 'not_required')
// }

// AuthState object structure
// {
//   user: User object or null,
//   isAuthenticated: Boolean,
//   isLoading: Boolean
// }

// Payment object structure
// {
//   id: String,
//   requestId: String,
//   timelineUpdateId: String,
//   amount: Number,
//   status: String ('pending', 'paid', or 'failed'),
//   timestamp: String
// }

// Product object structure
// {
//   id: String,
//   name: String,
//   description: String,
//   price: Number,
//   category: String ('custom', 'clothing', or 'accessories'),
//   images: Array of Strings,
//   sizes: Array of Strings (optional),
//   colors: Array of Strings (optional),
//   inStock: Boolean
// }
