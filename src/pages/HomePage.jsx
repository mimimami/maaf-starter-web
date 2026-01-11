import { Link } from 'react-router-dom'
import Button from '../components/Button/Button'
import Card from '../components/Card/Card'
import { useAuthStore } from '../store/authStore'
import './HomePage.css'

function HomePage() {
  const { isAuthenticated } = useAuthStore()

  return (
    <div className="home-page">
      <section className="hero">
        <h1>MAAF Framework</h1>
        <p className="hero-subtitle">
          Moduláris Alkalmazás Architektúra Framework
        </p>
        <div className="intro">
          <p>
            A MAAF egy teljes körű PHP framework moduláris architektúrával, amely lehetővé teszi 
            a gyors és rugalmas alkalmazásfejlesztést. Minden komponens önálló package-ként érhető el, 
            így csak azt használhatod, amire szükséged van.
          </p>
        </div>
        {!isAuthenticated && (
          <div className="hero-actions">
            <Link to="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg">
                Login
              </Button>
            </Link>
          </div>
        )}
      </section>

      <section className="packages-section">
        <h2>Core & App</h2>
        <div className="package-grid">
          <Card title="maaf/core">
            <p className="package-description">
              A MAAF framework alapvető komponensei: DI Container, HTTP Kernel, Router, EventBus, Config Engine és CLI.
            </p>
            <div className="package-links">
              <a href="https://github.com/mimimami/maaf-core" target="_blank" rel="noopener noreferrer">
                <Button size="sm">GitHub</Button>
              </a>
              <a href="/maaf-core-readme.html">
                <Button variant="secondary" size="sm">README</Button>
              </a>
            </div>
          </Card>

          <Card title="maaf/app">
            <p className="package-description">
              Példa alkalmazás a MAAF framework használatára, amely bemutatja az összes alapvető funkciót.
            </p>
            <div className="package-links">
              <a href="https://github.com/mimimami/maaf-app" target="_blank" rel="noopener noreferrer">
                <Button size="sm">GitHub</Button>
              </a>
              <a href="/maaf-app-readme.html">
                <Button variant="secondary" size="sm">README</Button>
              </a>
            </div>
          </Card>
        </div>
      </section>

      <section className="packages-section">
        <h2>Csomagok</h2>

        <h3>1. Alap platformcsomagok (core ecosystem)</h3>
        <div className="package-grid">
          <Card title="maaf/auth">
            <p className="package-description">Moduláris autentikációs rendszer</p>
            <ul className="package-features">
              <li>moduláris auth (session + token + tenant aware)</li>
              <li>plug in elhető provider logika</li>
              <li>fejlesztőbarát middleware ek</li>
            </ul>
            <div className="package-links">
              <a href="https://github.com/mimimami/maaf-auth" target="_blank" rel="noopener noreferrer">
                <Button size="sm">GitHub</Button>
              </a>
              <a href="/maaf-auth-readme.html">
                <Button variant="secondary" size="sm">README</Button>
              </a>
            </div>
          </Card>

          <Card title="maaf/tenant">
            <p className="package-description">Multi-tenant támogatás</p>
            <ul className="package-features">
              <li>tenant aware routing, model resolution, config override</li>
              <li>multi tenant cache és queue izoláció</li>
              <li>domain alapú és paraméter alapú tenant felismerés</li>
            </ul>
            <div className="package-links">
              <a href="https://github.com/mimimami/maaf-tenant" target="_blank" rel="noopener noreferrer">
                <Button size="sm">GitHub</Button>
              </a>
              <a href="/maaf-tenant-readme.html">
                <Button variant="secondary" size="sm">README</Button>
              </a>
            </div>
          </Card>

          <Card title="maaf/module">
            <p className="package-description">Modul rendszer</p>
            <ul className="package-features">
              <li>modulok regisztrációja, lifecycle hookok</li>
              <li>modulonkénti route, config, migration, asset kezelés</li>
              <li>CLI generátorok</li>
            </ul>
            <div className="package-links">
              <a href="https://github.com/mimimami/maaf-module" target="_blank" rel="noopener noreferrer">
                <Button size="sm">GitHub</Button>
              </a>
              <a href="/maaf-module-readme.html">
                <Button variant="secondary" size="sm">README</Button>
              </a>
            </div>
          </Card>

          <Card title="maaf/config">
            <p className="package-description">Konfiguráció kezelés</p>
            <ul className="package-features">
              <li>környezetfüggetlen, rétegezett konfiguráció</li>
              <li>override olható modulonként</li>
              <li>auditálható változások</li>
            </ul>
            <div className="package-links">
              <a href="https://github.com/mimimami/maaf-config" target="_blank" rel="noopener noreferrer">
                <Button size="sm">GitHub</Button>
              </a>
              <a href="/maaf-config-readme.html">
                <Button variant="secondary" size="sm">README</Button>
              </a>
            </div>
          </Card>
        </div>

        <h3>2. Teljesítmény és infrastruktúra</h3>
        <div className="package-grid">
          <Card title="maaf/runtime">
            <p className="package-description">Runtime és worker kezelés</p>
            <ul className="package-features">
              <li>worker alapú futtatás (Octane szerű, de MAAF filozófiával)</li>
              <li>cache elt bootstrap</li>
              <li>modul szintű preload</li>
            </ul>
            <div className="package-links">
              <a href="https://github.com/mimimami/maaf-runtime" target="_blank" rel="noopener noreferrer">
                <Button size="sm">GitHub</Button>
              </a>
              <a href="/maaf-runtime-readme.html">
                <Button variant="secondary" size="sm">README</Button>
              </a>
            </div>
          </Card>

          <Card title="maaf/queue">
            <p className="package-description">Queue rendszer</p>
            <ul className="package-features">
              <li>queue driver absztrakció</li>
              <li>modulonkénti worker konfiguráció</li>
              <li>dashboard (Horizon szerű)</li>
            </ul>
            <div className="package-links">
              <a href="https://github.com/mimimami/maaf-queue" target="_blank" rel="noopener noreferrer">
                <Button size="sm">GitHub</Button>
              </a>
              <a href="/maaf-queue-readme.html">
                <Button variant="secondary" size="sm">README</Button>
              </a>
            </div>
          </Card>

          <Card title="maaf/monitor">
            <p className="package-description">Monitoring és profiling</p>
            <ul className="package-features">
              <li>teljesítményprofilozás</li>
              <li>modulonkénti metrikák</li>
              <li>valós idejű diagnosztika (Pulse szerű)</li>
            </ul>
            <div className="package-links">
              <a href="https://github.com/mimimami/maaf-monitor" target="_blank" rel="noopener noreferrer">
                <Button size="sm">GitHub</Button>
              </a>
              <a href="/maaf-monitor-readme.html">
                <Button variant="secondary" size="sm">README</Button>
              </a>
            </div>
          </Card>
        </div>

        <h3>3. Adatkezelés és keresés</h3>
        <div className="package-grid">
          <Card title="maaf/search">
            <p className="package-description">Search engine integráció</p>
            <ul className="package-features">
              <li>moduláris indexelés</li>
              <li>adapterek: Meilisearch, Elasticsearch, SQL fulltext</li>
              <li>model független keresési pipeline</li>
            </ul>
            <div className="package-links">
              <a href="https://github.com/mimimami/maaf-search" target="_blank" rel="noopener noreferrer">
                <Button size="sm">GitHub</Button>
              </a>
              <a href="/maaf-search-readme.html">
                <Button variant="secondary" size="sm">README</Button>
              </a>
            </div>
          </Card>

          <Card title="maaf/storage">
            <p className="package-description">File storage és CDN</p>
            <ul className="package-features">
              <li>fájlkezelés, asset pipeline</li>
              <li>CDN integráció</li>
              <li>modulonkénti storage namespace</li>
            </ul>
            <div className="package-links">
              <a href="https://github.com/mimimami/maaf-storage" target="_blank" rel="noopener noreferrer">
                <Button size="sm">GitHub</Button>
              </a>
              <a href="/maaf-storage-readme.html">
                <Button variant="secondary" size="sm">README</Button>
              </a>
            </div>
          </Card>
        </div>

        <h3>4. Jogosultság, feature flag, workflow</h3>
        <div className="package-grid">
          <Card title="maaf/permissions">
            <p className="package-description">Jogosultság kezelés</p>
            <ul className="package-features">
              <li>role based + policy based + rule based</li>
              <li>modulonkénti jogosultságregisztráció</li>
            </ul>
            <div className="package-links">
              <a href="https://github.com/mimimami/maaf-permissions" target="_blank" rel="noopener noreferrer">
                <Button size="sm">GitHub</Button>
              </a>
              <a href="/maaf-permissions-readme.html">
                <Button variant="secondary" size="sm">README</Button>
              </a>
            </div>
          </Card>

          <Card title="maaf/flags">
            <p className="package-description">Feature flags</p>
            <ul className="package-features">
              <li>feature flag rendszer (Pennant szerű)</li>
              <li>rollout stratégiák</li>
              <li>user szintű és tenant szintű engedélyezés</li>
            </ul>
            <div className="package-links">
              <a href="https://github.com/mimimami/maaf-flags" target="_blank" rel="noopener noreferrer">
                <Button size="sm">GitHub</Button>
              </a>
              <a href="/maaf-flags-readme.html">
                <Button variant="secondary" size="sm">README</Button>
              </a>
            </div>
          </Card>

          <Card title="maaf/workflow">
            <p className="package-description">Workflow és state machines</p>
            <ul className="package-features">
              <li>állapotgépek</li>
              <li>tranzakciós workflow k</li>
              <li>audit log</li>
            </ul>
            <div className="package-links">
              <a href="https://github.com/mimimami/maaf-workflow" target="_blank" rel="noopener noreferrer">
                <Button size="sm">GitHub</Button>
              </a>
              <a href="/maaf-workflow-readme.html">
                <Button variant="secondary" size="sm">README</Button>
              </a>
            </div>
          </Card>
        </div>

        <h3>5. Fizetés és integrációk</h3>
        <div className="package-grid">
          <Card title="maaf/billing">
            <p className="package-description">Billing és payment</p>
            <ul className="package-features">
              <li>Stripe + PayPal + Barion adapterek</li>
              <li>előfizetéskezelés</li>
              <li>számlázási logika modulárisan</li>
            </ul>
            <div className="package-links">
              <a href="https://github.com/mimimami/maaf-billing" target="_blank" rel="noopener noreferrer">
                <Button size="sm">GitHub</Button>
              </a>
              <a href="/maaf-billing-readme.html">
                <Button variant="secondary" size="sm">README</Button>
              </a>
            </div>
          </Card>

          <Card title="maaf/social">
            <p className="package-description">Social login</p>
            <ul className="package-features">
              <li>OAuth provider modulok</li>
              <li>social login + social account linking</li>
            </ul>
            <div className="package-links">
              <a href="https://github.com/mimimami/maaf-social" target="_blank" rel="noopener noreferrer">
                <Button size="sm">GitHub</Button>
              </a>
              <a href="/maaf-social-readme.html">
                <Button variant="secondary" size="sm">README</Button>
              </a>
            </div>
          </Card>
        </div>

        <h3>6. Fejlesztői élmény (DX)</h3>
        <div className="package-grid">
          <Card title="maaf/devtools">
            <p className="package-description">DevTools és debugging</p>
            <ul className="package-features">
              <li>request inspector (Telescope szerű)</li>
              <li>modulonkénti lognézet</li>
              <li>query profiler</li>
            </ul>
            <div className="package-links">
              <a href="https://github.com/mimimami/maaf-devtools" target="_blank" rel="noopener noreferrer">
                <Button size="sm">GitHub</Button>
              </a>
              <a href="/maaf-devtools-readme.html">
                <Button variant="secondary" size="sm">README</Button>
              </a>
            </div>
          </Card>

          <Card title="maaf/testing">
            <p className="package-description">Testing toolkit</p>
            <ul className="package-features">
              <li>integrációs teszt helper</li>
              <li>modul sandbox környezet</li>
              <li>böngészőteszt wrapper (Dusk szerű)</li>
            </ul>
            <div className="package-links">
              <a href="https://github.com/mimimami/maaf-testing" target="_blank" rel="noopener noreferrer">
                <Button size="sm">GitHub</Button>
              </a>
              <a href="/maaf-testing-readme.html">
                <Button variant="secondary" size="sm">README</Button>
              </a>
            </div>
          </Card>

          <Card title="maaf/style">
            <p className="package-description">Code style és generátorok</p>
            <ul className="package-features">
              <li>kódstílus + generátorok</li>
              <li>modul skeleton generálás</li>
              <li>Pint szerű formatter</li>
            </ul>
            <div className="package-links">
              <a href="https://github.com/mimimami/maaf-style" target="_blank" rel="noopener noreferrer">
                <Button size="sm">GitHub</Button>
              </a>
              <a href="/maaf-style-readme.html">
                <Button variant="secondary" size="sm">README</Button>
              </a>
            </div>
          </Card>
        </div>

        <h3>7. Starter kitek</h3>
        <div className="package-grid">
          <Card title="maaf/starter-api">
            <p className="package-description">API-first projekt skeleton</p>
            <ul className="package-features">
              <li>API first projekt skeleton</li>
              <li>auth + tenant + modulok előkészítve</li>
            </ul>
            <div className="package-links">
              <a href="https://github.com/mimimami/maaf-starter-api" target="_blank" rel="noopener noreferrer">
                <Button size="sm">GitHub</Button>
              </a>
              <a href="/maaf-starter-api-readme.html">
                <Button variant="secondary" size="sm">README</Button>
              </a>
            </div>
          </Card>

          <Card title="maaf/starter-web">
            <p className="package-description">React/Vite frontend skeleton</p>
            <ul className="package-features">
              <li>React/Vite alapú frontend skeleton</li>
              <li>moduláris UI komponensek</li>
            </ul>
            <div className="package-links">
              <a href="https://github.com/mimimami/maaf-starter-web" target="_blank" rel="noopener noreferrer">
                <Button size="sm">GitHub</Button>
              </a>
              <a href="/maaf-starter-web-readme.html">
                <Button variant="secondary" size="sm">README</Button>
              </a>
            </div>
          </Card>

          <Card title="maaf/starter-admin">
            <p className="package-description">Admin panel skeleton</p>
            <ul className="package-features">
              <li>admin panel alapok</li>
              <li>modulonkénti CRUD generátor</li>
            </ul>
            <div className="package-links">
              <a href="https://github.com/mimimami/maaf-starter-admin" target="_blank" rel="noopener noreferrer">
                <Button size="sm">GitHub</Button>
              </a>
              <a href="/maaf-starter-admin-readme.html">
                <Button variant="secondary" size="sm">README</Button>
              </a>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default HomePage
