import type { VercelRequest, VercelResponse } from '@vercel/node';

interface PhishingAnalysisResult {
  label: 'safe' | 'suspicious' | 'dangerous';
  severity: number;
  confidence: number;
  summary: string;
  reason: string;
  indicators: string[];
  explaination_steps: string[];
  urls: Array<{
    url: string;
    domain: string;
    is_shortened: boolean;
    uses_https: boolean;
    suggested_action: string;
  }>;
  sender: {
    name: string | null;
    email: string | null;
    display_domain: string | null;
    spoof_score: number;
  };
  extracted_phones: string[];
  attachments: string[];
  recommended_user_action: string[];
}

const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY || '';
const GEMINI_MODEL = process.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash-exp';

const PHISHING_DETECTION_PROMPT = `You are a Phishing & Scam Detection assistant. 
Task: Analyze a single input (email body / SMS / call transcript / website URL) and return a JSON object exactly matching the schema below. Do NOT add extra top-level fields or commentary. Use plain English. Be concise and deterministic.

RULES:
1. Always return valid JSON only (no surrounding text).
2. Use temperature 0.0. Keep output terse.
3. Output fields must match types and names exactly.
4. Confidence: float 0.0–1.0. If uncertain, set confidence < 0.7 and label "suspicious".
5. Severity: float 0.0–1.0 where 0–0.2 = safe, 0.21–0.5 = suspicious, 0.51–1.0 = dangerous. Label must match severity range.
6. indicators: choose from this set only:
   ["urgent-language","threatening-language","unexpected-attachment","shortened-url","domain-mismatch","fake-brand","generic-greeting","spoofed-sender","payment-request","reward-offer","typos","poor-grammar","spoofed-link","ip-address-link","https-missing","newly-registered-domain","login-request","attachment-exe","sms-link","phone-call-ask","social-engineering"]
7. For any URLs found, populate "urls" array with objects including is_shortened (true/false) and uses_https (true/false).
8. If sender information is present, fill "sender" fields; otherwise use nulls or empty arrays.
9. explaination_steps: provide 3–6 short bullet strings (≤12 words each) explaining verdict.
10. recommended_user_action: choose from ["do_not_click","block_sender","delete","verify_with_bank","report_to_provider","scan_attachment","open_in_sandbox","ignore"] (include at least one).
11. Preserve privacy: do not guess or identify real persons beyond provided sender/email.
12. If attachments end with dangerous extensions (.exe, .scr, .bat), set label "dangerous" and severity ≥ 0.7.

JSON SCHEMA (return exactly):
{
  "label": "safe|suspicious|dangerous",
  "severity": 0.0,
  "confidence": 0.0,
  "summary": "short one-line summary (≤120 chars)",
  "reason": "brief 1–2 sentence explanation",
  "indicators": ["..."],
  "explaination_steps": ["...","..."],
  "urls": [
    {
      "url": "https://...",
      "domain": "example.com",
      "is_shortened": false,
      "uses_https": true,
      "suggested_action": "do_not_click|open_in_sandbox|ignore"
    }
  ],
  "sender": {
    "name": "Display Name or null",
    "email": "sender@example.com or null",
    "display_domain": "example.com or null",
    "spoof_score": 0.0
  },
  "extracted_phones": ["+911234567890"],
  "attachments": ["invoice.pdf","unknown.exe"],
  "recommended_user_action": ["do_not_click","report_to_provider"]
}

Now analyze the following input:`;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text, url } = req.body;
    const inputToAnalyze = text || url;
    
    if (!inputToAnalyze || typeof inputToAnalyze !== 'string') {
      return res.status(400).json({ error: 'Text or URL is required' });
    }

    // Check if API key is available
    if (!GEMINI_API_KEY) {
      console.error('Gemini API key not found in environment variables');
      const fallbackResult = basicPhishingAnalysis(inputToAnalyze);
      return res.status(200).json(fallbackResult);
    }

    // Call Google AI API for analysis
    const analysisResult = await analyzeWithGoogleAI(inputToAnalyze);
    
    return res.status(200).json(analysisResult);

  } catch (error) {
    console.error('Error analyzing input:', error);
    
    // Fallback to basic analysis if AI fails
    const fallbackResult = basicPhishingAnalysis(inputToAnalyze);
    return res.status(200).json(fallbackResult);
  }
}

