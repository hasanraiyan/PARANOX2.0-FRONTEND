import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.body;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Basic phishing detection logic
    const isPhishing = analyzeUrl(url);

    return res.status(200).json({
      url,
      isPhishing,
      reason: isPhishing 
        ? 'URL contains suspicious patterns (login or suspicious-domain)' 
        : 'URL appears to be safe',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

function analyzeUrl(url: string): boolean {
  const lowerUrl = url.toLowerCase();
  
  // Check for 'login' keyword
  if (lowerUrl.includes('login')) {
    return true;
  }
  
  // Check for 'suspicious-domain' keyword
  if (lowerUrl.includes('suspicious-domain')) {
    return true;
  }
  
  return false;
}
