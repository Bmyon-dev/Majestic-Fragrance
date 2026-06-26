export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  product?: string;
  verified: boolean;
}

// Placeholder testimonials — replace with real customer reviews as they come in.
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Tobi A.",
    rating: 5,
    text: "Confidence lives up to its name. I wore it to my project defense and got three compliments before I even sat down.",
    product: "Confidence",
    verified: true,
  },
  {
    id: "t2",
    name: "Daniel O.",
    rating: 5,
    text: "Royal Oud lasted from morning lectures straight through to evening. Genuinely impressed for the price.",
    product: "Royal Oud",
    verified: true,
  },
  {
    id: "t3",
    name: "Chiamaka E.",
    rating: 5,
    text: "Ordered the Standard Package and it was the best decision — having the perfume oil for class and the perfume for going out is perfect.",
    product: "Standard Package",
    verified: true,
  },
  {
    id: "t4",
    name: "Bolaji K.",
    rating: 4,
    text: "First Class roll-on is now permanently in my backpack. Light enough for lectures, strong enough that people notice.",
    product: "First Class",
    verified: true,
  },
  {
    id: "t5",
    name: "Funmi T.",
    rating: 5,
    text: "Delivery within FUTA was fast and the packaging alone felt premium. Heritage Noir is unisex perfection.",
    product: "Heritage Noir",
    verified: true,
  },
];
