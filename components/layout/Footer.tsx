import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-3">关于我们</h3>
            <p className="text-sm text-muted-foreground">
              ReticleLab是瓦罗兰特玩家的准星配置中心，提供最全面的准星资源。
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">快速链接</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/crosshairs" className="hover:text-primary">准星库</Link></li>
              <li><Link href="/crosshairs/pro" className="hover:text-primary">职业选手</Link></li>
              <li><Link href="/editor" className="hover:text-primary">准星编辑器</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">社区</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Discord</a></li>
              <li><a href="#" className="hover:text-primary">Twitter</a></li>
              <li><a href="#" className="hover:text-primary">Reddit</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">法律信息</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-primary">隐私政策</Link></li>
              <li><Link href="/terms" className="hover:text-primary">服务条款</Link></li>
              <li><Link href="/contact" className="hover:text-primary">联系我们</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2025 ReticleLab. All rights reserved.</p>
          <p className="mt-2">
            Valorant是Riot Games的商标。本站与Riot Games无关。
          </p>
        </div>
      </div>
    </footer>
  )
}