"use client";

import { useState } from 'react';
import styles from './Shop.module.css';

export default function ShopPage() {
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const shopItems = [
        { id: 1, name: "Ícone de Perfil", price: 500, type: "icon" },
        { id: 2, name: "Ícone de Perfil", price: 800, type: "icon" },
        { id: 3, name: "Roupa Personagem", price: 1200, type: "skin" },
        { id: 4, name: "Ícone de Perfil", price: 300, type: "icon" },
        { id: 5, name: "Ícone de Perfil", price: 600, type: "icon" },
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
            <div className={styles.banner}>
                <h2 className={styles.bannerTitle}>PLANO DE ASSINATURA</h2>
                <p className={styles.bannerSubtitle}>Desbloqueie conteúdos exclusivos!</p>
            </div>

            <div className={styles.shopGrid}>
                {shopItems.map((item) => (
                    <div key={item.id} className={styles.itemCard}>
                        <div className={styles.imagePlaceholder}>
                            {item.type === 'skin' ? 'Roupa para o personagem' : 'Ícone de perfil'}
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
                                {selectedItem.type === 'skin' ? '👕' : '👤'}
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
