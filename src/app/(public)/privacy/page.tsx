
import styles from '../InfoPages.module.css';

export default function PrivacyPage() {
  return (
    <div className={styles.infoContainer}>
      <h1 className={styles.title}>Políticas de Privacidade</h1>
      <div className={styles.content}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tincidunt, dui eu semper aliquet, enim sapien interdum libero, a accumsan magna arcu sit amet ligula. Duis efficitur hendrerit risus non tempus.
        </p>
        <br />
        <p>
          Ut accumsan viverra libero, at egestas justo rhoncus ac. Nulla in ligula erat. Proin sed blandit turpis, ac accumsan mauris.
        </p>
      </div>
    </div>
  );
}