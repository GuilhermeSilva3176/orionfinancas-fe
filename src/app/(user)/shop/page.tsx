"use client";

import { useState } from 'react';
import { SubscriptionModal } from '@/components/shop/SubscriptionModal';
import styles from './Shop.module.css';

export default function ShopPage() {
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

    const shopItems = [
        { id: 1, name: "Ícone Clássico", price: 300, type: "icon", img: "/images/avatar.png" },
        { id: 2, name: "Ninja das Finanças", price: 500, type: "icon", img: "/images/avatar1.png" },
        { id: 3, name: "Socialite", price: 800, type: "icon", img: "/images/avatar2.png" },
        { id: 4, name: "Master Invest", price: 1200, type: "icon", img: "/images/avatar3.png" },
        { id: 5, name: "Punk Rock", price: 600, type: "icon", img: "/images/avatar4.png" },
        { id: 6, name: "Astronauta", price: 1500, type: "icon", img: "/images/avatar5.png" },
    ];

    const handleBuyClick = (item: any) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };

    const confirmPurchase = () => {
        // Aqui viria a lógica de backend
        console.log("Comprado:", selectedItem);
        alert(`Você comprou: ${selectedItem.name}!`);
        setSelectedItem(null);
    };

    return (
        <div className={styles.shopContainer}>
            <div
                className={styles.banner}
                onClick={() => setIsSubscriptionModalOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setIsSubscriptionModalOpen(true)}
            >
                <h2 className={styles.bannerTitle}>PLANO DE ASSINATURA</h2>
                <p className={styles.bannerSubtitle}>Desbloqueie conteúdos exclusivos!</p>
            </div>

            <SubscriptionModal
                isOpen={isSubscriptionModalOpen}
                onClose={() => setIsSubscriptionModalOpen(false)}
            />

            <div className={styles.shopGrid}>
                {shopItems.map((item) => (
                    <div key={item.id} className={styles.itemCard}>
                        <div className={styles.imageContainer}>
                            <img src={item.img} alt={item.name} className={styles.itemImg} />
                        </div>

                        <div className={styles.itemInfo}>
                            <div className={styles.itemPrice}>
                                <span>🪙</span> {item.price}
                            </div>
                            <button
                                className={styles.buyBtn}
                                onClick={() => handleBuyClick(item)}
                            >
                                Comprar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de Confirmação */}
            {selectedItem && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <div className={styles.modalIcon}>
                                <img src={selectedItem.img} alt={selectedItem.name} className={styles.modalImg} />
                            </div>
                            <h3 className={styles.modalTitle}>{selectedItem.name}</h3>
                        </div>

                        <div className={styles.modalBody}>
                            <div className={styles.itemDetail}>
                                <div className={styles.itemPrice}>
                                    <span>🪙</span> {selectedItem.price} moedas
                                </div>
                            </div>
                            <p className={styles.confirmText}>
                                Tem certeza que deseja adquirir este item?<br />
                                <strong>Essa ação não pode ser desfeita.</strong>
                            </p>
                        </div>

                        <div className={styles.modalFooter}>
                            <button className={styles.cancelBtn} onClick={closeModal}>
                                Cancelar
                            </button>
                            <button className={styles.confirmBtn} onClick={confirmPurchase}>
                                Confirmar Compra
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
