import '@/styles/home.css';
import '@/styles/globals.css';
import Link from 'next/link';

export default function HomePage() {
    return (
        <>
            <main className="home-container">         
                <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                    Domine seu dinheiro com o <span className="highlight">Orion Finanças</span>
                    </h1>
                    <p className="hero-description">
                    A educação financeira que você não aprendeu na escola. 
                    Nossa plataforma foi feita para jovens que buscam independência, 
                    organização e um futuro financeiro sólido desde o primeiro salário.
                    </p>
                    <div className="hero-buttons">
                      <Link href="/register" className="form-link">
                        Começar agora gratuitamente
                      </Link>
                      <Link href="/login" className="form-link">
                        Já tenho uma conta
                      </Link>
                    </div>
                </div>
                </section>

                
                <section className="features">
                <div className="feature-card">
                    <h3>Controle Total</h3>
                    <p>Acompanhe seus gastos diários de forma simples e intuitiva.</p>
                </div>
                <div className="feature-card">
                    <h3>Educação Prática</h3>
                    <p>Aprenda conceitos de investimento e poupança.</p>
                </div>
                <div className="feature-card">
                    <h3>Futuro Livre</h3>
                    <p>Construa sua liberdade financeira começando hoje, não importa o valor.</p>
                </div>
                </section>
            </main>
        </>
    );
}