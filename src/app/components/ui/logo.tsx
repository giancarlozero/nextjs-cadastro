'use client'

import styles from '@/app/components/ui/logo.module.css'

export default function Logo() {
  return(
    <div className={styles.logo}>
      <img src="https://picsum.photos/150/80" alt="" />
    </div>
  );
}