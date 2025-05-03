
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import RequestCard from '@/components/customer/RequestCard';
import Navbar from '@/components/layout/Navbar';
import { mockGetAllRequests, mockGetCurrentUser, mockLogout } from '@/services/mockData';
import { ProjectRequest, User } from '@/types';

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [requests, setRequests] = useState<ProjectRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current user
        const userData = await mockGetCurrentUser();
        setUser(userData);
        
        // Fetch featured requests
        const requestsData = await mockGetAllRequests();
        // Get only the first 3 open requests
        const featuredRequests = requestsData
          .filter(request => request.status === 'open')
          .slice(0, 3);
        
        setRequests(featuredRequests);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await mockLogout();
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const features = [
    {
      title: "Custom Requests",
      description: "Describe your dream fashion item in detail and upload reference images.",
      icon: "✏️",
    },
    {
      title: "Designer Proposals",
      description: "Receive personalized offers from talented designers eager to bring your vision to life.",
      icon: "💼",
    },
    {
      title: "Direct Communication",
      description: "Chat one-on-one with your chosen designer throughout the creation process.",
      icon: "💬",
    },
    {
      title: "Project Tracking",
      description: "Follow your project's progress from design to delivery with detailed timeline updates.",
      icon: "📈",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />
      
      {/* Hero Section */}
      <section className="bg-fashion-purple-light py-16">
        <div className="container mx-auto px-4 max-w-screen-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 fade-in">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-fashion-purple">
                Custom Fashion, Designed Just For You
              </h1>
              <p className="text-lg text-gray-700">
                Connect with talented designers to create unique, personalized fashion items that match your style and vision.
              </p>
              <div className="flex flex-wrap gap-4">
                {!user ? (
                  <Link to="/auth">
                    <Button className="bg-fashion-purple hover:bg-fashion-purple-dark">
                      Get Started
                    </Button>
                  </Link>
                ) : user.role === 'customer' ? (
                  <Link to="/new-request">
                    <Button className="bg-fashion-purple hover:bg-fashion-purple-dark">
                      Create Request
                    </Button>
                  </Link>
                ) : (
                  <Link to="/marketplace">
                    <Button className="bg-fashion-purple hover:bg-fashion-purple-dark">
                      Browse Requests
                    </Button>
                  </Link>
                )}
                <Link to="/auth">
                  <Button variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600&q=80" 
                alt="Fashion Design" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-screen-xl">
          <h2 className="text-3xl font-serif text-center mb-12 text-fashion-purple">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-serif text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Requests Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-screen-xl">
          <h2 className="text-3xl font-serif text-center mb-12 text-fashion-purple">Featured Requests</h2>
          
          {loading ? (
            <div className="text-center">Loading featured requests...</div>
          ) : requests.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {requests.map(request => (
                <RequestCard 
                  key={request.id} 
                  request={request}
                />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-500">No featured requests at the moment.</p>
            </div>
          )}
          
          <div className="text-center mt-10">
            {user?.role === 'designer' ? (
              <Link to="/marketplace">
                <Button className="bg-fashion-purple hover:bg-fashion-purple-dark">
                  View All Requests
                </Button>
              </Link>
            ) : user?.role === 'customer' ? (
              <Link to="/new-request">
                <Button className="bg-fashion-purple hover:bg-fashion-purple-dark">
                  Create New Request
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button className="bg-fashion-purple hover:bg-fashion-purple-dark">
                  Sign Up to Continue
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
      
      {/* Testimonials or CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-screen-xl">
          <div className="bg-fashion-purple text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-serif mb-4">Ready to bring your fashion ideas to life?</h2>
            <p className="text-lg mb-6">Join StyleVerse today and connect with talented designers around the world.</p>
            <Link to="/auth">
              <Button variant="outline" className="bg-white text-fashion-purple hover:bg-gray-100">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container mx-auto px-4 max-w-screen-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif text-xl mb-4">StyleVerse</h3>
              <p className="text-gray-300">Custom fashion, designed just for you.</p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
                <li><Link to="/auth" className="text-gray-300 hover:text-white">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <p className="text-gray-300">contact@styleverse.com</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
            <p>&copy; 2025 StyleVerse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
