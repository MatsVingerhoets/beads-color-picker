import * as Yup from 'yup'

export default Yup.object({
  color: Yup
    .string()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid hex color code')
    .required('Color is required')
})
