
import React, { useState, useEffect, useRef } from 'react';
import { Star, Send, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import GlitchText from '../ui/GlitchText';
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { saveReview, getPublishedReviews, Review } from '@/lib/storage';
import gsap from 'gsap';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink,
  PaginationNext, 
  PaginationPrevious
} from '@/components/ui/pagination';

// Make ReviewProps match the Review interface to avoid type mismatches
type ReviewProps = Review;

const ReviewCard: React.FC<ReviewProps> = ({ name, initial, role, company, text, rating, bgColor }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    // Create flip animation on hover
    cardRef.current.addEventListener('mouseenter', () => {
      setIsFlipped(true);
    });
    
    cardRef.current.addEventListener('mouseleave', () => {
      setIsFlipped(false);
    });
    
    // Create jump animation on click
    cardRef.current.addEventListener('click', () => {
      gsap.to(cardRef.current, {
        y: -20,
        duration: 0.2,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });
    });
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className={`glass-card p-6 transition-all duration-500 hover:scale-105 h-full flex flex-col ${isFlipped ? 'flipped' : ''}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        transform: isFlipped ? 'rotateY(10deg)' : 'rotateY(0)'
      }}
    >
      <div className="flex items-center mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bgColor} text-white font-semibold text-lg mr-4 ${isFlipped ? 'scale-110' : ''} transition-transform duration-300`}>
          {initial}
        </div>
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-sm text-zogago-light/70">{role}, {company}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"} 
            />
          ))}
        </div>
        <span className="text-[11px] uppercase tracking-wider text-zogago-blue/80">
          Google Review
        </span>
      </div>
      
      <p className="text-zogago-light/80 mb-2 flex-grow">{text}</p>
    </div>
  );
};

// Create schema for review submission
const reviewSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(2, "Role must be at least 2 characters"),
  company: z.string().min(2, "Company must be at least 2 characters"),
  text: z.string().min(10, "Review must be at least 10 characters"),
  rating: z.number().min(1).max(5),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

// Number of reviews to display per page
const REVIEWS_PER_PAGE = 2;

const ClientReviews = () => {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsContainerRef = useRef<HTMLDivElement>(null);

  // Calculate total pages
  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

  // Get current reviews based on pagination
  const getCurrentReviews = () => {
    const indexOfLastReview = currentPage * REVIEWS_PER_PAGE;
    const indexOfFirstReview = indexOfLastReview - REVIEWS_PER_PAGE;
    return reviews.slice(indexOfFirstReview, indexOfLastReview);
  };

  // Handle page changes
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);

    if (reviewsContainerRef.current) {
      const cards = reviewsContainerRef.current.querySelectorAll('.glass-card');
      cards.forEach((card, index) => {
        gsap.fromTo(card, 
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.6, 
            delay: index * 0.2,
            ease: "back.out(1.7)"
          }
        );
      });
    }
  };

  // Fetch published reviews from storage on component mount
  useEffect(() => {
    setReviews(getPublishedReviews());
  }, []);

  // Trigger animation when component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimationStarted(true);
          if (reviewsContainerRef.current) {
            const cards = reviewsContainerRef.current.querySelectorAll('.glass-card');
            cards.forEach((card, index) => {
              gsap.fromTo(card, 
                { y: 50, opacity: 0 },
                { 
                  y: 0, 
                  opacity: 1, 
                  duration: 0.6, 
                  delay: index * 0.2,
                  ease: "back.out(1.7)"
                }
              );
            });
          }
        }
      },
      { threshold: 0.2 }
    );
    
    const section = document.getElementById('reviews');
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: "",
      role: "",
      company: "",
      text: "",
      rating: 5,
    },
  });

  const onSubmit = async (data: ReviewFormValues) => {
    const newReview = {
      name: data.name,
      role: data.role,
      company: data.company,
      text: data.text,
      rating: data.rating,
      initial: data.name.charAt(0),
      approved: false,
    };

    saveReview(newReview);
    setReviews(getPublishedReviews());

    toast({
      title: "Review received & saved!",
      description: "Thank you! Your feedback has been recorded in our client review system.",
      duration: 3000,
    });

    setIsFormOpen(false);
    form.reset();
  };

  const currentReviews = getCurrentReviews();

  return (
    <section id="reviews" className="zg-section bg-gradient-to-b from-black/20 to-zogago-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zogago-blue/50 to-transparent"></div>
      
      <div className="zg-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div 
            className={`inline-block px-4 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6 transition-all duration-500 ${
              animationStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-sm font-medium text-zogago-light/80">Client Feedback</p>
          </div>
          
          <h2 
            className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-zogago-blue via-zogago-purple to-zogago-blue bg-clip-text text-transparent mb-6 transition-all duration-500 delay-100 ${
              animationStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Genuine Client Reviews
          </h2>
          
          <p 
            className={`zg-paragraph mb-8 transition-all duration-500 delay-200 ${
              animationStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {reviews.length > 0
              ? "Here is genuine feedback shared by clients we have collaborated with."
              : "Genuine client feedback from Google Reviews will be featured here as projects are completed."}
          </p>
        </div>
        
        {currentReviews.length > 0 && (
          <div 
            ref={reviewsContainerRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {currentReviews.map((review, index) => (
              <div 
                key={review.id || index}
                className="transition-all duration-500 h-full"
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <ReviewCard {...review} />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="button-glow-outline"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                </PaginationItem>
                
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={currentPage === index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={currentPage === index + 1 ? "bg-zogago-blue border-zogago-blue" : "bg-transparent border-white/10"}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="button-glow-outline"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {/* Review Submission Form */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="glass-card border-white/10 bg-zogago-dark/90 text-zogago-light p-8 max-w-md">
          <div className="mb-6">
            <h3 className="text-2xl font-bold">
              <GlitchText text="Submit Your Review" intensity="low" glitchInterval={8000} rgbShift={true} />
            </h3>
            <p className="text-zogago-light/70 text-sm mt-2">
              Share your experience working with us!
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your name" 
                        {...field}
                        className="bg-white/5 border border-white/10 text-zogago-light"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your job title" 
                        {...field}
                        className="bg-white/5 border border-white/10 text-zogago-light"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your company" 
                        {...field}
                        className="bg-white/5 border border-white/10 text-zogago-light"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => form.setValue('rating', rating)}
                          className="focus:outline-none"
                        >
                          <Star 
                            size={24} 
                            className={rating <= field.value ? "text-yellow-400 fill-yellow-400" : "text-gray-400"} 
                          />
                        </button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Review</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Share your experience with us..." 
                        {...field}
                        rows={4}
                        className="bg-white/5 border border-white/10 text-zogago-light"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="button-glow w-full"
              >
                <Send className="mr-2 h-4 w-4" />
                Submit Review
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ClientReviews;
