// Base URL for media files from Django
const DJANGO_MEDIA_URL = 'http://localhost:8000';

export const getImageUrl = (imageUrl: string | null | undefined): string => {
  // If no image URL provided, return fallback
  if (!imageUrl) {
    return '/no-image.png';
  }

  // If the URL is already absolute (starts with http:// or https://), return as-is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  // If it starts with /media/, construct the full URL with Django server
  if (imageUrl.startsWith('/media/')) {
    return `${DJANGO_MEDIA_URL}${imageUrl}`;
  }

  // If it's just the file path (like 'products/filename.jpg'), add the media prefix
  const cleanPath = imageUrl.startsWith('/') ? imageUrl.slice(1) : imageUrl;
  return `${DJANGO_MEDIA_URL}/media/${cleanPath}`;
};
