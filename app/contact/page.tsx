import { getContactPage } from '../../sanity/sanity-utils'
import CustomPortableTextComponent from '../../components/CustomPortableTextComponent'

export default async function Contact() {
  const contactPage = await getContactPage()

  return (
    <div>
      <h1>{contactPage.contactFormHeading}</h1>
      <CustomPortableTextComponent value={contactPage.contactInfo} />
      <p>{contactPage.contactFormPrompt}</p>
      <form>
        {contactPage.contactFormFields.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id}>{field.label}</label>
            <input type={field.type} id={field.id} name={field.id} />
          </div>
        ))}
        <button type="submit">Odeslat</button>
      </form>
    </div>
  )
}