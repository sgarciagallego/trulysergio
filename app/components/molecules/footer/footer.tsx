import styles from "./footer.module.scss"

export default function Footer() {
  return (
    <div className={styles.wrapper}>
      <footer className="space">
        <small>
          © Sergio Garcia Gallego. All rights reserved.
        </small>
      </footer>
    </div>
  )
}
