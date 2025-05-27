import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, Square, Volume2 } from 'lucide-react';
import { MarketData, PortfolioData } from '@/hooks/useMarketData';
import { generateMarketBrief } from '@/services/AnalysisEngine';
import { useToast } from '@/hooks/use-toast';

interface VoiceInterfaceProps {
  portfolioData: PortfolioData | null;
  marketData: MarketData | null;
  isActive: boolean;
}

export const VoiceInterface = ({ portfolioData, marketData, isActive }: VoiceInterfaceProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState<'idle' | 'listening' | 'processing' | 'speaking'>('idle');

  const { toast } = useToast();
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();

      if (recognitionRef.current) {
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onstart = () => {
          setStatus('listening');
          setIsListening(true);
        };

        recognitionRef.current.onresult = (event) => {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            }
          }
          if (finalTranscript) {
            setTranscript(finalTranscript);
            processVoiceCommand(finalTranscript);
          }
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setStatus('idle');
          setIsListening(false);
          toast({
            title: "Speech Recognition Error",
            description: "Please try again or check your microphone permissions.",
            variant: "destructive"
          });
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
          if (status === 'listening') {
            setStatus('idle');
          }
        };
      }
    } else {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive"
      });
    }

    // Initialize speech synthesis
    synthesisRef.current = window.speechSynthesis;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthesisRef.current) {
        synthesisRef.current.cancel();
      }
    };
  }, [toast, status]);

  const processVoiceCommand = async (command: string) => {
    setStatus('processing');

    try {
      // Generate response based on voice command
      const briefResponse = generateMarketBrief(command.toLowerCase(), portfolioData, marketData);
      setResponse(briefResponse);

      // Speak the response
      await speakResponse(briefResponse);
    } catch (error) {
      console.error('Error processing voice command:', error);
      const errorMessage = "I'm sorry, I couldn't process your request. Please try again.";
      setResponse(errorMessage);
      await speakResponse(errorMessage);
    }

    setStatus('idle');
  };

  const speakResponse = (text: string): Promise<void> => {
    return new Promise((resolve) => {
      if (synthesisRef.current && text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 0.8;

        utterance.onstart = () => {
          setStatus('speaking');
          setIsSpeaking(true);
        };

        utterance.onend = () => {
          setIsSpeaking(false);
          setStatus('idle');
          resolve();
        };

        utterance.onerror = (event) => {
          console.error('Speech synthesis error:', event);
          setIsSpeaking(false);
          setStatus('idle');
          resolve();
        };

        synthesisRef.current.speak(utterance);
      } else {
        resolve();
      }
    });
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      setResponse('');
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setIsSpeaking(false);
      setStatus('idle');
    }
  };

  // Demo function for quick testing
  const runDemo = async () => {
    const demoCommand = "What's our risk exposure in Asia tech stocks today, and highlight any earnings surprises?";
    setTranscript(demoCommand);
    await processVoiceCommand(demoCommand);
  };

  if (!isActive) return null;

  return (
    <Card className="w-full" data-id="tsv0eqb9j" data-path="src/components/VoiceInterface.tsx">
      <CardContent className="p-6" data-id="y1fajr7na" data-path="src/components/VoiceInterface.tsx">
        <div className="flex items-center justify-between mb-4" data-id="84ekmvazv" data-path="src/components/VoiceInterface.tsx">
          <div className="flex items-center space-x-3" data-id="d3i9xmjd0" data-path="src/components/VoiceInterface.tsx">
            <h3 className="text-lg font-semibold" data-id="0ctfm65us" data-path="src/components/VoiceInterface.tsx">Voice Assistant</h3>
            <Badge variant={status === 'idle' ? 'secondary' : 'default'} data-id="dudaq8sq5" data-path="src/components/VoiceInterface.tsx">
              {status === 'listening' && 'Listening...'}
              {status === 'processing' && 'Processing...'}
              {status === 'speaking' && 'Speaking...'}
              {status === 'idle' && 'Ready'}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2" data-id="hci49xfin" data-path="src/components/VoiceInterface.tsx">
            <Button
              onClick={runDemo}
              variant="outline"
              size="sm"
              disabled={status !== 'idle'} data-id="vw7vdp9rg" data-path="src/components/VoiceInterface.tsx">

              Demo Brief
            </Button>
            
            {!isListening && !isSpeaking &&
            <Button
              onClick={startListening}
              variant="default"
              size="sm"
              className="flex items-center space-x-2" data-id="qempe2cyz" data-path="src/components/VoiceInterface.tsx">

                <Mic className="h-4 w-4" data-id="nawz9jd1a" data-path="src/components/VoiceInterface.tsx" />
                <span data-id="me2ay45fd" data-path="src/components/VoiceInterface.tsx">Start Listening</span>
              </Button>
            }
            
            {isListening &&
            <Button
              onClick={stopListening}
              variant="destructive"
              size="sm"
              className="flex items-center space-x-2" data-id="aafxdk026" data-path="src/components/VoiceInterface.tsx">

                <Square className="h-4 w-4" data-id="kkve7geqf" data-path="src/components/VoiceInterface.tsx" />
                <span data-id="0ael6gnzk" data-path="src/components/VoiceInterface.tsx">Stop</span>
              </Button>
            }
            
            {isSpeaking &&
            <Button
              onClick={stopSpeaking}
              variant="destructive"
              size="sm"
              className="flex items-center space-x-2" data-id="iwxlr9v3h" data-path="src/components/VoiceInterface.tsx">

                <Volume2 className="h-4 w-4" data-id="x0tc7l8hm" data-path="src/components/VoiceInterface.tsx" />
                <span data-id="9g90l9nrp" data-path="src/components/VoiceInterface.tsx">Stop Speaking</span>
              </Button>
            }
          </div>
        </div>

        {/* Voice Visualization */}
        {(isListening || isSpeaking) &&
        <div className="flex justify-center mb-4" data-id="dj7zqs6ny" data-path="src/components/VoiceInterface.tsx">
            <div className="flex space-x-1" data-id="8aiikf282" data-path="src/components/VoiceInterface.tsx">
              {[...Array(5)].map((_, i) =>
            <div
              key={i}
              className={`w-2 bg-blue-500 rounded-full transition-all duration-300 ${
              isListening || isSpeaking ? 'animate-pulse' : ''}`
              }
              style={{
                height: `${20 + Math.random() * 30}px`,
                animationDelay: `${i * 0.1}s`
              }} data-id="ejq1e0pcl" data-path="src/components/VoiceInterface.tsx" />

            )}
            </div>
          </div>
        }

        {/* Transcript */}
        {transcript &&
        <div className="mb-4" data-id="gzzl6umbm" data-path="src/components/VoiceInterface.tsx">
            <h4 className="text-sm font-medium text-slate-600 mb-2" data-id="lrxo7d9hk" data-path="src/components/VoiceInterface.tsx">You said:</h4>
            <p className="text-sm bg-slate-50 p-3 rounded-lg italic" data-id="vgjn4ec9q" data-path="src/components/VoiceInterface.tsx">
              "{transcript}"
            </p>
          </div>
        }

        {/* Response */}
        {response &&
        <div data-id="q6s0hgnpl" data-path="src/components/VoiceInterface.tsx">
            <h4 className="text-sm font-medium text-slate-600 mb-2" data-id="jpot5lb53" data-path="src/components/VoiceInterface.tsx">Assistant response:</h4>
            <div className="bg-blue-50 p-4 rounded-lg" data-id="qzguxi134" data-path="src/components/VoiceInterface.tsx">
              <p className="text-sm text-slate-700" data-id="hwpw2b58s" data-path="src/components/VoiceInterface.tsx">{response}</p>
            </div>
          </div>
        }

        {/* Instructions */}
        {status === 'idle' && !transcript && !response &&
        <div className="text-center text-slate-500" data-id="88g4pzs1w" data-path="src/components/VoiceInterface.tsx">
            <p className="text-sm mb-2" data-id="hbcsfb5tj" data-path="src/components/VoiceInterface.tsx">Ask me about your portfolio, risk exposure, or market conditions.</p>
            <p className="text-xs" data-id="cjrdrqm2d" data-path="src/components/VoiceInterface.tsx">Try: "What's our Asia tech allocation?" or "Any earnings surprises?"</p>
          </div>
        }
      </CardContent>
    </Card>);

};