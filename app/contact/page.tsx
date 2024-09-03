import { getContactPage } from '../../sanity/sanity-utils'
import CustomPortableTextComponent from '../../components/CustomPortableTextComponent'
import ContactForm from './ContactForm'

export default async function Contact() {
  const contactPage = await getContactPage()

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white">
      <h1 className="text-3xl text-orange-500 mb-6">{contactPage.contactFormHeading}</h1>
      <CustomPortableTextComponent value={contactPage.contactInfo} />
      <p className="mb-4">{contactPage.contactFormPrompt}</p>
          <div>
            <ContactForm contactFormFields={contactPage.contactFormFields} />
          </div>
        
    </div>
  )
}