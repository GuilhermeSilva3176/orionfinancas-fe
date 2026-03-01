'use client';

import { useState } from 'react';
import { FormField } from '@/components/ui/form/FormField';
import styles from './SubscriptionModal.module.css';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'plan' | 'payment' | 'card' | 'pix';

export function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const [step, setStep] = useState<Step>('plan');
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual' | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix' | null>(null);

  const [cardData, setCardData] = useState({
    cpf: '',
    cardNumber: '',
    cardholderName: '',
    cvv: '',
    expiry: '',
  });

  const [pixData, setPixData] = useState({
    cpf: '',
    email: '',
  });

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleNextFromPlan = () => {
    if (selectedPlan) setStep('payment');
  };

  const handleNextFromPayment = () => {
    if (paymentMethod === 'card') setStep('card');
    else if (paymentMethod === 'pix') setStep('pix');
  };

  const handleSubscribe = () => {
    // Aqui viria a lógica de backend
    console.log({ selectedPlan, paymentMethod, cardData, pixData });
    alert('Assinatura realizada com sucesso! (simulado)');
    onClose();
    setStep('plan');
    setSelectedPlan(null);
    setPaymentMethod(null);
  };

  const handleBack = () => {
    if (step === 'payment') setStep('plan');
    else if (step === 'card' || step === 'pix') setStep('payment');
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar">
          ✕
        </button>

        {/* Step 1: Escolha de plano */}
        {step === 'plan' && (
          <>
            <h2 className={styles.modalTitle}>Escolha seu plano</h2>
            <div className={styles.planGrid}>
              <button
                className={`${styles.planCard} ${selectedPlan === 'monthly' ? styles.planSelected : ''}`}
                onClick={() => setSelectedPlan('monthly')}
              >
                <h3 className={styles.planName}>Plano Mensal</h3>
                <p className={styles.planDesc}>
                  Acesso mensal a todos os conteúdos exclusivos. Cancele quando quiser.
                </p>
                <span className={styles.planPrice}>R$ 29,90/mês</span>
              </button>
              <button
                className={`${styles.planCard} ${selectedPlan === 'annual' ? styles.planSelected : ''}`}
                onClick={() => setSelectedPlan('annual')}
              >
                <h3 className={styles.planName}>Plano Anual</h3>
                <p className={styles.planDesc}>
                  Economize 2 meses! Acesso anual com desconto especial.
                </p>
                <span className={styles.planPrice}>R$ 299,00/ano</span>
              </button>
            </div>
            <button
              className={styles.primaryBtn}
              onClick={handleNextFromPlan}
              disabled={!selectedPlan}
            >
              Próximos passos
            </button>
          </>
        )}

        {/* Step 2: Forma de pagamento */}
        {step === 'payment' && (
          <>
            <h2 className={styles.modalTitle}>Forma de pagamento</h2>
            <div className={styles.paymentOptions}>
              <button
                className={`${styles.paymentOption} ${paymentMethod === 'card' ? styles.optionSelected : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                Cartão
              </button>
              <button
                className={`${styles.paymentOption} ${paymentMethod === 'pix' ? styles.optionSelected : ''}`}
                onClick={() => setPaymentMethod('pix')}
              >
                Pix
              </button>
            </div>
            <div className={styles.footerActions}>
              <button className={styles.secondaryBtn} onClick={handleBack}>
                Voltar
              </button>
              <button
                className={styles.primaryBtn}
                onClick={handleNextFromPayment}
                disabled={!paymentMethod}
              >
                Próximos passos
              </button>
            </div>
          </>
        )}

        {/* Step 3a: Pagamento via cartão */}
        {step === 'card' && (
          <>
            <h2 className={styles.modalTitle}>Pagamento via cartão</h2>
            <div className={styles.formGrid}>
              <FormField label="CPF">
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  value={cardData.cpf}
                  onChange={(e) => setCardData({ ...cardData, cpf: e.target.value })}
                />
              </FormField>
              <FormField label="Número do cartão">
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  value={cardData.cardNumber}
                  onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                />
              </FormField>
              <FormField label="Nome do titular">
                <input
                  type="text"
                  placeholder="Nome como no cartão"
                  value={cardData.cardholderName}
                  onChange={(e) => setCardData({ ...cardData, cardholderName: e.target.value })}
                />
              </FormField>
              <div className={styles.row}>
                <FormField label="Validade">
                  <input
                    type="text"
                    placeholder="MM/AA"
                    value={cardData.expiry}
                    onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                  />
                </FormField>
                <FormField label="CVV">
                  <input
                    type="text"
                    placeholder="123"
                    value={cardData.cvv}
                    onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                  />
                </FormField>
              </div>
            </div>
            <div className={styles.footerActions}>
              <button className={styles.secondaryBtn} onClick={handleBack}>
                Voltar
              </button>
              <button className={styles.primaryBtn} onClick={handleSubscribe}>
                Assinar
              </button>
            </div>
          </>
        )}

        {/* Step 3b: Pagamento via Pix */}
        {step === 'pix' && (
          <>
            <h2 className={styles.modalTitle}>Pagamento via Pix</h2>
            <div className={styles.formStack}>
              <FormField label="CPF">
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  value={pixData.cpf}
                  onChange={(e) => setPixData({ ...pixData, cpf: e.target.value })}
                />
              </FormField>
              <FormField label="Email">
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={pixData.email}
                  onChange={(e) => setPixData({ ...pixData, email: e.target.value })}
                />
              </FormField>
              <div className={styles.pixPlaceholder}>
                <span>QR Code ou chave Pix será exibido aqui após preencher os dados.</span>
              </div>
            </div>
            <div className={styles.footerActions}>
              <button className={styles.secondaryBtn} onClick={handleBack}>
                Voltar
              </button>
              <button className={styles.primaryBtn} onClick={handleSubscribe}>
                Assinar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
