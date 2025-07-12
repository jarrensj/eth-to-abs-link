import styles from '../styles/NeonSign.module.css'
import { Pacifico } from 'next/font/google'
const font = Pacifico({ weight: '400', subsets: ['latin'] })

const NeonSign = () => {
  return (
    <div className={`${font.className} ${styles.logo}`}>
      <b>
        <span className={styles.flicker}>p</span>ixel corns
      </b>
    </div>
  );
}

export default NeonSign; 