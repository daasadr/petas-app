import { getContactPage } from '../../sanity/sanity-utils'
import CustomPortableTextComponent from '../../components/CustomPortableTextComponent'
import ContactForm from './ContactForm'
import styles from '../../styles/Contact.module.css'

export default async function Contact() {
  const contactPage = await getContactPage()

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.infoSection}>
          <h2>{contactPage.contactFormHeading}</h2>
          <CustomPortableTextComponent value={contactPage.contactInfo} />
        </div>
        
        <div className={styles.formSection}>
          <p className="mb-6">{contactPage.contactFormPrompt}</p>
          <ContactForm contactFormFields={contactPage.contactFormFields} />
        </div>
      </div>
    </div>
  )
}