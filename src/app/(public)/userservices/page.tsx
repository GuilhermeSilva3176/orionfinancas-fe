
import styles from '../InfoPages.module.css';

export default function ServicesPage() {
  return (
    <div className={styles.infoContainer}>
      <h1 className={styles.title}>Produtos e Serviços</h1>
      <div className={styles.content}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tincidunt, dui eu semper aliquet, enim sapien interdum libero, a accumsan magna arcu sit amet ligula. Duis efficitur hendrerit risus non tempus. Ut accumsan viverra libero, at egestas justo rhoncus ac.
        </p>
        <br />
        <p>
          Nulla in ligula erat. Proin sed blandit turpis, ac accumsan mauris. Nunc et dolor eu ligula tincidunt tempus quis iaculis dolor. Nullam non rhoncus ex.
        </p>
      </div>
    </div>
  );
}