async function analyzeWithGoogleAI(input: string, retryCount: number = 0): Promise<PhishingAnalysisResult> {
  try {
    // Build the complete prompt
    const fullPrompt = `${PHISHING_DETECTION_PROMPT}\n\nCurrent Input to Analyze: ${input}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ text: fullPrompt }]
          }],
          generationConfig: {
            temperature: 0.0,
            topK: 1,
            topP: 0.95,
            maxOutputTokens: 2048
          }
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error("Gemini API Error:", error);
      
      // Handle rate limiting (429) with retry
      if (response.status === 429 && retryCount < 2) {
        console.log(`Rate limited, retrying in ${(retryCount + 1) * 2} seconds...`);
        await new Promise(resolve => setTimeout(resolve, (retryCount + 1) * 2000));
        return analyzeWithGoogleAI(input, retryCount + 1);
      }
      
      // Handle different error types
      if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again in a few moments.");
      } else if (response.status === 401) {
        throw new Error("API key is invalid or expired.");
      } else if (response.status === 403) {
        throw new Error("Access forbidden. Please check your API permissions.");
      } else if (response.status === 404) {
        throw new Error("Model not found. Please check the model name.");
      } else {
        throw new Error(`API Error: ${response.status}`);
      }
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    // Parse JSON response from AI
    const cleanedResponse = aiResponse.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleanedResponse);
    
  } catch (err) {
    console.error("Gemini API failed:", err);
    throw err;
  }
}

function basicPhishingAnalysis(input: string): PhishingAnalysisResult {
  const suspiciousKeywords = [
    'urgent', 'click here', 'suspended', 'verify', 'winner', '$', 'prize',
    'congratulations', 'act now', 'limited time', 'expires', 'claim',
    'bank account', 'credit card', 'social security', 'password', 'login'
  ];
  
  const urlRegex = /(https?:\/\/[^\s]+)/gi;
  const phoneRegex = /(\+?\d{1,4}[\s-]?\(?\d{1,3}\)?[\s-]?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9})/g;
  
  const foundUrls = input.match(urlRegex) || [];
  const foundPhones = input.match(phoneRegex) || [];
  
  const suspiciousCount = suspiciousKeywords.filter(keyword => 
    input.toLowerCase().includes(keyword.toLowerCase())
  ).length;
  
  const hasShortenedUrl = foundUrls.some(url => 
    ['bit.ly', 'tinyurl.com', 't.co', 'short.link'].some(domain => url.includes(domain))
  );
  
  let label: 'safe' | 'suspicious' | 'dangerous';
  let severity: number;
  let confidence: number;
  
  if (suspiciousCount >= 3 || hasShortenedUrl) {
    label = 'dangerous';
    severity = 0.8;
    confidence = 0.85;
  } else if (suspiciousCount >= 1) {
    label = 'suspicious';
    severity = 0.4;
    confidence = 0.75;
  } else {
    label = 'safe';
    severity = 0.1;
    confidence = 0.9;
  }
  
  const indicators: string[] = [];
  if (suspiciousCount > 0) indicators.push('urgent-language');
  if (hasShortenedUrl) indicators.push('shortened-url');
  if (foundUrls.length > 0) indicators.push('spoofed-link');
  
  return {
    label,
    severity,
    confidence,
    summary: `${label.charAt(0).toUpperCase() + label.slice(1)} content detected with ${suspiciousCount} suspicious indicators`,
    reason: `Analysis found ${suspiciousCount} suspicious keywords and ${foundUrls.length} URLs.`,
    indicators,
    explaination_steps: [
      `Found ${suspiciousCount} suspicious keywords`,
      `Detected ${foundUrls.length} URLs`,
      hasShortenedUrl ? 'Contains shortened URLs' : 'No shortened URLs found',
      `Overall risk level: ${label}`
    ],
    urls: foundUrls.map(url => {
      const domain = new URL(url).hostname;
      return {
        url,
        domain,
        is_shortened: ['bit.ly', 'tinyurl.com', 't.co', 'short.link'].some(d => domain.includes(d)),
        uses_https: url.startsWith('https://'),
        suggested_action: label === 'dangerous' ? 'do_not_click' : 'open_in_sandbox'
      };
    }),
    sender: {
      name: null,
      email: null,
      display_domain: null,
      spoof_score: 0.0
    },
    extracted_phones: foundPhones,
    attachments: [],
    recommended_user_action: label === 'dangerous' 
      ? ['do_not_click', 'report_to_provider'] 
      : label === 'suspicious' 
        ? ['verify_with_bank', 'delete'] 
        : ['ignore']
  };
}
