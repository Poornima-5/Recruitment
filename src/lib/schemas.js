import { z } from 'zod';

// Profile validation schema
export const profileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  storeName: z.string().max(100).optional(),
  location: z.string().max(100).optional(),
  currency: z.string().max(50).optional(),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().max(20).optional(),
  address: z.string().max(500).optional(),
});

// Post validation schema
export const postSchema = z.object({
  author: z.string().min(1).max(100),
  avatar: z.string().optional(),
  content: z.string().min(1, "Content is required").max(1000),
  image: z.string().url().optional().or(z.literal('')),
});

// Follower validation schema
export const followerSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  location: z.string().min(1).max(100),
  avatar: z.string().optional(),
  isFollowing: z.boolean(),
});
