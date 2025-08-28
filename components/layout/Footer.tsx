import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t-2 border-valorant-gray-200 bg-valorant-gray-50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-black tracking-wide uppercase mb-3 text-valorant-black">ABOUT US</h3>
            <p className="text-sm text-valorant-gray-600">
              ReticleLab is the ultimate crosshair configuration center for VALORANT players, providing the most comprehensive crosshair resources.
            </p>
          </div>
          
          <div>
            <h3 className="font-black tracking-wide uppercase mb-3 text-valorant-black">QUICK LINKS</h3>
            <ul className="space-y-2 text-sm text-valorant-gray-600">
              <li><Link href="/crosshairs" className="hover:text-valorant-red font-bold">ARSENAL</Link></li>
              <li><Link href="/crosshairs/pro" className="hover:text-valorant-red font-bold">PRO PLAYERS</Link></li>
              <li><Link href="/editor" className="hover:text-valorant-red font-bold">EDITOR</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-black tracking-wide uppercase mb-3 text-valorant-black">COMMUNITY</h3>
            <ul className="space-y-2 text-sm text-valorant-gray-600">
              <li><a href="#" className="hover:text-valorant-red font-bold">DISCORD</a></li>
              <li><a href="#" className="hover:text-valorant-red font-bold">TWITTER</a></li>
              <li><a href="#" className="hover:text-valorant-red font-bold">REDDIT</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-black tracking-wide uppercase mb-3 text-valorant-black">LEGAL</h3>
            <ul className="space-y-2 text-sm text-valorant-gray-600">
              <li><Link href="/privacy" className="hover:text-valorant-red font-bold">PRIVACY POLICY</Link></li>
              <li><Link href="/terms" className="hover:text-valorant-red font-bold">TERMS OF SERVICE</Link></li>
              <li><Link href="/contact" className="hover:text-valorant-red font-bold">CONTACT US</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t-2 border-valorant-gray-200 text-center text-sm text-valorant-gray-600">
          <p className="font-bold">&copy; 2025 ReticleLab. All rights reserved.</p>
          <p className="mt-2 font-bold">
            VALORANT is a trademark of Riot Games. This site is not affiliated with Riot Games.
          </p>
        </div>
      </div>
    </footer>
  )
}